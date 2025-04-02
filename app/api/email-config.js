import nodemailer from 'nodemailer';

// Создаем транспорт для отправки email
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (data) => {
  const mailOptions = {
    from: `"Заявка знакомства" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'Новая заявка',
    html: `
      <h2 style="color: #7526C2;">Новая заявка</h2>
      
      <h3 style="color: #333;">Ответы на вопросы:</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li style="margin-bottom: 10px;"><strong>Сколько вам лет?:</strong> ${data.q1 || 'Не указано'}</li>
        <li style="margin-bottom: 10px;"><strong>В каком городе вы проживаете?:</strong> ${data.q2 || 'Не указано'}</li>
        <li style="margin-bottom: 10px;"><strong>В настоящее время вы в отношениях?:</strong> ${data.q3 || 'Не указано'}</li>
      </ul>

      <h3 style="color: #333;">Контактные данные:</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li style="margin-bottom: 10px;"><strong>Имя:</strong> ${data.name || 'Не указано'}</li>
        <li style="margin-bottom: 10px;"><strong>Телефон:</strong> ${data.phone || 'Не указано'}</li>
      </ul>
      
      <p style="color: #666; font-style: italic;">Заявка отправлена с сайта по поиску знакомств.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}; 