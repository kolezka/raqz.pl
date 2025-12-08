import nodemailer from 'nodemailer'
import type { ContactFormData } from '@/types/contact'

/**
 * Sanitizes header values to prevent email header injection attacks
 * Removes newlines and carriage returns from user input
 */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]/g, '')
}

/**
 * Creates a nodemailer transport instance for Proton Mail SMTP
 * The transport is created once and reused for better performance
 */
function createTransport() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !port || !user || !pass) {
    throw new Error(
      'SMTP configuration is incomplete. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD environment variables.'
    )
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: port === '465', // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  })
}

/**
 * Generates a plain text email from contact form data
 */
function generateTextEmail(data: ContactFormData, timestamp: string): string {
  const { name, email, phone, message } = data

  return `
New contact form submission from raqz.pl

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
Sent via raqz.pl contact form
Timestamp: ${timestamp}
  `.trim()
}

/**
 * Generates an HTML email from contact form data
 */
function generateHtmlEmail(data: ContactFormData, timestamp: string): string {
  const { name, email, phone, message } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    .field:last-of-type {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .value {
      color: #111827;
      font-size: 16px;
    }
    .value a {
      color: #7c3aed;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .message-box {
      background: #f9fafb;
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid #7c3aed;
      color: #111827;
      font-size: 16px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${sanitizeHeader(name)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${sanitizeHeader(email)}">${sanitizeHeader(email)}</a></div>
      </div>
      ${
        phone
          ? `
      <div class="field">
        <div class="label">Phone</div>
        <div class="value"><a href="tel:${sanitizeHeader(phone)}">${sanitizeHeader(phone)}</a></div>
      </div>
      `
          : ''
      }
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </div>
    <div class="footer">
      <p>Sent via <strong>raqz.pl</strong> contact form</p>
      <p>${timestamp}</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Sends a contact form email via Proton Mail SMTP
 * @param data - Contact form data
 * @throws Error if email sending fails
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const fromEmail = process.env.SMTP_FROM_EMAIL
  const fromName = process.env.SMTP_FROM_NAME
  const toEmail = process.env.SMTP_TO_EMAIL

  if (!fromEmail || !fromName || !toEmail) {
    throw new Error(
      'Email configuration is incomplete. Please set SMTP_FROM_EMAIL, SMTP_FROM_NAME, and SMTP_TO_EMAIL environment variables.'
    )
  }

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Warsaw',
    dateStyle: 'full',
    timeStyle: 'long',
  })

  const transporter = createTransport()

  const mailOptions = {
    from: `"${sanitizeHeader(fromName)}" <${fromEmail}>`,
    to: toEmail,
    replyTo: sanitizeHeader(data.email),
    subject: `New Contact Form Submission from ${sanitizeHeader(data.name)}`,
    text: generateTextEmail(data, timestamp),
    html: generateHtmlEmail(data, timestamp),
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send email:', error)
    throw new Error('Failed to send email. Please try again later.')
  }
}
