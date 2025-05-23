import {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ImageMode,
  QRCodeJs,
  ShapeType
} from '@qr-platform/qr-code.js'
import { atomWithStore } from 'jotai-zustand'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { imageOptions } from '../data/qr-data'
import {
  AdvancedQROptions,
  BackgroundOptions,
  BorderOptions,
  ImageOptions as BuilderImageOptions, // Renamed to avoid conflict
  QROptions as BuilderQROptions, // Renamed to avoid conflict
  CornerDotOptions,
  CornerSquareOptions,
  DotsOptions
} from '../types/qr-options'

// Default Advanced Options
const defaultAdvancedOptions: AdvancedQROptions = {
  data: 'https://qr-platform.com/advanced',
  shape: ShapeType.square,
  margin: 0,
  qrOptions: {
    errorCorrectionLevel: ErrorCorrectionLevel.Q,
    typeNumber: 0,
    mode: undefined // Let library auto-detect
  },
  dotsOptions: {
    type: DotType.square,
    color: '#000000'
  },
  cornersSquareOptions: {
    type: CornerSquareType.square,
    color: '#000000'
  },
  cornersDotOptions: {
    type: CornerDotType.square,
    color: '#000000'
  },
  backgroundOptions: {
    color: '#FFFFFF'
  },
  imageOptions: {
    image: undefined,
    imageSize: 0.4,
    margin: 4,
    mode: ImageMode.center
  },
  borderOptions: {
    hasBorder: false
  },
  isResponsive: false,
  scale: 1,
  offset: 0,
  verticalOffset: 0,
  horizontalOffset: 0
}

export interface QRCodePreset {
  name: string
  qrData: string
  selectedTemplateId?: string
  selectedStyleId?: string
  selectedBorderId?: string
  selectedTextTemplateId?: string
  selectedImageId?: string
  advancedOptions?: AdvancedQROptions
}

export interface UrlTemplateParams {
  templateId?: string
  styleId?: string
  borderId?: string
  imageId?: string
  textTemplateId?: string
}

export interface QRConfigState {
  qrData: string
  selectedTemplateId: string
  selectedStyleId: string
  selectedBorderId: string
  selectedTextTemplateId: string
  selectedImageId: string
  selectedImage?: string // Added property to store the image URL
  editMode: string
  isAdvancedMode: boolean
  isCodeMode: boolean
  isPreviewMode: boolean
  advancedOptions: AdvancedQROptions
  activeGalleryTabId?: string
  scrollToGalleryTabId: string | null

  // Custom Text Override State
  isCustomTextOverrideEnabled: boolean
  customTextOverridePosition: 'all' | 'top' | 'bottom' | 'left' | 'right'
  customTextOverrides: {
    all?: string
    top?: string
    bottom?: string
    left?: string
    right?: string
  }

  initialDefaultQrData: string
  initialDefaultSelectedTemplateId: string
  initialDefaultSelectedStyleId: string
  initialDefaultSelectedBorderId: string
  initialDefaultSelectedTextTemplateId: string
  initialDefaultSelectedImageId: string
  initialDefaultEditMode: string
  initialDefaultAdvancedOptions: AdvancedQROptions
  initialDefaultIsCustomTextOverrideEnabled: boolean
  initialDefaultCustomTextOverridePosition: 'all' | 'top' | 'bottom' | 'left' | 'right'
  initialDefaultCustomTextOverrides: {
    all?: string
    top?: string
    bottom?: string
    left?: string
    right?: string
  }

  setQrData: (data: string) => void
  setSelectedTemplateId: (id: string) => void
  setSelectedStyleId: (id: string) => void
  setSelectedBorderId: (id: string) => void
  setSelectedTextTemplateId: (id: string) => void
  setSelectedImageId: (id: string) => void
  setEditMode: (mode: string) => void
  setAdvancedOptions: (options: Partial<AdvancedQROptions>) => void
  setAdvancedOption: <K extends keyof AdvancedQROptions>(
    key: K,
    value: AdvancedQROptions[K]
  ) => void
  setAdvancedDotsOption: <K extends keyof DotsOptions>(
    key: K,
    value: DotsOptions[K]
  ) => void
  setAdvancedCornersSquareOption: <K extends keyof CornerSquareOptions>(
    key: K,
    value: CornerSquareOptions[K]
  ) => void
  setAdvancedCornersDotOption: <K extends keyof CornerDotOptions>(
    key: K,
    value: CornerDotOptions[K]
  ) => void
  setAdvancedBackgroundOption: <K extends keyof BackgroundOptions>(
    key: K,
    value: BackgroundOptions[K]
  ) => void
  setAdvancedImageOption: <K extends keyof BuilderImageOptions>( // Use renamed type
    key: K,
    value: BuilderImageOptions[K]
  ) => void
  setAdvancedQrOption: <K extends keyof BuilderQROptions>( // Use renamed type
    key: K,
    value: BuilderQROptions[K]
  ) => void
  setAdvancedBorderOption: <K extends keyof BorderOptions>(
    key: K,
    value: BorderOptions[K]
  ) => void
  applyTemplatesToAdvancedOptions: () => void

  // Base Template Actions
  setRandomBaseTemplate: () => void
  setNextBaseTemplate: () => void
  setPrevBaseTemplate: () => void
  resetBaseTemplate: () => void

  // Style Template Actions
  setRandomStyleTemplate: () => void
  setNextStyleTemplate: () => void
  setPrevStyleTemplate: () => void
  resetStyleTemplate: () => void

  // Border Template Actions
  setRandomBorderTemplate: () => void
  setNextBorderTemplate: () => void
  setPrevBorderTemplate: () => void
  resetBorderTemplate: () => void

  // Text Template Actions
  setRandomTextTemplate: () => void
  setNextTextTemplate: () => void
  setPrevTextTemplate: () => void
  resetTextTemplate: () => void

  // Image Actions
  setRandomImage: () => void
  setNextImage: () => void
  setPrevImage: () => void
  resetImage: () => void

  // Global Template Actions
  setRandomAllTemplates: () => void
  resetAllTemplates: () => void

  // Custom Text Override Actions
  setIsCustomTextOverrideEnabled: (enabled: boolean) => void
  setCustomTextOverridePosition: (
    position: 'all' | 'top' | 'bottom' | 'left' | 'right'
  ) => void
  setCustomTextOverride: (
    position: 'all' | 'top' | 'bottom' | 'left' | 'right',
    text: string
  ) => void
  resetCustomTextOverrides: () => void

  resetToDefaults: () => void
  savePreset: (presetName: string) => void
  loadPreset: (presetName: string) => void
  deletePreset: (presetName: string) => void
  listSavedPresets: () => Array<{ name: string }>
  exportPresetToJSON: () => void
  importPresetFromJSON: (file: File) => Promise<void>

  // Getter methods for selected template names
  getSelectedBaseTemplateName: () => string
  getSelectedStyleTemplateName: () => string
  getSelectedBorderTemplateName: () => string
  getSelectedTextTemplateName: () => string
  getSelectedImageName: () => string

  setActiveGalleryTabId: (tabId: string) => void
  browseAndScrollToGalleryTab: (tabId: string) => void // <<< ADD THIS LINE
  clearScrollToGalleryTrigger: () => void // <<< ADD THIS LINE
  setTemplatesFromUrl: (params: UrlTemplateParams) => void
}

// Get templates from QRCodeJs library
export const templatesData = QRCodeJs.getTemplates()

const initialQrData = 'https://qr-platform.com'
const initialTemplateId = templatesData.baseTemplates[0]?.id || 'base'
const initialStyleId = templatesData.styleTemplates[0]?.id || 'square'
const initialBorderId = templatesData.borderTemplates[0]?.id || 'square-border-thin'
const initialTextTemplateId = templatesData.textTemplates[0]?.id || 'scan-me'
const initialImageId = imageOptions[0]?.id || 'none'
const initialImage = undefined

// Initial values for custom text override
const initialIsCustomTextOverrideEnabled = false
const initialCustomTextOverridePosition = 'all' as
  | 'all'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
const initialCustomTextOverrides = {}

const createQrConfigStore = (set: any, get: any): QRConfigState => {
  // Helper function for circular navigation
  const getNextPrevId = (
    currentId: string,
    items: Array<{ id: string }>,
    direction: 'next' | 'prev'
  ): string => {
    if (!items || items.length === 0) {
      return currentId // Or a default/fallback ID
    }
    const currentIndex = items.findIndex(item => item.id === currentId)
    if (currentIndex === -1) {
      return items[0]?.id || currentId // Default to first if current not found
    }

    let nextIndex
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % items.length
    } else {
      nextIndex = (currentIndex - 1 + items.length) % items.length
    }
    return items[nextIndex]?.id || currentId
  }

  return {
    qrData: initialQrData,
    selectedTemplateId: initialTemplateId,
    selectedStyleId: initialStyleId,
    selectedBorderId: initialBorderId,
    selectedTextTemplateId: initialTextTemplateId,
    selectedImageId: initialImageId,
    selectedImage: initialImage,
    editMode: 'Templates',
    isAdvancedMode: false,
    isCodeMode: false,
    isPreviewMode: false,
    initialDefaultEditMode: 'Templates',
    advancedOptions: JSON.parse(JSON.stringify(defaultAdvancedOptions)), // Deep copy
    activeGalleryTabId: 'base',
    scrollToGalleryTabId: null,

    // Custom Text Override State
    isCustomTextOverrideEnabled: initialIsCustomTextOverrideEnabled,
    customTextOverridePosition: initialCustomTextOverridePosition,
    customTextOverrides: { ...initialCustomTextOverrides },

    initialDefaultQrData: initialQrData,
    initialDefaultSelectedTemplateId: initialTemplateId,
    initialDefaultSelectedStyleId: initialStyleId,
    initialDefaultSelectedBorderId: initialBorderId,
    initialDefaultSelectedTextTemplateId: initialTextTemplateId,
    initialDefaultSelectedImageId: initialImageId,
    initialDefaultAdvancedOptions: JSON.parse(JSON.stringify(defaultAdvancedOptions)), // Deep copy
    initialDefaultIsCustomTextOverrideEnabled: initialIsCustomTextOverrideEnabled,
    initialDefaultCustomTextOverridePosition: initialCustomTextOverridePosition,
    initialDefaultCustomTextOverrides: { ...initialCustomTextOverrides },

    setQrData: data => {
      set({ qrData: data })
    },
    setSelectedTemplateId: id => set({ selectedTemplateId: id }),
    setSelectedStyleId: id => set({ selectedStyleId: id }),
    setSelectedBorderId: id => set({ selectedBorderId: id }),
    setSelectedTextTemplateId: id => set({ selectedTextTemplateId: id }),
    setSelectedImageId: id => {
      const selectedImageOption = imageOptions.find(img => img.id === id)
      set({
        selectedImageId: id,
        selectedImage: selectedImageOption?.value || undefined
      })
    },
    setEditMode: mode =>
      set({
        editMode: mode,
        isAdvancedMode: mode === 'Advanced',
        isCodeMode: mode === 'Code',
        isPreviewMode: mode === 'Preview'
      }),
    setAdvancedOptions: options =>
      set((state: QRConfigState) => ({
        advancedOptions: { ...state.advancedOptions, ...options }
      })),
    setAdvancedOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: { ...state.advancedOptions, [key]: value }
      })),

    setAdvancedDotsOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: {
          ...state.advancedOptions,
          dotsOptions: { ...state.advancedOptions.dotsOptions, [key]: value }
        }
      })),
    setAdvancedCornersSquareOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: {
          ...state.advancedOptions,
          cornersSquareOptions: {
            ...state.advancedOptions.cornersSquareOptions,
            [key]: value
          }
        }
      })),
    setAdvancedCornersDotOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: {
          ...state.advancedOptions,
          cornersDotOptions: {
            ...state.advancedOptions.cornersDotOptions,
            [key]: value
          }
        }
      })),
    setAdvancedBackgroundOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: {
          ...state.advancedOptions,
          backgroundOptions: {
            ...state.advancedOptions.backgroundOptions,
            [key]: value
          }
        }
      })),
    setAdvancedImageOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: {
          ...state.advancedOptions,
          imageOptions: { ...state.advancedOptions.imageOptions, [key]: value }
        }
      })),
    setAdvancedQrOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: {
          ...state.advancedOptions,
          qrOptions: { ...state.advancedOptions.qrOptions, [key]: value }
        }
      })),
    setAdvancedBorderOption: (key, value) =>
      set((state: QRConfigState) => ({
        advancedOptions: {
          ...state.advancedOptions,
          borderOptions: { ...state.advancedOptions.borderOptions, [key]: value }
        }
      })),

    applyTemplatesToAdvancedOptions: () => {
      const state = get()
      const { findTemplateById, findBorderById, findStyleById, findTextTemplateById } =
        templatesData

      const mergeDefaults = (target: any, source: any) => {
        if (!source) return target
        for (const k of Object.keys(source)) {
          const sv = source[k]
          if (sv && typeof sv === 'object' && !Array.isArray(sv)) {
            if (target[k] == null) target[k] = {}
            mergeDefaults(target[k], sv)
          } else if (target[k] === undefined) {
            target[k] = sv
          }
        }
        return target
      }

      const defaults: any = { data: state.qrData }

      mergeDefaults(defaults, findTemplateById(state.selectedTemplateId)?.options)
      mergeDefaults(defaults, findBorderById(state.selectedBorderId)?.options)

      const style = findStyleById(state.selectedStyleId)?.style
      if (style) {
        mergeDefaults(defaults, {
          dotsOptions: { color: style.primaryColor },
          cornersSquareOptions: { color: style.secondaryColor },
          cornersDotOptions: { color: style.thirdColor },
          backgroundOptions: { color: style.backgroundColor }
        })
      }

      const text = findTextTemplateById(state.selectedTextTemplateId)?.options
      if (text) {
        const decorations: any = {}
        if (text.topValue)
          decorations.top = { enableText: true, type: 'text', value: text.topValue }
        if (text.bottomValue)
          decorations.bottom = {
            enableText: true,
            type: 'text',
            value: text.bottomValue
          }
        if (text.value)
          decorations.bottom = { enableText: true, type: 'text', value: text.value }
        if (Object.keys(decorations).length) {
          mergeDefaults(defaults, { borderOptions: { decorations } })
        }
      }

      if (state.selectedImage) {
        mergeDefaults(defaults, { imageOptions: { image: state.selectedImage } })
      }

      const newOptions = JSON.parse(JSON.stringify(state.advancedOptions))
      mergeDefaults(newOptions, defaults)
      set({ advancedOptions: newOptions })
    },

    // --- Base Template Actions ---
    setRandomBaseTemplate: () => {
      const templates = templatesData.baseTemplates
      if (templates && templates.length > 0) {
        const randomIndex = Math.floor(Math.random() * templates.length)
        set({ selectedTemplateId: templates[randomIndex].id })
      }
    },
    setNextBaseTemplate: () => {
      set((state: QRConfigState) => ({
        selectedTemplateId: getNextPrevId(
          state.selectedTemplateId,
          templatesData.baseTemplates,
          'next'
        )
      }))
    },
    setPrevBaseTemplate: () => {
      set((state: QRConfigState) => ({
        selectedTemplateId: getNextPrevId(
          state.selectedTemplateId,
          templatesData.baseTemplates,
          'prev'
        )
      }))
    },
    resetBaseTemplate: () => {
      set((state: QRConfigState) => ({
        selectedTemplateId: state.initialDefaultSelectedTemplateId
      }))
    },

    // --- Style Template Actions ---
    setRandomStyleTemplate: () => {
      const templates = templatesData.styleTemplates
      if (templates && templates.length > 0) {
        const randomIndex = Math.floor(Math.random() * templates.length)
        set({ selectedStyleId: templates[randomIndex].id })
      }
    },
    setNextStyleTemplate: () => {
      set((state: QRConfigState) => ({
        selectedStyleId: getNextPrevId(
          state.selectedStyleId,
          templatesData.styleTemplates,
          'next'
        )
      }))
    },
    setPrevStyleTemplate: () => {
      set((state: QRConfigState) => ({
        selectedStyleId: getNextPrevId(
          state.selectedStyleId,
          templatesData.styleTemplates,
          'prev'
        )
      }))
    },
    resetStyleTemplate: () => {
      set((state: QRConfigState) => ({
        selectedStyleId: state.initialDefaultSelectedStyleId
      }))
    },

    // --- Border Template Actions ---
    setRandomBorderTemplate: () => {
      const templates = templatesData.borderTemplates
      if (templates && templates.length > 0) {
        const randomIndex = Math.floor(Math.random() * templates.length)
        set({ selectedBorderId: templates[randomIndex].id })
      }
    },
    setNextBorderTemplate: () => {
      set((state: QRConfigState) => ({
        selectedBorderId: getNextPrevId(
          state.selectedBorderId,
          templatesData.borderTemplates,
          'next'
        )
      }))
    },
    setPrevBorderTemplate: () => {
      set((state: QRConfigState) => ({
        selectedBorderId: getNextPrevId(
          state.selectedBorderId,
          templatesData.borderTemplates,
          'prev'
        )
      }))
    },
    resetBorderTemplate: () => {
      set((state: QRConfigState) => ({
        selectedBorderId: state.initialDefaultSelectedBorderId
      }))
    },

    // --- Text Template Actions ---
    setRandomTextTemplate: () => {
      const templates = templatesData.textTemplates
      if (templates && templates.length > 0) {
        const randomIndex = Math.floor(Math.random() * templates.length)
        set({ selectedTextTemplateId: templates[randomIndex].id })
      }
    },
    setNextTextTemplate: () => {
      set((state: QRConfigState) => ({
        selectedTextTemplateId: getNextPrevId(
          state.selectedTextTemplateId,
          templatesData.textTemplates,
          'next'
        )
      }))
    },
    setPrevTextTemplate: () => {
      set((state: QRConfigState) => ({
        selectedTextTemplateId: getNextPrevId(
          state.selectedTextTemplateId,
          templatesData.textTemplates,
          'prev'
        )
      }))
    },
    resetTextTemplate: () => {
      set((state: QRConfigState) => ({
        selectedTextTemplateId: state.initialDefaultSelectedTextTemplateId
      }))
    },

    // --- Image Actions ---
    setRandomImage: () => {
      if (imageOptions && imageOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * imageOptions.length)
        const randomImage = imageOptions[randomIndex]
        set({
          selectedImageId: randomImage.id,
          selectedImage: randomImage.value || undefined
        })
      }
    },
    setNextImage: () => {
      set((state: QRConfigState) => {
        const nextId = getNextPrevId(state.selectedImageId, imageOptions, 'next')
        const nextImageOption = imageOptions.find(img => img.id === nextId)
        return {
          selectedImageId: nextId,
          selectedImage: nextImageOption?.value || undefined
        }
      })
    },
    setPrevImage: () => {
      set((state: QRConfigState) => {
        const prevId = getNextPrevId(state.selectedImageId, imageOptions, 'prev')
        const prevImageOption = imageOptions.find(img => img.id === prevId)
        return {
          selectedImageId: prevId,
          selectedImage: prevImageOption?.value || undefined
        }
      })
    },
    resetImage: () => {
      set((state: QRConfigState) => {
        const initialImageOption = imageOptions.find(
          img => img.id === state.initialDefaultSelectedImageId
        )
        return {
          selectedImageId: state.initialDefaultSelectedImageId,
          selectedImage: initialImageOption?.value || undefined
        }
      })
    },

    // --- Global Template Actions ---
    setRandomAllTemplates: () => {
      get().setRandomBaseTemplate()
      get().setRandomStyleTemplate()
      get().setRandomBorderTemplate()
      get().setRandomTextTemplate()
      get().setRandomImage()
    },
    resetAllTemplates: () => {
      get().resetBaseTemplate()
      get().resetStyleTemplate()
      get().resetBorderTemplate()
      get().resetTextTemplate()
      get().resetImage()
      get().resetCustomTextOverrides() // Reset custom text overrides as well
    },

    // --- Custom Text Override Actions ---
    setIsCustomTextOverrideEnabled: enabled =>
      set({ isCustomTextOverrideEnabled: enabled }),
    setCustomTextOverridePosition: position =>
      set({ customTextOverridePosition: position }),
    setCustomTextOverride: (position, text) =>
      set((state: QRConfigState) => ({
        customTextOverrides: {
          ...state.customTextOverrides,
          [position]: text
        }
      })),
    resetCustomTextOverrides: () =>
      set((state: QRConfigState) => ({
        isCustomTextOverrideEnabled: state.initialDefaultIsCustomTextOverrideEnabled,
        customTextOverridePosition: state.initialDefaultCustomTextOverridePosition,
        customTextOverrides: { ...state.initialDefaultCustomTextOverrides }
      })),

    resetToDefaults: () => {
      const selectedImageOption = imageOptions.find(
        img => img.id === get().initialDefaultSelectedImageId
      )
      set((state: QRConfigState) => ({
        qrData: state.initialDefaultQrData,
        selectedTemplateId: state.initialDefaultSelectedTemplateId,
        selectedStyleId: state.initialDefaultSelectedStyleId,
        selectedBorderId: state.initialDefaultSelectedBorderId,
        selectedTextTemplateId: state.initialDefaultSelectedTextTemplateId,
        selectedImageId: state.initialDefaultSelectedImageId,
        selectedImage: selectedImageOption?.value || undefined,
        editMode: state.initialDefaultEditMode,
        advancedOptions: JSON.parse(JSON.stringify(state.initialDefaultAdvancedOptions)), // Deep copy
        isCustomTextOverrideEnabled: state.initialDefaultIsCustomTextOverrideEnabled,
        customTextOverridePosition: state.initialDefaultCustomTextOverridePosition,
        customTextOverrides: { ...state.initialDefaultCustomTextOverrides }
      }))
    },

    savePreset: presetName => {
      const state = get()
      const preset: QRCodePreset = {
        name: presetName,
        qrData: state.qrData,
        selectedTemplateId: state.selectedTemplateId,
        selectedStyleId: state.selectedStyleId,
        selectedBorderId: state.selectedBorderId,
        selectedTextTemplateId: state.selectedTextTemplateId,
        selectedImageId: state.selectedImageId,
        advancedOptions: state.advancedOptions
      }
      try {
        const presets = JSON.parse(localStorage.getItem('qrCodePresets') || '[]')
        const existingIndex = presets.findIndex(
          (p: QRCodePreset) => p.name === presetName
        )
        if (existingIndex > -1) {
          presets[existingIndex] = preset
        } else {
          presets.push(preset)
        }
        localStorage.setItem('qrCodePresets', JSON.stringify(presets))
      } catch (error) {
        console.error('Failed to save preset to localStorage:', error)
      }
    },

    loadPreset: presetName => {
      try {
        const presets = JSON.parse(localStorage.getItem('qrCodePresets') || '[]')
        const preset = presets.find((p: QRCodePreset) => p.name === presetName)
        if (preset) {
          const selectedImageId =
            preset.selectedImageId || get().initialDefaultSelectedImageId
          const selectedImageOption = imageOptions.find(img => img.id === selectedImageId)

          set({
            qrData: preset.qrData,
            selectedTemplateId:
              preset.selectedTemplateId || get().initialDefaultSelectedTemplateId,
            selectedStyleId:
              preset.selectedStyleId || get().initialDefaultSelectedStyleId,
            selectedBorderId:
              preset.selectedBorderId || get().initialDefaultSelectedBorderId,
            selectedTextTemplateId:
              preset.selectedTextTemplateId || get().initialDefaultSelectedTextTemplateId,
            selectedImageId,
            selectedImage: selectedImageOption?.value || undefined,
            advancedOptions:
              preset.advancedOptions ||
              JSON.parse(JSON.stringify(get().initialDefaultAdvancedOptions))
          })
        } else {
          console.warn(`Preset "${presetName}" not found.`)
        }
      } catch (error) {
        console.error('Failed to load preset from localStorage:', error)
      }
    },

    deletePreset: presetName => {
      try {
        let presets = JSON.parse(localStorage.getItem('qrCodePresets') || '[]')
        presets = presets.filter((p: QRCodePreset) => p.name !== presetName)
        localStorage.setItem('qrCodePresets', JSON.stringify(presets))
      } catch (error) {
        console.error('Failed to delete preset from localStorage:', error)
      }
    },

    listSavedPresets: () => {
      try {
        const presets = JSON.parse(localStorage.getItem('qrCodePresets') || '[]')
        return presets.map((p: QRCodePreset) => ({ name: p.name }))
      } catch (error) {
        console.error('Failed to list presets from localStorage:', error)
        return []
      }
    },

    exportPresetToJSON: () => {
      const state = get()
      const preset: QRCodePreset = {
        name: `QRCodePreset_${new Date().toISOString().slice(0, 10)}`, // Default name
        qrData: state.qrData,
        selectedTemplateId: state.selectedTemplateId,
        selectedStyleId: state.selectedStyleId,
        selectedBorderId: state.selectedBorderId,
        selectedTextTemplateId: state.selectedTextTemplateId,
        selectedImageId: state.selectedImageId,
        advancedOptions: state.advancedOptions
      }
      try {
        const jsonString = JSON.stringify(preset, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${preset.name}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
      } catch (error) {
        console.error('Failed to export preset to JSON:', error)
      }
    },

    importPresetFromJSON: async file => {
      if (!file) {
        console.error('No file selected for import.')
        return
      }
      try {
        const text = await file.text()
        const preset = JSON.parse(text) as QRCodePreset

        // Basic validation
        if (typeof preset.name !== 'string' || typeof preset.qrData !== 'string') {
          throw new Error('Invalid preset file format.')
        }

        const selectedImageId =
          preset.selectedImageId || get().initialDefaultSelectedImageId
        const selectedImageOption = imageOptions.find(img => img.id === selectedImageId)

        set({
          qrData: preset.qrData,
          selectedTemplateId:
            preset.selectedTemplateId || get().initialDefaultSelectedTemplateId,
          selectedStyleId: preset.selectedStyleId || get().initialDefaultSelectedStyleId,
          selectedBorderId:
            preset.selectedBorderId || get().initialDefaultSelectedBorderId,
          selectedTextTemplateId:
            preset.selectedTextTemplateId || get().initialDefaultSelectedTextTemplateId,
          selectedImageId,
          selectedImage: selectedImageOption?.value || undefined,
          advancedOptions:
            preset.advancedOptions ||
            JSON.parse(JSON.stringify(get().initialDefaultAdvancedOptions))
        })
        // Optionally, save the imported preset
        // get().savePreset(preset.name);
      } catch (error) {
        console.error('Failed to import preset from JSON:', error)
        alert(
          `Error importing preset: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    },

    // --- Getter Implementations ---
    getSelectedBaseTemplateName: () => {
      const state = get()
      const template = templatesData.baseTemplates.find(
        t => t.id === state.selectedTemplateId
      )
      return template ? template.name : 'Default'
    },
    getSelectedStyleTemplateName: () => {
      const state = get()
      const style = templatesData.styleTemplates.find(s => s.id === state.selectedStyleId)
      return style ? style.name : 'Default'
    },
    getSelectedBorderTemplateName: () => {
      const state = get()
      const border = templatesData.borderTemplates.find(
        b => b.id === state.selectedBorderId
      )
      return border ? border.name : 'Default'
    },
    getSelectedTextTemplateName: () => {
      const state = get()
      const text = templatesData.textTemplates.find(
        t => t.id === state.selectedTextTemplateId
      )
      return text ? text.name : 'Default'
    },
    getSelectedImageName: () => {
      const state = get()
      if (state.selectedImageId === 'none') {
        return 'None'
      }
      const image = imageOptions.find(img => img.id === state.selectedImageId)
      return image ? image.name : 'Default'
    },
    setActiveGalleryTabId: tabId => set({ activeGalleryTabId: tabId }),
    browseAndScrollToGalleryTab: (tabId: string) => {
      set({
        activeGalleryTabId: tabId,
        scrollToGalleryTabId: tabId
      })
    },
    clearScrollToGalleryTrigger: () => set({ scrollToGalleryTabId: null }),
    setTemplatesFromUrl: (params: UrlTemplateParams) => {
      set((state: QRConfigState) => {
        const newState: Partial<QRConfigState> = {}
        if (typeof params.templateId === 'string') {
          newState.selectedTemplateId = params.templateId
        }
        if (typeof params.styleId === 'string') {
          newState.selectedStyleId = params.styleId
        }
        if (typeof params.borderId === 'string') {
          newState.selectedBorderId = params.borderId
        }
        if (typeof params.textTemplateId === 'string') {
          newState.selectedTextTemplateId = params.textTemplateId
        }
        if (typeof params.imageId === 'string') {
          newState.selectedImageId = params.imageId
          const selectedImageOption = imageOptions.find(img => img.id === params.imageId)
          newState.selectedImage = selectedImageOption?.value || undefined
        }
        return { ...state, ...newState }
      })
    }
  }
}

export const useQrConfigStore = create<QRConfigState>()(
  persist(createQrConfigStore, { name: 'qr-config-storage' })
)

export const qrConfigAtom = atomWithStore(useQrConfigStore)
