// Mock data to simulate the original imports

// Image options with IDs
export const imageOptions = [
  { id: 'none', name: 'No Image', value: null },
  {
    id: 'html5',
    name: 'HTML 5 PNG',
    value: 'https://cdn-icons-png.flaticon.com/512/5968/5968267.png'
  },
  {
    id: 'leaf',
    name: 'Leaf Data URL',
    value:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUwNC4xMjUgNTA0LjEyNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0E3RjBEOyIgZD0iTTMzOS43NzIsMGMwLDAsNDQuNTM2LDEwOC45NTQtMTQ2LjMzNywxODIuMTM4Qzg5LjcxOSwyMjEuODkzLDEwLjA1OSwzMjMuNzg5LDEwNS4xNzMsNDgxLjE5Mw0KCWM3Ljg3Ny03MC4zNTcsNDEuNjUzLTIyNS40ODUsMTg2Ljg4OC0yNjAuODg0YzAsMC0xMzUuMTc2LDUwLjU0Ni0xNDcuMTE3LDI3OS4zNDdjNjkuNDU5LDkuNzUyLDIzMi4zNjEsMTYuMzA1LDI4MC43MjYtMTI1LjA2Mg0KCUM0ODkuNTM2LDE4Ny44MTcsMzM5Ljc3MiwwLDMzOS43NzIsMHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM0OUEwMTA7IiBkPSJNMTQ1LjAwNyw0OTguNzA0YzE0Ny40NTYtNTguODQ5LDI1NC43NDgtMTk2LjcxLDI2OS41NTYtMzYxLjI4M0MzODQuNDE4LDU2LjEwNywzMzkuNzcyLDAsMzM5Ljc3MiwwDQoJczQ0LjUzNiwxMDguOTU0LTE0Ni4zMzcsMTgyLjEzOEM4OS43MTksMjIxLjg5MywxMC4wNTksMzIzLjc4OSwxMDUuMTczLDQ4MS4xOTNjNy44NzctNzAuMzU3LDQxLjY1My0yMjUuNDg1LDE4Ni44ODgtMjYwLjg4NA0KCUMyOTIuMDUzLDIyMC4zMSwxNTcuMjc5LDI3MC43MywxNDUuMDA3LDQ5OC43MDR6Ii8+DQo8Y2lyY2xlIHN0eWxlPSJmaWxsOiMzQTdGMEQ7IiBjeD0iOTAuNDU5IiBjeT0iMTcxLjk4NSIgcj0iMTMuNzg1Ii8+DQo8Zz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiM0OUEwMTA7IiBjeD0iMTMzLjc4MiIgY3k9IjE1OC4yIiByPSI5Ljg0NiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzQ5QTAxMDsiIGN4PSIxMjQuOTIxIiBjeT0iNjQuNjYyIiByPSIyNC42MTUiLz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiM0OUEwMTA7IiBjeD0iMjAwLjczNiIgY3k9IjEyMC43ODUiIHI9IjcuODc3Ii8+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojNDlBMDEwOyIgY3g9IjI2Ni43MTMiIGN5PSI3Ni40NzciIHI9IjIyLjY0NiIvPg0KPC9nPg0KPC9zdmc+'
  },
  {
    id: 'svglogo',
    name: 'SVG Logo',
    value: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg'
  },
  {
    id: 'apple',
    name: 'Apple SVG',
    value: 'https://www.svgrepo.com/show/303110/apple-black-logo.svg'
  },
  {
    id: 'alien',
    name: 'Alien SVG',
    value: 'https://www.svgrepo.com/show/254915/alien.svg'
  }
]

export interface QrTemplate {
  id: string
  name: string
}

// QR template definitions
export const qrTemplates: QrTemplate[] = [
  { id: 'plain', name: 'Plain QR Code' },
  { id: 'rounded', name: 'Rounded QR Code' },
  { id: 'dots', name: 'Dots QR Code' },
  { id: 'classy', name: 'Classy QR Code' },
  { id: 'circle-dots', name: 'Circle Dots QR Code' },
  { id: 'circle-classy', name: 'Circle Classy QR Code' },
  { id: 'circle-shape-rounded-corners', name: 'Circle Shape with Rounded Corners' },
  {
    id: 'circle-shape-rounded-dots-rounded-corners',
    name: 'Circle Shape with Rounded Dots and Rounded Corners'
  },
  {
    id: 'circle-shape-classy-dots-classy-corners',
    name: 'Circle Shape with Classy Dots and Classy Corners'
  },
  {
    id: 'extra-rounded-dots-square-corners',
    name: 'Extra Rounded Dots with Square Corners'
  },
  { id: 'rounded-dots', name: 'Rounded Dots' },
  { id: 'classy-rounded-dots', name: 'Classy Rounded Dots' },
  {
    id: 'classy-rounded-dots-outpoint-corners',
    name: 'Classy Rounded Dots with Outpoint Corners'
  }
]

// QR style definitions
export const qrStyleDefinitions = [
  { id: 'plain', name: 'Plain Style' },
  { id: 'rounded', name: 'Rounded Style' },
  { id: 'dots', name: 'Dots Style' },
  { id: 'classy', name: 'Classy Style' },
  { id: 'circle-dots', name: 'Circle Dots Style' },
  { id: 'circle-classy', name: 'Circle Classy Style' },
  { id: 'extra-rounded', name: 'Extra Rounded Style' },
  { id: 'rounded-dots', name: 'Rounded Dots Style' },
  { id: 'classy-rounded-dots', name: 'Classy Rounded Dots Style' }
]

// QR border templates
export const qrBorderTemplates = [
  { id: 'simple-border', name: 'Simple Border' },
  { id: 'rounded-border', name: 'Rounded Border' },
  { id: 'rounded-border-medium', name: 'Rounded Border Medium' },
  { id: 'rounded-border-medium-medium', name: 'Rounded Border Medium Medium' },
  { id: 'rounded-left-right-different-text', name: 'Rounded Left Right Different Text' },
  { id: 'scan-me-border', name: 'Scan Me Border' },
  { id: 'scan-me-border-rounded', name: 'Scan Me Border Rounded' },
  { id: 'scan-me-border-rounded-medium', name: 'Scan Me Border Rounded Medium' },
  { id: 'scan-me-border-rounded-large', name: 'Scan Me Border Rounded Large' },
  {
    id: 'scan-me-border-rounded-extra-large',
    name: 'Scan Me Border Rounded Extra Large'
  },
  {
    id: 'scan-me-border-rounded-extra-large-medium',
    name: 'Scan Me Border Rounded Extra Large Medium'
  },
  {
    id: 'scan-me-border-rounded-extra-large-large',
    name: 'Scan Me Border Rounded Extra Large Large'
  },
  {
    id: 'scan-me-border-rounded-extra-large-extra-large',
    name: 'Scan Me Border Rounded Extra Large Extra Large'
  },
  {
    id: 'scan-me-border-rounded-extra-large-extra-large-medium',
    name: 'Scan Me Border Rounded Extra Large Extra Large Medium'
  },
  {
    id: 'scan-me-border-rounded-extra-large-extra-large-large',
    name: 'Scan Me Border Rounded Extra Large Extra Large Large'
  }
]

// QR text templates
export const qrTextTemplates = [
  { id: 'simple-text', name: 'Simple Text' },
  { id: 'scan-me-text', name: 'Scan Me Text' },
  { id: 'scan-for-more-text', name: 'Scan For More Text' },
  { id: 'scan-to-visit-text', name: 'Scan To Visit Text' },
  { id: 'scan-to-learn-more-text', name: 'Scan To Learn More Text' },
  { id: 'scan-to-shop-text', name: 'Scan To Shop Text' },
  { id: 'scan-to-download-text', name: 'Scan To Download Text' },
  { id: 'scan-to-contact-text', name: 'Scan To Contact Text' }
]

// Define QR template IDs categorized by roundedness levels
export const squareQrStyleIds = [
  'plain',
  'dots',
  'classy',
  'extra-rounded-dots-square-corners'
]
export const moderatelyRoundedQrStyleIds = [
  'rounded',
  'rounded-dots',
  'classy-rounded-dots'
]
export const highlyRoundedQrStyleIds = [
  'classy-rounded-dots-outpoint-corners',
  'circle-shape-rounded-corners'
]
export const circularQrStyleIds = [
  'circle-shape-classy-dots-classy-corners',
  'circle-shape-rounded-dots-rounded-corners',
  'circle-classy',
  'circle-dots'
]
export const lessMarginTemplateIds = [
  'rounded-border-medium-medium',
  'rounded-left-right-different-text'
]
