import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Use node runtime so we can use file system operations
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

// Initialize Resend with API key
const resend = new Resend('re_7ZKCTe2N_JqgY4tumYyyyerDP9oWPToA6')

// Path to store submissions
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions.json')

// Function to save submission to JSON file
async function saveSubmission(data: Body) {
  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Read existing submissions or create empty array
    let submissions = []
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const fileContent = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8')
      submissions = JSON.parse(fileContent)
    }

    // Add new submission with timestamp
    submissions.push({
      ...data,
      submittedAt: new Date().toISOString()
    })

    // Write back to file
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))
    console.log('✅ Submission saved to database')
  } catch (error) {
    console.error('❌ Error saving submission:', error)
    // Don't throw - we still want to send the email even if storage fails
  }
}

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

    console.log('📥 Received form submission:', { firstName, lastName, email, position })

    // Honeypot anti-spam: silently accept if filled
    if (company && company.trim() !== '') {
      console.log('🚫 Honeypot triggered - ignoring submission')
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      console.log('❌ Validation failed: Missing required fields')
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    if (!EMAIL_RE.test(email)) {
      console.log('❌ Validation failed: Invalid email')
      return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 })
    }

    if (message.length > 10000) {
      console.log('❌ Validation failed: Message too long')
      return NextResponse.json({ success: false, message: 'Message too long' }, { status: 400 })
    }

    // Save to database
    await saveSubmission(body)

    // Send email with Resend
    const subject = `Nouveau message de contact • ${firstName} ${lastName}`
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nouveau message de contact</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Réseaux sociaux:</strong> ${socialMedia || 'Non fourni'}</p>
          <p><strong>Langue:</strong> ${language}</p>
        </div>
        <div style="margin-top: 20px; padding: 20px; background-color: #fff; border-left: 4px solid #000;">
          <h3 style="margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `

    console.log('📧 Sending email via Resend...')

    try {
      const { data, error } = await resend.emails.send({
        from: 'Inside Runway <onboarding@resend.dev>',
        to: ['adonis.pesic@gmail.com'],
        replyTo: email,
        subject: subject,
        html: htmlContent
      })


      if (error) {
        console.error('❌ Resend error:', error)
        return NextResponse.json({
          success: false,
          message: 'Failed to send email'
        }, { status: 500 })
      }

      console.log('✅ Email sent successfully via Resend:', data)
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully'
      }, { status: 200 })

    } catch (emailError) {
      console.error('❌ Error sending email:', emailError)
      return NextResponse.json({
        success: false,
        message: 'Failed to send email'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('❌ Contact API error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
