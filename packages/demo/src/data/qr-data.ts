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
  { id: 'base', name: 'Default' },
  { id: 'plain', name: 'Square Plain' },
  { id: 'plain-circle', name: 'Square Plain (Circle)' },
  { id: 'base-line-rounded', name: 'Lines Rounded' },
  { id: 'rounded', name: 'Rounded' },
  { id: 'dots', name: 'Dots' },
  { id: 'classy', name: 'Classy' },
  { id: 'extra-rounded-dots-square-corners', name: 'Extra Rounded Dots Square Corners' },
  { id: 'vertical-line-dots-classy-corners', name: 'Vertical Lines Classy Corners' },
  {
    id: 'horizontal-line-dots-rounded-corners',
    name: 'Horizontal Lines Rounded Corners'
  },
  {
    id: 'classy-rounded-dots-outpoint-corners',
    name: 'Classy Rounded Dots Outpoint Corners'
  },
  { id: 'small-square-dots-inpoint-corners', name: 'Small Square Dots Inpoint Corners' },
  {
    id: 'tiny-square-dots-square-corners-heart-corners',
    name: 'Tiny Square Dots Heart Corners'
  },
  { id: 'star-dots-classy-corners', name: 'Star Dots Classy Corners' },
  { id: 'plus-dots-rounded-corners', name: 'Plus Dots Rounded Corners' },
  { id: 'diamond-dots-square-corners', name: 'Diamond Dots Square Corners' },
  { id: 'random-dot-dots-dot-corners', name: 'Random Dots' },
  { id: 'dot-dots-outpoint-corners', name: 'Dots Outpoint Corners' },
  { id: 'dot-dots-inpoint-corners', name: 'Dots Inpoint Corners' },
  { id: 'rounded-dots-outpoint-corners', name: 'Rounded Dots Outpoint Corners' },
  { id: 'rounded-dots-inpoint-corners', name: 'Rounded Dots Inpoint Corners' },
  { id: 'classy-dots-outpoint-corners', name: 'Classy Dots Outpoint Corners' },
  { id: 'classy-dots-inpoint-corners', name: 'Classy Dots Inpoint Corners' },
  { id: 'square-dots-outpoint-corners', name: 'Square Dots Outpoint Corners' },
  { id: 'square-dots-inpoint-corners', name: 'Square Dots Inpoint Corners' },
  { id: 'dot-dots-square-corners', name: 'Dots Square Corners' },
  { id: 'dot-dots-rounded-corners', name: 'Dots Rounded Corners' },
  { id: 'dot-dots-classy-corners', name: 'Dots Classy Corners' },
  { id: 'rounded-dots-square-corners', name: 'Rounded Dots Square Corners' },
  { id: 'rounded-dots-classy-corners', name: 'Rounded Dots Classy Corners' },
  { id: 'classy-dots-square-corners', name: 'Classy Dots Square Corners' },
  { id: 'classy-dots-rounded-corners', name: 'Classy Dots Rounded Corners' },
  { id: 'square-dots-dot-corners', name: 'Square Dots Dot Corners' },
  { id: 'square-dots-rounded-corners', name: 'Square Dots Rounded Corners' },
  { id: 'square-dots-classy-corners', name: 'Square Dots Classy Corners' },
  { id: 'extra-rounded-dots-dot-corners', name: 'Extra Rounded Dots Dot Corners' },
  { id: 'extra-rounded-dots-classy-corners', name: 'Extra Rounded Dots Classy Corners' },
  { id: 'classy-rounded-dots-dot-corners', name: 'Classy Rounded Dots Dot Corners' },
  {
    id: 'classy-rounded-dots-square-corners',
    name: 'Classy Rounded Dots Square Corners'
  },
  { id: 'vertical-line-dots-square-corners', name: 'Vertical Lines Square Corners' },
  { id: 'horizontal-line-dots-square-corners', name: 'Horizontal Lines Square Corners' },
  { id: 'horizontal-line-dots-classy-corners', name: 'Horizontal Lines Classy Corners' },
  { id: 'small-square-dots-dot-corners', name: 'Small Square Dots Dot Corners' },
  { id: 'small-square-dots-rounded-corners', name: 'Small Square Dots Rounded Corners' },
  { id: 'tiny-square-dots-dot-corners', name: 'Tiny Square Dots Dot Corners' },
  { id: 'tiny-square-dots-square-corners', name: 'Tiny Square Dots Square Corners' },
  { id: 'star-dots-dot-corners', name: 'Star Dots Dot Corners' },
  { id: 'star-dots-square-corners', name: 'Star Dots Square Corners' },
  { id: 'plus-dots-dot-corners', name: 'Plus Dots Dot Corners' },
  { id: 'plus-dots-square-corners', name: 'Plus Dots Square Corners' },
  { id: 'diamond-dots-dot-corners', name: 'Diamond Dots Dot Corners' },
  { id: 'diamond-dots-classy-corners', name: 'Diamond Dots Classy Corners' },
  { id: 'random-dot-dots-square-corners', name: 'Random Dots Square Corners' },
  { id: 'random-dot-dots-classy-corners', name: 'Random Dots Classy Corners' },
  { id: 'dot-dots-square-corners-dot-corners', name: 'Dots Square/Dot Corners' },
  { id: 'dot-dots-dot-corners-square-corners', name: 'Dots Dot/Square Corners' },
  {
    id: 'rounded-dots-square-corners-dot-corners',
    name: 'Rounded Dots Square/Dot Corners'
  },
  {
    id: 'rounded-dots-dot-corners-square-corners',
    name: 'Rounded Dots Dot/Square Corners'
  },
  {
    id: 'classy-dots-square-corners-dot-corners',
    name: 'Classy Dots Square/Dot Corners'
  },
  {
    id: 'classy-dots-dot-corners-square-corners',
    name: 'Classy Dots Dot/Square Corners'
  },
  {
    id: 'square-dots-rounded-corners-dot-corners',
    name: 'Square Dots Rounded/Dot Corners'
  },
  {
    id: 'square-dots-dot-corners-rounded-corners',
    name: 'Square Dots Dot/Rounded Corners'
  },
  { id: 'dot-dots-classy-corners-dot-corners', name: 'Dots Classy/Dot Corners' },
  { id: 'dot-dots-dot-corners-classy-corners', name: 'Dots Dot/Classy Corners' },
  { id: 'circle-shape-dot-dots-square-corners', name: 'Circle Dots Square Corners' },
  { id: 'circle-shape-rounded-dots-rounded-corners', name: 'Circle Rounded' },
  { id: 'circle-shape-square-dots-square-corners', name: 'Circle Square Plain' },
  { id: 'circle-shape-vertical-line-dots-rounded-corners', name: 'Circle Lines Rounded' },
  { id: 'circle-shape-rounded-dots-dot-corners', name: 'Circle Rounded Dots' },
  { id: 'circle-shape-dot-dots-dot-corners', name: 'Circle Dots' },
  { id: 'circle-shape-classy-dots-classy-corners', name: 'Circle Classy' },
  {
    id: 'circle-shape-extra-rounded-dots-square-corners',
    name: 'Circle Extra Rounded Dots Square Corners'
  },
  {
    id: 'circle-shape-vertical-line-dots-classy-corners',
    name: 'Circle Vertical Lines Classy Corners'
  },
  {
    id: 'circle-shape-horizontal-line-dots-rounded-corners',
    name: 'Circle Horizontal Lines Rounded Corners'
  },
  {
    id: 'circle-shape-classy-rounded-dots-outpoint-corners',
    name: 'Circle Classy Rounded Dots Outpoint Corners'
  },
  {
    id: 'circle-shape-small-square-dots-inpoint-corners',
    name: 'Circle Small Square Dots Inpoint Corners'
  },
  {
    id: 'circle-shape-tiny-square-dots-square-corners-heart-corners',
    name: 'Circle Tiny Square Dots Heart Corners'
  },
  {
    id: 'circle-shape-star-dots-classy-corners',
    name: 'Circle Star Dots Classy Corners'
  },
  {
    id: 'circle-shape-plus-dots-rounded-corners',
    name: 'Circle Plus Dots Rounded Corners'
  },
  {
    id: 'circle-shape-diamond-dots-square-corners',
    name: 'Circle Diamond Dots Square Corners'
  },
  { id: 'circle-shape-random-dot-dots-dot-corners', name: 'Circle Random Dots' },
  { id: 'circle-shape-dot-dots-outpoint-corners', name: 'Circle Dots Outpoint Corners' },
  { id: 'circle-shape-dot-dots-inpoint-corners', name: 'Circle Dots Inpoint Corners' },
  {
    id: 'circle-shape-rounded-dots-outpoint-corners',
    name: 'Circle Rounded Dots Outpoint Corners'
  },
  {
    id: 'circle-shape-rounded-dots-inpoint-corners',
    name: 'Circle Rounded Dots Inpoint Corners'
  },
  {
    id: 'circle-shape-classy-dots-outpoint-corners',
    name: 'Circle Classy Dots Outpoint Corners'
  },
  {
    id: 'circle-shape-classy-dots-inpoint-corners',
    name: 'Circle Classy Dots Inpoint Corners'
  },
  {
    id: 'circle-shape-square-dots-outpoint-corners',
    name: 'Circle Square Dots Outpoint Corners'
  },
  {
    id: 'circle-shape-square-dots-inpoint-corners',
    name: 'Circle Square Dots Inpoint Corners'
  },
  { id: 'circle-shape-dot-dots-rounded-corners', name: 'Circle Dots Rounded Corners' },
  { id: 'circle-shape-dot-dots-classy-corners', name: 'Circle Dots Classy Corners' },
  {
    id: 'circle-shape-rounded-dots-square-corners',
    name: 'Circle Rounded Dots Square Corners'
  },
  {
    id: 'circle-shape-rounded-dots-classy-corners',
    name: 'Circle Rounded Dots Classy Corners'
  },
  {
    id: 'circle-shape-classy-dots-square-corners',
    name: 'Circle Classy Dots Square Corners'
  },
  {
    id: 'circle-shape-classy-dots-rounded-corners',
    name: 'Circle Classy Dots Rounded Corners'
  },
  { id: 'circle-shape-square-dots-dot-corners', name: 'Circle Square Dots Dot Corners' },
  {
    id: 'circle-shape-square-dots-rounded-corners',
    name: 'Circle Square Dots Rounded Corners'
  },
  {
    id: 'circle-shape-square-dots-classy-corners',
    name: 'Circle Square Dots Classy Corners'
  },
  {
    id: 'circle-shape-extra-rounded-dots-dot-corners',
    name: 'Circle Extra Rounded Dots Dot Corners'
  },
  {
    id: 'circle-shape-extra-rounded-dots-classy-corners',
    name: 'Circle Extra Rounded Dots Classy Corners'
  },
  {
    id: 'circle-shape-classy-rounded-dots-dot-corners',
    name: 'Circle Classy Rounded Dots Dot Corners'
  },
  {
    id: 'circle-shape-classy-rounded-dots-square-corners',
    name: 'Circle Classy Rounded Dots Square Corners'
  },
  {
    id: 'circle-shape-vertical-line-dots-square-corners',
    name: 'Circle Vertical Lines Square Corners'
  },
  {
    id: 'circle-shape-horizontal-line-dots-square-corners',
    name: 'Circle Horizontal Lines Square Corners'
  },
  {
    id: 'circle-shape-horizontal-line-dots-classy-corners',
    name: 'Circle Horizontal Lines Classy Corners'
  },
  {
    id: 'circle-shape-small-square-dots-dot-corners',
    name: 'Circle Small Square Dots Dot Corners'
  },
  {
    id: 'circle-shape-small-square-dots-rounded-corners',
    name: 'Circle Small Square Dots Rounded Corners'
  },
  {
    id: 'circle-shape-tiny-square-dots-dot-corners',
    name: 'Circle Tiny Square Dots Dot Corners'
  },
  {
    id: 'circle-shape-tiny-square-dots-square-corners',
    name: 'Circle Tiny Square Dots Square Corners'
  },
  { id: 'circle-shape-star-dots-dot-corners', name: 'Circle Star Dots Dot Corners' },
  {
    id: 'circle-shape-star-dots-square-corners',
    name: 'Circle Star Dots Square Corners'
  },
  { id: 'circle-shape-plus-dots-dot-corners', name: 'Circle Plus Dots Dot Corners' },
  {
    id: 'circle-shape-plus-dots-square-corners',
    name: 'Circle Plus Dots Square Corners'
  },
  {
    id: 'circle-shape-diamond-dots-dot-corners',
    name: 'Circle Diamond Dots Dot Corners'
  },
  {
    id: 'circle-shape-diamond-dots-classy-corners',
    name: 'Circle Diamond Dots Classy Corners'
  },
  {
    id: 'circle-shape-random-dot-dots-square-corners',
    name: 'Circle Random Dots Square Corners'
  },
  {
    id: 'circle-shape-random-dot-dots-classy-corners',
    name: 'Circle Random Dots Classy Corners'
  },
  {
    id: 'circle-shape-dot-dots-square-corners-dot-corners',
    name: 'Circle Dots Square/Dot Corners'
  },
  {
    id: 'circle-shape-dot-dots-dot-corners-square-corners',
    name: 'Circle Dots Dot/Square Corners'
  },
  {
    id: 'circle-shape-rounded-dots-square-corners-dot-corners',
    name: 'Circle Rounded Dots Square/Dot Corners'
  },
  {
    id: 'circle-shape-rounded-dots-dot-corners-square-corners',
    name: 'Circle Rounded Dots Dot/Square Corners'
  },
  {
    id: 'circle-shape-classy-dots-square-corners-dot-corners',
    name: 'Circle Classy Dots Square/Dot Corners'
  },
  {
    id: 'circle-shape-classy-dots-dot-corners-square-corners',
    name: 'Circle Classy Dots Dot/Square Corners'
  },
  {
    id: 'circle-shape-square-dots-rounded-corners-dot-corners',
    name: 'Circle Square Dots Rounded/Dot Corners'
  },
  {
    id: 'circle-shape-square-dots-dot-corners-rounded-corners',
    name: 'Circle Square Dots Dot/Rounded Corners'
  },
  {
    id: 'circle-shape-dot-dots-classy-corners-dot-corners',
    name: 'Circle Dots Classy/Dot Corners'
  },
  {
    id: 'circle-shape-dot-dots-dot-corners-classy-corners',
    name: 'Circle Dots Dot/Classy Corners'
  }
]

// QR style definitions
export const qrStyleDefinitions: QrTemplate[] = [
  { id: 'dot', name: 'Dot Style' },
  { id: 'square', name: 'Square Style' },
  { id: 'rounded', name: 'Rounded Style' },
  { id: 'extra-rounded', name: 'Extra Rounded Style' },
  { id: 'classy', name: 'Classy Style' },
  { id: 'classy-rounded', name: 'Classy Rounded Style' },
  { id: 'vertical-line', name: 'Vertical Line Style' },
  { id: 'horizontal-line', name: 'Horizontal Line Style' },
  { id: 'random-dot', name: 'Random Dot Style' },
  { id: 'small-square', name: 'Small Square Style' },
  { id: 'tiny-square', name: 'Tiny Square Style' },
  { id: 'star', name: 'Star Style' },
  { id: 'plus', name: 'Plus Style' },
  { id: 'diamond', name: 'Diamond Style' }
]

// QR border templates
export const qrBorderTemplates: QrTemplate[] = [
  { id: 'square-border-thin', name: 'Square Border (Thin)' },
  { id: 'square-border-medium', name: 'Square Border (Medium)' },
  { id: 'square-border-thick', name: 'Square Border (Thick)' },
  { id: 'rounded-border-thin-slight', name: 'Rounded Border (Thin, Slight)' },
  { id: 'rounded-border-medium-medium', name: 'Rounded Border (Medium)' },
  { id: 'rounded-border-thick-high', name: 'Rounded Border (Thick, High)' },
  { id: 'rounded-border-thick-text', name: 'Rounded Border (Thick, Text)' },
  { id: 'rounded-border-top-bottom-text', name: 'Rounded Border (Top & Bottom Text)' },
  { id: 'rounded-border-left-right-text', name: 'Rounded Border (Left & Right Text)' },
  {
    id: 'rounded-border-outside-top-bottom-text',
    name: 'Rounded Border Outside (Top & Bottom Text)'
  },
  {
    id: 'rounded-border-outside-left-right-text',
    name: 'Rounded Border Outside (Left & Right Text)'
  },
  { id: 'double-square-border-thin', name: 'Double Square Border Inside (Thin)' },
  { id: 'double-square-border-medium', name: 'Double Square Border Outside (Medium)' },
  { id: 'double-rounded-border-medium', name: 'Double Rounded Border (Medium)' },
  { id: 'double-rounded-border-thick', name: 'Double Rounded Border Outside (Thick)' },
  { id: 'inner-square-border-medium', name: 'Inner Square Border Inside (Medium)' },
  { id: 'outer-rounded-border-medium', name: 'Outer Rounded Border (Medium)' },
  { id: 'rounded-inner-offset-text', name: 'Rounded Inner Offset Text' },
  { id: 'square-thick-outer-thin-inner', name: 'Square Thick Outer/Thin Inner' },
  { id: 'square-thick-outer-round', name: 'Square Thick Outer Round' },
  { id: 'pill-curved-text-top-bottom', name: 'Pill Curved Text Top/Bottom' },
  { id: 'double-varied-thickness-top-text', name: 'Double Varied Thickness Top Text' },
  { id: 'outer-border-white-rounded-text', name: 'Outer Border White Rounded Text' },
  { id: 'inner-border-white-rounded-text', name: 'Inner Border White Rounded Text' },
  { id: 'inner-offset-square-text', name: 'Inner Offset Square Text' },
  { id: 'thin-rounded-all-sides-text', name: 'Thin Rounded All Sides Text' },
  { id: 'thick-square-double-text', name: 'Thick Square Double Text' },
  {
    id: 'high-radius-thin-double-curved-text',
    name: 'High Radius Thin Double Curved Text'
  },
  {
    id: 'square-thick-outer-thin-inner-bottom-text',
    name: 'Square Thick Outer/Thin Inner Bottom Text'
  },
  { id: 'minimalist-thin-square', name: 'Minimalist Thin Square' },
  { id: 'minimalist-thin-rounded', name: 'Minimalist Thin Rounded' },
  { id: 'chunky-square-border-text', name: 'Chunky Square Border Text' },
  { id: 'chunky-rounded-border', name: 'Chunky Rounded Border' },
  {
    id: 'double-thick-main-thin-subs-rounded',
    name: 'Double Thick Main Thin Subs Rounded'
  },
  {
    id: 'double-thick-main-thick-subs-square',
    name: 'Double Thick Main Thick Subs Square'
  },
  { id: 'inner-thick-rounded', name: 'Inner Thick Rounded' },
  { id: 'outer-thick-square', name: 'Outer Thick Square' },
  { id: 'pill-double-thin-text', name: 'Pill Double Thin Text' },
  { id: 'double-thin-circle-inner-rounded', name: 'Double Thin Circle Inner Rounded' },
  { id: 'square-top-bottom-text', name: 'Square Top/Bottom Text' },
  { id: 'rounded-left-right-text', name: 'Rounded Left/Right Text' },
  { id: 'square-left-text-only', name: 'Square Left Text Only' },
  { id: 'square-right-text-only', name: 'Square Right Text Only' },
  { id: 'rounded-left-right-different-text', name: 'Rounded Left+Right Different Text' },
  { id: 'square-left-right-identical-text', name: 'Square Left+Right Identical Text' },
  { id: 'pill-left-right-bottom-text', name: 'Pill Left Right Bottom Text' },
  { id: 'pill-left-right-top-text', name: 'Pill Left Right Top Text' }
]

// QR text templates
export const qrTextTemplates: QrTemplate[] = [
  { id: 'scan-me', name: 'Scan Me, Get Started' },
  { id: 'scan-to-visit-website', name: 'Scan to Visit Website' },
  { id: 'visit-website', name: 'Visit Website' },
  { id: 'follow-me', name: 'Follow Me' },
  { id: 'follow-us', name: 'Follow Us' },
  { id: 'scan-to-follow', name: 'Scan to Follow' },
  { id: 'contact-info', name: 'Contact Info' },
  { id: 'scan-to-pay', name: 'Scan To Pay' },
  { id: 'product-details-bottom', name: 'Product Details' },
  { id: 'event-info-top-bottom', name: 'Event Info' },
  { id: 'lost-found', name: 'Lost & Found' },
  { id: 'scan-to-return', name: 'Scan to Return' },
  { id: 'scan-for-wifi', name: 'Scan for WiFi' },
  { id: 'scan-to-connect-wifi', name: 'Scan to Connect WiFi' },
  { id: 'get-directions-bottom', name: 'Get Directions' },
  { id: 'special-offer-top', name: 'Special Offer' },
  { id: 'limited-time-offer', name: 'Limited Time Offer' },
  { id: 'scan-to-download', name: 'Scan to Download' },
  { id: 'register-now-top', name: 'Register Now' },
  { id: 'scan-to-learn-more', name: 'Scan to Learn' },
  { id: 'your-text-here', name: 'Your Text Here' },
  { id: 'visit-website-url', name: 'Website URL' },
  { id: 'call-to-action', name: 'Call To Action' },
  { id: 'scan-to-check-in', name: 'Scan to Check In' },
  { id: 'scan-to-check-in-check-out', name: 'Scan to Check In/Out' },
  { id: 'scan-for-menu', name: 'Scan for Menu' },
  { id: 'give-feedback', name: 'Give Feedback' },
  { id: 'scan-for-discount', name: 'Scan for Discount' },
  { id: 'scan-to-apply', name: 'Scan to Apply' },
  { id: 'emergency-contact', name: 'Emergency Contact' },
  { id: 'artwork-info', name: 'Artwork Info' },
  { id: 'scan-to-save-contact', name: 'Scan to Contact' },
  { id: 'scan-to-call-bottom', name: 'Scan to Call' },
  { id: 'scan-to-watch-video', name: 'Scan to Watch' },
  { id: 'welcome-scan-to-proceed', name: 'Welcome, Scan to Proceed' }
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
