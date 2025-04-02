import { sendEmail } from '../email-config';

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Отправляем email
    const emailSent = await sendEmail(data);
    
    if (!emailSent) {
      throw new Error('Failed to send email');
    }
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error processing form submission:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
} 