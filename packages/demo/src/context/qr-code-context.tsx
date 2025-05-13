import React from 'react'

import { imageOptions } from '../data/qr-data'

interface QRCodeContextType {
  selectedTemplateId: string
  setSelectedTemplateId: (id: string) => void
  selectedStyleId: string
  setSelectedStyleId: (id: string) => void
  selectedImageId: string
  setSelectedImageId: (id: string) => void
  selectedTextTemplateId: string
  setSelectedTextTemplateId: (id: string) => void
  qrData: string
  setQrData: (data: string) => void
  getSelectedImageUrl: () => string | null
  updateUrlParams: () => void
  isAdvancedMode: boolean
  setIsAdvancedMode: (value: boolean) => void
  advancedOptions: any
  setAdvancedOptions: (options: any) => void
}

// Define the advanced options interface
export interface AdvancedQROptions {
  dots: {
    type: string
    color: string
    size: number
  }
  corners: {
    squareType: string
    squareColor: string
    dotType: string
    dotColor: string
  }
  background: {
    color: string
    round: number
  }
  shape: {
    type: string
    margin: number
  }
  errorCorrection: string
}

export const QRCodeContext = React.createContext<QRCodeContextType>({
  selectedTemplateId: '',
  setSelectedTemplateId: () => {},
  selectedStyleId: '',
  setSelectedStyleId: () => {},
  selectedImageId: 'none',
  setSelectedImageId: () => {},
  selectedTextTemplateId: '',
  setSelectedTextTemplateId: () => {},
  qrData: 'https://qr-platform.com',
  setQrData: () => {},
  getSelectedImageUrl: () => null,
  updateUrlParams: () => {},
  isAdvancedMode: false,
  setIsAdvancedMode: () => {},
  advancedOptions: {},
  setAdvancedOptions: () => {}
})

export const QRCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial state from URL parameters
  const getInitialParam = (paramName: string, defaultValue: string = '') => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get(paramName) || defaultValue
    }
    return defaultValue
  }

  const [selectedTemplateId, setSelectedTemplateId] = React.useState(
    getInitialParam('templateId')
  )
  const [selectedStyleId, setSelectedStyleId] = React.useState(getInitialParam('styleId'))
  const [selectedImageId, setSelectedImageId] = React.useState(
    getInitialParam('image', 'none')
  )
  const [selectedTextTemplateId, setSelectedTextTemplateId] = React.useState(
    getInitialParam('textTemplateId')
  )
  const [qrData, setQrData] = React.useState('https://qr-platform.com')
  const [isAdvancedMode, setIsAdvancedMode] = React.useState(false)
  const [advancedOptions, setAdvancedOptions] = React.useState({
    shape: { type: 'square', margin: 0 },
    errorCorrection: 'H',
    dots: { type: 'square', color: '#000000', size: 0.5 },
    corners: {
      squareType: 'square',
      squareColor: '#000000',
      dotType: 'square',
      dotColor: '#000000'
    },
    background: { color: '#FFFFFF', round: 0 }
  })

  // Get the URL for the selected image
  const getSelectedImageUrl = () => {
    if (selectedImageId === 'none') return null
    const selectedImage = imageOptions.find(img => img.id === selectedImageId)
    return selectedImage ? selectedImage.value : null
  }

  // Update URL parameters without reloading
  const updateUrlParams = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)

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

      // Use pushState to change URL without reload
      if (window.history && window.history.pushState) {
        window.history.pushState({}, '', url)
      }
    }
  }

  // Update URL when selections change
  React.useEffect(() => {
    updateUrlParams()
  }, [selectedTemplateId, selectedStyleId, selectedImageId, selectedTextTemplateId])

  // Function to update a specific advanced option
  const updateAdvancedOption = (category: string, option: string, value: any) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof AdvancedQROptions],
        [option]: value
      }
    }))
  }

  const value = {
    selectedTemplateId,
    setSelectedTemplateId,
    selectedStyleId,
    setSelectedStyleId,
    selectedImageId,
    setSelectedImageId,
    selectedTextTemplateId,
    setSelectedTextTemplateId,
    qrData,
    setQrData,
    getSelectedImageUrl,
    updateUrlParams,
    isAdvancedMode,
    setIsAdvancedMode,
    advancedOptions,
    setAdvancedOptions
  }

  return <QRCodeContext.Provider value={value}>{children}</QRCodeContext.Provider>
}

export const useQRCode = () => React.useContext(QRCodeContext)
