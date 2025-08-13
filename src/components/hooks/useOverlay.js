import { useState } from 'react'

export function useOverlay() {
  const [isOpen, setIsOpen] = useState(false)

  function showOverlay() { setIsOpen(true) }
  function hideOverlay() { setIsOpen(false) }

  return {
    isOpen,
    showOverlay,
    hideOverlay
  }
}
