/** @type {import('tailwindcss').Config} */
import starlightPlugin from '@astrojs/starlight-tailwind';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Based on index-sonnet-4.html accents
        'accent-blue': '#667eea',
        'accent-purple': '#764ba2',
        // Background color for body (can also be set in CSS)
        'custom-bg-light': '#f0f9ff',
      },
      // If we want to try recreating the mesh gradient with Tailwind
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(253,80%,90%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(280,80%,90%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200,80%,90%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,80%,90%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(20,80%,90%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(240,80%,90%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(300,80%,90%,1) 0px, transparent 50%)',
      }
    },
  },
  plugins: [starlightPlugin()],
};
