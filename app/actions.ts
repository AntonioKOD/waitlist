"use server"

type SubmitEmailResponse = {
  success: boolean
  message?: string
}

export async function submitEmail(email: string): Promise<SubmitEmailResponse> {
  console.log(`Email submitted: ${email}`)

  // basic sanity check
  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    }
  }

  try {
    // SheetDB endpoint for your Google Sheet


    // send the email off to SheetDB
    const res = await fetch(`${process.env.GOOGLE_SHEET_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { email, timestamp: new Date().toISOString() },
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("SheetDB error:", text)
      return {
        success: false,
        message: "Failed to add your email. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Thanks! You’re on the waitlist now.",
    }
  } catch (err) {
    console.error("Network or unexpected error:", err)
    return {
      success: false,
      message: "Something went wrong. Please try again soon.",
    }
  }
}