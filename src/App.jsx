import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Header from './components/custom/Header'
import Hero from './components/custom/Hero'
import Footer from './components/custom/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* hERO */}
      <Hero/>
      <Footer/>
    </>
  )
}

export default App
