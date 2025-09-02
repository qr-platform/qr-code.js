import type { NodePath } from '@babel/traverse'
import type * as BabelTypes from '@babel/types'
import { SourceMapConsumer, type RawSourceMap } from 'source-map-js' // Combined imports

// Define types for Babel file and state objects
interface BabelFile {
  opts: {
    filename?: string
    [key: string]: unknown
  }
}

interface BabelState {
  file: BabelFile
  [key: string]: unknown
}

// Define a type for error objects
type ErrorWithMessage = Error & {
  message: string
}

interface CustomPluginOptions {
  inputSourceMap?: RawSourceMap | string // Specify type for inputSourceMap
  types: typeof BabelTypes
}

// Helper to create the plugin object, allows cleaner passing of `t` and options
const createPluginLogic = (
  babel: { types: typeof BabelTypes },
  options: CustomPluginOptions
) => {
  const t = babel.types
  const consumerHolder: { consumer?: SourceMapConsumer } = {}

  return {
    name: 'inject-data-locator-original-source',
    post: () => {
      // Removed `file` as it's not used here
      // SourceMapConsumer from `source-map-js` does not have a destroy method.
      // Clearing the reference is enough for GC if needed.
      consumerHolder.consumer = undefined
    },
    pre: (file: BabelFile) => {
      // `file` is Babel's File object, has `opts` like `filename`
      if (options.inputSourceMap) {
        try {
          let rawMap: RawSourceMap

          if (typeof options.inputSourceMap === 'string') {
            rawMap = JSON.parse(options.inputSourceMap) as RawSourceMap
          } else {
            rawMap = options.inputSourceMap
          }
          consumerHolder.consumer = new SourceMapConsumer(rawMap)
        } catch (errCaught: unknown) {
          const error = errCaught as ErrorWithMessage

          console.warn(
            `[inject-data-locator-original-source] Failed to initialize SourceMapConsumer for ${file.opts.filename}:`,
            error.message
          )
          consumerHolder.consumer = undefined
        }
      } else {
        consumerHolder.consumer = undefined
      }
    },
    visitor: {
      JSXElement: (path: NodePath<BabelTypes.JSXElement>, state: BabelState) => {
        const currentConsumer = consumerHolder.consumer
        const openingElement = path.node.openingElement
        const attributes = openingElement.attributes
        const filename = state.file.opts.filename || 'unknown'

        let filePath = filename
        const srcIndex = filename.lastIndexOf('/src/')

        if (srcIndex !== -1) {
          filePath = filename.substring(srcIndex + 1)
        } else {
          filePath = filename.split('/').pop() || filename
        }

        if (
          t.isJSXIdentifier(openingElement.name) &&
          openingElement.name.name === 'Fragment'
        ) {
          return
        }

        const hasDataLocator = attributes.some(
          attr => t.isJSXAttribute(attr) && attr.name.name === 'data-locator'
        )

        if (!hasDataLocator && path.node.loc) {
          let elementName = 'Unknown'

          if (t.isJSXIdentifier(openingElement.name)) {
            elementName = openingElement.name.name
          } else if (t.isJSXMemberExpression(openingElement.name)) {
            elementName = openingElement.name.property.name
          }

          const { start } = path.node.loc
          let finalLine = start.line // 1-indexed
          let finalColumn = start.column // 0-indexed
          let mapped = false

          if (currentConsumer) {
            try {
              const originalPosition = currentConsumer.originalPositionFor({
                // 1-indexed for lookup
                column: start.column,
                line: start.line // 0-indexed for lookup
              })

              if (
                originalPosition &&
                originalPosition.line != null &&
                originalPosition.column != null
              ) {
                finalLine = originalPosition.line // 1-indexed from sourcemap
                finalColumn = originalPosition.column // 0-indexed from sourcemap
                mapped = true
              }
            } catch (errCaught: unknown) {
              const error = errCaught as ErrorWithMessage

              console.warn(
                `[inject-data-locator-original-source] Error during source map lookup for ${elementName} in ${filename}:L${start.line}:C${start.column}`,
                error.message
              )
            }
          }

          const locatorValue = `${filePath}:${elementName}:${finalLine}:${finalColumn}`
          const dataLocatorAttr = t.jsxAttribute(
            t.jsxIdentifier('data-locator'),
            t.stringLiteral(locatorValue)
          )

          openingElement.attributes.push(dataLocatorAttr)

          console.log(
            `[inject-data-locator-original-source] Added data-locator (${mapped ? 'original' : 'generated'}): ${locatorValue} to ${elementName} in ${filename}${mapped ? ` (gen L${start.line}:C${start.column})` : `(L${start.line}:C${start.column})`}`
          )
        }
      }
    }
  }
}

// Babel plugin signature: a function that returns the plugin object.
// Receives babel object (with types, etc.) as first argument, and plugin options as second.
export default (
  babelAPI: { types: typeof BabelTypes; assertVersion: (version: number) => void },
  options: CustomPluginOptions
) => {
  babelAPI.assertVersion(7) // Ensure compatibility with Babel 7+

  return createPluginLogic(babelAPI, options)
}
