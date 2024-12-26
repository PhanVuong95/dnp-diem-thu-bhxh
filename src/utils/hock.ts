import React from 'react'
import { useLocation } from 'react-router'

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  React.useEffect(() => {
    const el = document.getElementById('container-main')

    el?.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop