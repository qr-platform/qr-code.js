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

// Mock data for templates
export const templates: QrTemplate[] = [
  { id: 'tpl1', name: 'Standard Template' },
  { id: 'tpl2', name: 'Fancy Template' },
  { id: 'tpl3', name: 'Minimalist Template' }
]

// Mock data for styles
export const styles: QrTemplate[] = [
  { id: 'style1', name: 'Classic Dark' },
  { id: 'style2', name: 'Modern Light' },
  { id: 'style3', name: 'Gradient Blue' }
]

// Mock data for text templates
export const textTemplates: QrTemplate[] = [
  { id: 'txt1', name: 'No Text' },
  { id: 'txt2', name: 'Centered Label' },
  { id: 'txt3', name: 'Bottom Banner' }
]

// Mock data for border styles
export const borderStyles: QrTemplate[] = [
  { id: 'border1', name: 'No Border' },
  { id: 'border2', name: 'Thin Solid' },
  { id: 'border3', name: 'Dashed Rounded' }
]
