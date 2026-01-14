import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      userType,
      firstName,
      lastName,
      email,
      phone,
      country,
      socialMedia,
      role,
      language,
    } = body

    // Validation
    if (!userType || !firstName || !lastName || !email || !phone || !country || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      )
    }

    // Send to n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    const webhookUser = process.env.N8N_WEBHOOK_USER
    const webhookPass = process.env.N8N_WEBHOOK_PASS

    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL is not configured")
      return NextResponse.json(
        { success: false, message: "Webhook not configured" },
        { status: 500 }
      )
    }

    // Prepare Basic Auth header
    const authHeader = Buffer.from(`${webhookUser}:${webhookPass}`).toString("base64")

    const payload = {
      userType,
      firstName,
      lastName,
      email,
      phone,
      country,
      socialMedia: socialMedia || "",
      role,
      language: language || "en",
      submittedAt: new Date().toISOString(),
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(payload),
    })

    if (!webhookResponse.ok) {
      console.error("n8n webhook error:", webhookResponse.status, await webhookResponse.text())
      return NextResponse.json(
        { success: false, message: "Failed to submit demo request" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: "Demo request submitted successfully" })
  } catch (error) {
    console.error("Book demo API error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
