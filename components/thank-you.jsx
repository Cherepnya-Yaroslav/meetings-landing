export default function ThankYou() {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="thank-you-title">Спасибо за заявку!</h2>
        <p className="thank-you-text">Мы получили ваши ответы.</p>
        <p className="thank-you-text">Мы свяжемся с вами в ближайшее время 🌹</p>
        <a 
          href="/" 
          className="back-button"
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  )
} 