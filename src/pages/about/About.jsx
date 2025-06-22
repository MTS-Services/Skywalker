import React from 'react'
import { useLanguage } from "../../context/LanguageContext"
export default function About() {
  const { isRTL, toggleLanguage, t, language } = useLanguage()
  return (
    <div>About</div>
  )
}
