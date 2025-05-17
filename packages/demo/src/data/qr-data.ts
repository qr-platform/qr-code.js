// Mock data to simulate the original imports

// Image options with IDs
export const imageOptions = [
  { id: 'none', name: 'No Image', value: null },
  {
    id: 'html5',
    name: 'HTML 5 PNG URL',
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
    name: 'SVG Logo URL',
    value: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg'
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin SVG Data URL',
    value:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='800' height='800' viewBox='0 0 291.764 291.764'%3E%3Cpath d='M145.882 0c80.573 0 145.882 65.319 145.882 145.882s-65.31 145.882-145.882 145.882S0 226.446 0 145.882 65.31 0 145.882 0z' style='fill:%23f4b459'/%3E%3Cpath d='M145.882 27.399c-65.465 0-118.529 53.065-118.529 118.529s53.065 118.529 118.529 118.529 118.529-53.065 118.529-118.529S211.347 27.399 145.882 27.399zm0 218.832c-55.39 0-100.294-44.914-100.294-100.294 0-55.39 44.904-100.294 100.294-100.294s100.294 44.904 100.294 100.294c0 55.381-44.904 100.294-100.294 100.294zm28.748-105.044c6.738-3.483 10.969-9.601 9.984-19.804-1.331-13.941-14.369-18.618-29.395-19.949l-.009-19.329h-9.355v18.828l-9.3.128V82.104h-9.063v19.329c-2.516.055-8.698.109-11.124.109v-.064l-16.056-.009v12.573s12.008-.164 11.88 0c4.714 0 6.255 2.772 6.683 5.161l.009 22.028 1.231.082h-1.231v30.863c-.201 1.504-1.076 3.902-4.367 3.911.146.137-11.889 0-11.889 0l-2.316 14.05h15.144l12.017.073.009 19.566h8.78l-.009-19.357c3.209.073 6.282.109 9.309.1v19.256h10.212v-19.53c19.566-1.131 33.836-6.118 35.541-24.709 1.386-14.976-5.579-21.65-16.685-24.349zm-38.932-26.296c6.574 0 27.216-2.115 27.216 11.762 0 13.294-20.642 11.753-27.216 11.753v-23.515zm0 61.271V150.25c7.896 0 32.632-2.289 32.632 12.956 0 14.625-24.736 12.956-32.632 12.956z' style='fill:%23d07c40'/%3E%3C/svg%3E"
  },
  {
    id: 'alien',
    name: 'Alien SVG URL',
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
