import React, { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import { qrConfigAtom } from '../store'

// This component handles synchronizing simple mode selections with URL parameters.
export const UrlSyncHandler: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)

  const {
    selectedTemplateId,
    selectedStyleId,
    selectedBorderId,
    selectedImageId,
    selectedTextTemplateId,
    isAdvancedMode, // Ensure URL params are cleared if in advanced mode
    setSelectedTemplateId,
    setSelectedStyleId,
    setSelectedBorderId,
    setSelectedImageId,
    setSelectedTextTemplateId
  } = qrConfig

  // Update URL parameters without reloading
  const updateUrlParams = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)

      // Clear simple mode params if in advanced mode
      if (isAdvancedMode) {
        url.searchParams.delete('templateId')
        url.searchParams.delete('styleId')
        url.searchParams.delete('borderId')
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

        if (selectedBorderId) {
          url.searchParams.set('borderId', selectedBorderId)
        } else {
          url.searchParams.delete('borderId')
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
    selectedBorderId,
    selectedImageId,
    selectedTextTemplateId,
    isAdvancedMode
  ])

  // Initialize state from URL on first render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const templateId = params.get('templateId')
      const styleId = params.get('styleId')
      const borderId = params.get('borderId')
      const imageId = params.get('image')
      const textId = params.get('textTemplateId')

      if (templateId) setSelectedTemplateId(templateId)
      if (styleId) setSelectedStyleId(styleId)
      if (borderId) setSelectedBorderId(borderId)
      if (imageId) setSelectedImageId(imageId)
      if (textId) setSelectedTextTemplateId(textId)
    }
    // We only want to run this on mount
  }, [])

  // This component does not render anything itself.
  // It's used for its side effect of syncing URL params.
  return null
}

// The old context and provider are no longer needed as state is managed by Zustand/Jotai.
// If other parts of the application were using useQRCode(), they will need to be
// refactored to use useAtom(qrConfigAtom) or selectors on useQrConfigStore.
