import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Destinations from './components/Destinations'
import DestinationModal from './components/DestinationModal'
import BookingModal from './components/BookingModal'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [bookingDestination, setBookingDestination] = useState(null)

  const handleBook = (destination) => {
    setSelectedDestination(null)
    setBookingDestination(destination)
  }

  return (
    <div className="min-h-screen bg-space-dark">
      <Header />
      <main>
        <Hero />
        <About />
        <Destinations onSelect={setSelectedDestination} />
      </main>
      <Footer />
      <Chatbot />

      <AnimatePresence>
        {selectedDestination && (
          <DestinationModal
            key="dest-modal"
            destination={selectedDestination}
            onClose={() => setSelectedDestination(null)}
            onBook={handleBook}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingDestination && (
          <BookingModal
            key="booking-modal"
            destination={bookingDestination}
            onClose={() => setBookingDestination(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
