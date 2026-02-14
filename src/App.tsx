import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [answered, setAnswered] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number }>>([])
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate floating hearts
    const heartElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
    }))
    setHearts(heartElements)
  }, [])

  const handleYes = () => {
    setAnswered(true)
    // Create a burst of hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: 0,
    }))
    setHearts((prev) => [...prev, ...newHearts])
  }

  const handleNoHover = () => {
    // Make Yes button bigger each time
    setYesButtonScale((prev) => prev + 0.2)
    
    // Move No button to random position
    const randomX = (Math.random() - 0.5) * 200
    const randomY = (Math.random() - 0.5) * 200
    setNoButtonPosition({ x: randomX, y: randomY })
  }

  return (
    <div className="app">
      {/* Floating Hearts Background */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="content">
        {!answered ? (
          <div className="valentine-question">
            <div className="main-heart">❤️</div>
            <h1>Will you be my honorary Valentine?</h1>
            <p className="subtitle">Just for today... or maybe forever? 💕</p>
            <div className="buttons-container">
              <button 
                className="love-button yes-button" 
                onClick={handleYes}
                style={{ transform: `scale(${yesButtonScale})` }}
              >
                Yes! 💖
              </button>
              <button 
                className="no-button" 
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                }}
              >
                No 😢
              </button>
            </div>
          </div>
        ) : (
          <div className="valentine-answer">
            <div className="main-heart celebrating">🎉</div>
            <h1>Yay! You said Yes!</h1>
            <p className="subtitle">Happy Valentine's Day! 💕✨</p>
            <p className="message-text">
              Thank you for being my honorary Valentine! You've made this day extra special! 🌹
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
