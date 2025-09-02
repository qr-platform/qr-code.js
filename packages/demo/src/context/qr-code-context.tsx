import React, { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import { qrConfigAtom } from '../store'

// This component handles synchronizing simple mode selections with URL parameters.
export const UrlSyncHandler: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)

  const { setTemplatesFromUrl } = qrConfig

  // Initialize state from URL on first render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const templateId = params.get('templateId')
      const styleId = params.get('styleId')
      const borderId = params.get('borderId')
      const imageId = params.get('image')
      const textId = params.get('textTemplateId')

      const urlParams = {
        templateId: templateId || undefined,
        styleId: styleId || undefined,
        borderId: borderId || undefined,
        imageId: imageId || undefined,
        textTemplateId: textId || undefined
      }
      setTemplatesFromUrl(urlParams)
      window.history.replaceState({}, '', window.location.pathname)
    }
    // We only want to run this on mount
  }, [setTemplatesFromUrl])

  // This component does not render anything itself.
  // It's used for its side effect of syncing URL params.
  return null
}

// The old context and provider are no longer needed as state is managed by Zustand/Jotai.
// If other parts of the application were using useQRCode(), they will need to be
// refactored to use useAtom(qrConfigAtom) or selectors on useQrConfigStore.
