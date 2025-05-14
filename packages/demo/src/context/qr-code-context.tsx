import React, { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import { qrConfigAtom } from '../store'

// This component handles synchronizing simple mode selections with URL parameters.
export const UrlSyncHandler: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)

  const {
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    isAdvancedMode // Ensure URL params are cleared if in advanced mode
  } = qrConfig

  // Update URL parameters without reloading
  const updateUrlParams = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)

      // Clear simple mode params if in advanced mode
      if (isAdvancedMode) {
        url.searchParams.delete('templateId')
        url.searchParams.delete('styleId')
        url.searchParams.delete('image')
        url.searchParams.delete('textTemplateId')
      } else {
        if (selectedTemplateId) {
          url.searchParams.set('templateId', selectedTemplateId)
        } else {
          url.searchParams.delete('templateId')
        }

        if (selectedStyleId) {
          url.searchParams.set('styleId', selectedStyleId)
        } else {
          url.searchParams.delete('styleId')
        }

        if (selectedImageId && selectedImageId !== 'none') {
          url.searchParams.set('image', selectedImageId)
        } else {
          url.searchParams.delete('image')
        }

        if (selectedTextTemplateId) {
          url.searchParams.set('textTemplateId', selectedTextTemplateId)
        } else {
          url.searchParams.delete('textTemplateId')
        }
      }

      // Use pushState to change URL without reload
      if (window.history && window.history.pushState) {
        if (url.href !== window.location.href) {
          window.history.pushState({}, '', url)
        }
      }
    }
  }

  // Update URL when relevant simple mode selections change
  useEffect(() => {
    updateUrlParams()
  }, [
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    isAdvancedMode
  ])

  // This component does not render anything itself.
  // It's used for its side effect of syncing URL params.
  return null
}

// The old context and provider are no longer needed as state is managed by Zustand/Jotai.
// If other parts of the application were using useQRCode(), they will need to be
// refactored to use useAtom(qrConfigAtom) or selectors on useQrConfigStore.
