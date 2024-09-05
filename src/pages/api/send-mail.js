import emailjs from 'emailjs-com';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, reason, message } = req.body;

    const serviceID = 'service_er34084';
    const templateID = 'template_vnzlitf';
    const userID = 'nQjzW8I9y6b1faYhw';

    const templateParams = {
      from_name: name,
      from_email: email,
      reason: reason,
      message: message,
      to_email: process.env.RECEIVER_EMAIL,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email with EmailJS:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
