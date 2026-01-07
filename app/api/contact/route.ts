import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

// Use node runtime so we can use SMTP sockets (not Edge)
export const runtime = 'nodejs'

type Body = {
  firstName?: string
  lastName?: string
  email?: string
  position?: string
  socialMedia?: string
  language?: string
  message?: string
  company?: string // honeypot
}

// Basic email regex
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export async function POST(req: Request) {
  try {
    const body: Body = await req.json()

    const {
      firstName = '',
      lastName = '',
      email = '',
      position = '',
      socialMedia = '',
      language = '',
      message = '',
      company = ''
    } = body || {}

    // Honeypot anti-spam: silently accept if filled
    if (company && company.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 })
    }

    if (message.length > 10000) {
      return NextResponse.json({ success: false, message: 'Message too long' }, { status: 400 })
    }

    const MAIL_USER = process.env.MAIL_USER
    const MAIL_PASS = process.env.MAIL_PASS
    const MAIL_TO = process.env.MAIL_TO || MAIL_USER
    const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com'
    const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465
    const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true

    // Serverless-friendly transport options. If MAIL_USER + MAIL_PASS are provided, use auth, otherwise try unauthenticated (useful for local MailHog)
    const transportOptions: any = {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
    }

    if (MAIL_USER && MAIL_PASS) {
      transportOptions.auth = { user: MAIL_USER, pass: MAIL_PASS }
    }

    // For non-local SMTP, require auth credentials to avoid anonymous relaying issues
    if ((SMTP_HOST !== '127.0.0.1' && SMTP_HOST !== 'localhost') && (!MAIL_USER || !MAIL_PASS)) {
      console.error('Mail credentials missing for non-local SMTP')
      return NextResponse.json({ success: false, message: 'Mailer not configured' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport(transportOptions)

    // Verify connection early to give clearer errors
    try {
      await transporter.verify()
    } catch (err) {
      console.error('SMTP verify failed', err)
      return NextResponse.json({ success: false, message: 'SMTP connection failed' }, { status: 502 })
    }

    const subject = `Nouveau message de contact • ${firstName} ${lastName}`
    const textBody = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPosition: ${position}\nSocial: ${socialMedia}\nLanguage: ${language}\n\nMessage:\n${message}`

    await transporter.sendMail({
      from: MAIL_USER || `no-reply@${SMTP_HOST}`,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text: textBody,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Position:</strong> ${position}</p>
             <p><strong>Social:</strong> ${socialMedia}</p>
             <p><strong>Language:</strong> ${language}</p>
             <hr/>
             <p>${message.replace(/\n/g, '<br/>')}</p>`
    })

    return NextResponse.json({ success: true, message: 'Message sent' }, { status: 200 })
  } catch (error) {
    console.error('Contact API error', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
