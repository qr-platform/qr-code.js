import { useLayoutEffect, useRef } from 'react'

const createHandlerSetter = (callback?: any) => {
  const handlerRef = useRef(callback)

  const setHandler = useRef((nextCallback: any) => {
    if (typeof nextCallback !== 'function') {
      throw new Error(
        "the argument supplied to the 'setHandler' function should be of type function"
      )
    }

    handlerRef.current = nextCallback
  })

  return [handlerRef, setHandler.current]
}

type SomeFunction = (...args: any[]) => any

const isFunction = (functionToCheck: unknown): functionToCheck is SomeFunction =>
  typeof functionToCheck === 'function' &&
  !!functionToCheck.constructor &&
  !!functionToCheck.call &&
  !!functionToCheck.apply

/**
 * Returns a callback setter for a callback to be performed when the component will unmount.
 */
const useWillUnmount = <TCallback extends GenericFunction>(callback?: TCallback) => {
  const mountRef = useRef(false)
  const [handler, setHandler] = createHandlerSetter<undefined>(callback)

  useLayoutEffect(() => {
    mountRef.current = true

    return () => {
      if (isFunction(handler?.current) && mountRef.current) {
        handler.current()
      }
    }
  }, [])

  return setHandler
}

/**
 * Returns an array where the first item is the [ref](https://reactjs.org/docs/hooks-reference.html#useref) to a
 * callback function and the second one is a reference to a function for can change the first ref.
 *
 * Although it looks quite similar to [useState](https://reactjs.org/docs/hooks-reference.html#usestate),
 * in this case the setter just makes sure the given callback is indeed a new function.
 * **Setting a callback ref does not force your component to re-render.**
 *
 * `createHandlerSetter` is meant to be used internally to abstracting other hooks.
 * Don't use this function to abstract hooks outside this library as it changes quite often
 */

export default useWillUnmount
