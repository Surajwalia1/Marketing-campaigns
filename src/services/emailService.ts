// src/services/emailService.ts
import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    // Configure your email transport (e.g., using Gmail, SMTP, etc.)
    service: 'Gmail',
    auth: {
      user: 'walia.75way@gmail.com',
      pass: 'cwganvczwigkepfh',
    },
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
