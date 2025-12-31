import { useEffect, useRef, useState } from 'react'

function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  // lastExecuted stores the timestamp of the last time setThrottledValue was effectively called by the throttle logic
  // or the mount time if the initial value is considered the first "execution".
  const lastExecuted = useRef<number>(Date.now())
  const timeoutRef = useRef<number | null>(null) // Using number for browser setTimeout ID
  const isMounted = useRef<boolean>(false) // To distinguish initial mount effect run

  useEffect(() => {
    // Clear any pending timeout from previous effect runs
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const now = Date.now()

    if (!isMounted.current) {
      // First effect run after mount
      isMounted.current = true
      // `throttledValue` is already `value` from `useState(value)`.
      // `lastExecuted.current` is set to mount time via `useRef(Date.now())`.
      // No action needed here; the initial value is correctly set and timed.
      // This ensures no redundant timeout is scheduled for the initial state.
      return
    }

    // For subsequent changes to `value`
    if (now >= lastExecuted.current + interval) {
      // Enough time has passed, update immediately
      setThrottledValue(value)
      lastExecuted.current = now
    } else {
      // Not enough time, schedule the update
      // Calculate delay ensuring it's not negative and relative to the last execution.
      const delay = Math.max(0, interval - (now - lastExecuted.current))
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value)
        lastExecuted.current = Date.now() // Update to the actual execution time
        timeoutRef.current = null
      }, delay)
    }

    // Cleanup timeout on unmount or before next effect run if component re-renders for other reasons
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
    // value: if it changes, we need to re-evaluate throttling.
    // interval: if it changes, throttling behavior changes.
  }, [value, interval])

  return throttledValue
}

export default useThrottle
