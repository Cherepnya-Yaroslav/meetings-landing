"use client"

import { useState } from "react"
import Survey from "../components/survey"
import ContactForm from "../components/contact-form"
import ThankYou from "../components/thank-you"
import "./globals.css"

export default function Home() {
  const [step, setStep] = useState("landing")
  const [surveyData, setSurveyData] = useState({})

  const startSurvey = () => {
    setStep("survey")
  }

  const completeSurvey = (data) => {
    setSurveyData(data)
    setStep("contact")
  }

  const submitForm = async (contactData, setIsSubmitting) => {
    try {
      // Combine survey and contact data
      const formData = {
        ...surveyData,
        ...contactData,
      }

      // Send data to backend
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStep("thanks")
      } else {
        alert("Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.")
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      {step === "landing" && (
        <div className="landing-container">
          <div className="landing-image">
            <img
              src="/wifev2.jpg"
              alt=""
            />
          </div>
          
          <div className="landing-content">
            <h1>5 шагов </h1>
            <h2>К СЧАСТЛИВЫМ ОТНОШЕНИЯМ</h2>
            
            
            <div className="bullet-points">
              <div className="bullet-point">
                <span>●</span>
                <p>Заполни анкету</p>
              </div>
              <div className="bullet-point">
                <span>●</span>
                <p>Ответь на вопросы оператора</p>
              </div>
              <div className="bullet-point">
                <span>●</span>
                <p>Приходи на встречу со специалистом</p>
              </div>
              <div className="bullet-point">
                <span>●</span>
                <p>Ходи на свидания, знакомься и создай лучшие отношения для тебя</p>
              </div>
              <div className="bullet-point">
                <span>●</span>
                <p>Стань невестой 👰</p>
              </div>
            </div>

            
            <button 
              className="cta-button"
              onClick={startSurvey}
            >
              Пройти тест. ЖМИ
            </button>
          </div>
          
          {/* <footer className="landing-footer">
            <div className="footer-content">
              <p>©2025 Все права защищены.</p>
            </div>
          </footer> */}
        </div>
      )}

      {step === "survey" && <Survey onComplete={completeSurvey} />}

      {step === "contact" && <ContactForm onSubmit={submitForm} />}

      {step === "thanks" && <ThankYou />}
    </main>
  )
} 