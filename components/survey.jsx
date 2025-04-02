"use client"

import { useState } from "react"

export default function Survey({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState("")

  const questions = [
    {
      id: "q1",
      question: "Сколько вам лет?",
    },
    {
      id: "q2",
      question: "В каком городе вы проживаете?",
    },
    {
      id: "q3",
      question: "В настоящее время вы в отношениях?",
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (currentAnswer.trim() === "") return

    const questionId = questions[currentQuestion].id
    const updatedAnswers = { ...answers, [questionId]: currentAnswer }
    setAnswers(updatedAnswers)
    setCurrentAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(updatedAnswers)
    }
  }

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value)
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="survey-container">
      <div className="survey-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
        </div>

        <h2 className="question-title">
          Вопрос {currentQuestion + 1} из {questions.length}
        </h2>
        <div className="question-card">
          <h3 className="question-text">{currentQ.question}</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea 
                className="form-input" 
                rows="4" 
                value={currentAnswer}
                onChange={handleAnswerChange}
                placeholder="Введите ваш ответ..."
              />
            </div>
            
            <button type="submit" className="submit-button" disabled={currentAnswer.trim() === ""}>
              {currentQuestion < questions.length - 1 ? "Следующий вопрос" : "Завершить опрос"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 