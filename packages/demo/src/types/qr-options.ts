import {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  GradientType,
  ImageMode,
  Mode,
  ShapeType
} from '@qr-platform/qr-code.js'

export interface GradientColorStop {
  offset: number
  color: string
}

export interface Gradient {
  type: GradientType
  rotation?: number
  colorStops: GradientColorStop[]
}

export interface QROptions {
  typeNumber?: number // 0-40
  mode?: Mode
  errorCorrectionLevel?: ErrorCorrectionLevel
}

export interface DotsOptions {
  type?: DotType
  color?: string
  size?: number
  gradient?: Gradient
}

export interface CornerSquareOptions {
  type?: CornerSquareType
  color?: string
  gradient?: Gradient
}

export interface CornerDotOptions {
  type?: CornerDotType
  color?: string
  gradient?: Gradient
}

export interface BackgroundOptions {
  color?: string
  round?: number | string // 0-1 or percentage
  gradient?: Gradient
}

export interface ImageOptions {
  image?: string // URL or DataURL
  mode?: ImageMode
  imageSize?: number // 0-1
  margin?: number
  crossOrigin?: string
  fill?: {
    color?: string
    gradient?: Gradient
  }
}

export interface FontStyle {
  fontFace?: string
  fontSize?: number
  fontColor?: string
  letterSpacing?: number
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
  fontWeight?: 'normal' | 'bold'
}

export interface DecorationItem {
  disabled?: boolean
  enableText?: boolean
  offset?: number
  curveAdjustment?: number
  curveDisabled?: boolean
  curveRadius?: string // e.g., '50%', '100px'
  type?: 'text' | 'image'
  value?: string
  style?: FontStyle
}

export interface BorderOptions {
  hasBorder?: boolean
  thickness?: number
  color?: string
  radius?: string // e.g., '10%', '20px'
  noBorderThickness?: number
  background?: string
  inner?: {
    radius?: string
    scale?: number // 0 to 1.5
    horizontalOffset?: number
    verticalOffset?: number
  }
  borderOuter?: {
    color?: string
    thickness?: number
  }
  borderInner?: {
    color?: string
    thickness?: number
  }
  decorations?: {
    top?: DecorationItem
    right?: DecorationItem
    bottom?: DecorationItem
    left?: DecorationItem
  }
}

export interface AdvancedQROptions {
  // Core
  data: string
  shape?: ShapeType
  margin?: number
  qrOptions?: QROptions

  // Dots
  dotsOptions?: DotsOptions

  // Corner Squares
  cornersSquareOptions?: CornerSquareOptions

  // Corner Dots
  cornersDotOptions?: CornerDotOptions

  // Background
  backgroundOptions?: BackgroundOptions

  // Image
  imageOptions?: ImageOptions

  // Layout
  isResponsive?: boolean
  scale?: number // 0 to 1.5
  offset?: number
  verticalOffset?: number
  horizontalOffset?: number

  // Borders
  borderOptions?: BorderOptions
}
