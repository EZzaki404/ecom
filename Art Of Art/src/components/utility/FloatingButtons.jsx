import React from 'react'
import { FaWhatsapp, FaArrowUp, FaRobot } from 'react-icons/fa'

const FloatingButtons = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/212642071778"
        target="_blank"
        rel="noopener noreferrer"
        className="
          w-10 h-10 bg-green-500 text-white rounded-full shadow-md
          flex items-center justify-center
          transition-transform duration-300 ease-in-out
          hover:scale-110 hover:shadow-lg
          animate-pulse
        "
        aria-label="Contact WhatsApp"
      >
        <FaWhatsapp size={18} />
      </a>

      {/* Chatbot support */}
      <button
        onClick={() => alert('Ouverture du chat support...')} // Remplace par ta logique chatbot
        className="
          w-10 h-10 bg-indigo-600 text-white rounded-full shadow-md
          flex items-center justify-center
          transition-transform duration-300 ease-in-out
          hover:scale-110 hover:shadow-lg
          animate-pulse
        "
        aria-label="Chat support"
      >
        <FaRobot size={18} />
      </button>

      {/* Scroll to Top */}
      <button
        onClick={handleScrollToTop}
        className="
          w-10 h-10 bg-gray-800 text-white rounded-full shadow-md
          flex items-center justify-center
          transition-transform duration-300 ease-in-out
          hover:scale-110 hover:shadow-lg
        "
        aria-label="Scroll to top"
      >
        <FaArrowUp size={18} />
      </button>
    </div>
  )
}

export default FloatingButtons
