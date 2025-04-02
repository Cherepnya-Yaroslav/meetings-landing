"use client"

import { useState } from "react"

export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
    phone: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Визуальный индикатор загрузки для кнопки
  const LoadingSpinner = () => (
    <span className="spinner"></span>
  )

  // Форматирует телефонный номер в формат +7 (XXX) XXX-XX-XX
  const formatPhoneNumber = (phoneNumber) => {
    // Удаляем все нецифровые символы
    const cleaned = phoneNumber.replace(/\D/g, '')
    
    // Ограничиваем длину до 11 цифр
    const limited = cleaned.slice(0, 11)

    // Для России начинаем с 7, если первая цифра не 7
    let formatted = limited
    if (limited.length > 0 && limited[0] !== '7') {
      formatted = '7' + limited.slice(limited[0] === '8' ? 1 : 0)
    }
    
    // Форматируем номер
    if (formatted.length > 0) {
      formatted = '+' + formatted
    }
    if (formatted.length > 2) {
      formatted = formatted.slice(0, 2) + ' (' + formatted.slice(2)
    }
    if (formatted.length > 7) {
      formatted = formatted.slice(0, 7) + ') ' + formatted.slice(7)
    }
    if (formatted.length > 12) {
      formatted = formatted.slice(0, 12) + '-' + formatted.slice(12)
    }
    if (formatted.length > 15) {
      formatted = formatted.slice(0, 15) + '-' + formatted.slice(15)
    }
    
    return formatted
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Применяем форматирование для телефонного номера
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value)
      setFormData({
        ...formData,
        [name]: formattedPhone,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя"
    }

    // Проверка телефонного номера
    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, '')
      if (phoneDigits.length < 11) {
        newErrors.phone = "Введите полный номер телефона"
      }
    } else if (!formData.email.trim() && !formData.telegram.trim()) {
      newErrors.phone = "Укажите способ связи"
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Пожалуйста, введите корректный email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true)
      onSubmit(formData, setIsSubmitting)
    }
  }

  return (
    <div className="contact-form-container">
      <div className="contact-form-card">
        <h2 className="contact-title">Оставьте контакты</h2>
        <p className="contact-subtitle">Мы свяжемся с вами для обсуждения деталей</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Как вас зовут?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "form-input error" : "form-input"}
              placeholder="Ваше имя"
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "form-input error" : "form-input"}
              placeholder="+7 (___) ___-__-__"
              disabled={isSubmitting}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {/* <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "form-input error" : "form-input"}
              placeholder="example@mail.ru"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="telegram">Telegram</label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className={errors.telegram ? "form-input error" : "form-input"}
              placeholder="@username"
              disabled={isSubmitting}
            />
            {errors.telegram && <span className="error-message">{errors.telegram}</span>}
          </div> */}

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner /> Отправка...
              </>
            ) : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  )
} 