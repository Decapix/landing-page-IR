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

    const backendUrl = process.env.BACKEND_APP_URL
    const token = process.env.UNIQUE_TOKEN_COMMUNICATION

    if (!backendUrl || !token) {
      console.error("BACKEND_APP_URL or UNIQUE_TOKEN_COMMUNICATION is not configured")
      return NextResponse.json(
        { success: false, message: "Backend not configured" },
        { status: 500 }
      )
    }

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
    }

    const backendResponse = await fetch(`${backendUrl}api/landing-page/book-demo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!backendResponse.ok) {
      console.error("Backend API error:", backendResponse.status, await backendResponse.text())
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
