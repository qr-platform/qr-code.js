import React from 'react'
import { Button, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'

export const ThemeSwitcher: React.FC = () => {
  const [isDark, setIsDark] = React.useState(() => {
    // Check if we're in the browser and if the user has a preference
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    // Update the document class
    if (newIsDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Optionally save preference to localStorage
    try {
      localStorage.setItem('theme-preference', newIsDark ? 'dark' : 'light')
    } catch (e) {
      console.error('Failed to save theme preference to localStorage', e)
    }
  }

  // Initialize theme from localStorage on mount
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme-preference')
      if (savedTheme === 'dark' && !isDark) {
        setIsDark(true)
        document.documentElement.classList.add('dark')
      } else if (savedTheme === 'light' && isDark) {
        setIsDark(false)
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      console.error('Failed to read theme preference from localStorage', e)
    }
  }, [])

  return (
    <Tooltip content={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <Button
        isIconOnly
        variant="light"
        onPress={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <Icon icon="lucide:sun" className="text-xl" />
        ) : (
          <Icon icon="lucide:moon" className="text-xl" />
        )}
      </Button>
    </Tooltip>
  )
}
