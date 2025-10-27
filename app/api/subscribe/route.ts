import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;

    console.log("Klaviyo API Key:", KLAVIYO_API_KEY);
    console.log("Klaviyo List ID:", KLAVIYO_LIST_ID);

    if (!KLAVIYO_API_KEY) {
      console.error("KLAVIYO_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!KLAVIYO_LIST_ID) {
      console.error("KLAVIYO_LIST_ID is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Add contact to Klaviyo
    const response = await fetch(
      `https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          Revision: "2025-10-15",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      subscriptions: {
                        email: { marketing: { consent: "SUBSCRIBED" } },
                      },
                      email: email,
                    },
                  },
                ],
              },
              historical_import: false,
            },
            relationships: {
              list: { data: { type: "list", id: KLAVIYO_LIST_ID } },
            },
          },
        }),
      }
    );

    const data = await response.text();

    if (!response.ok) {
      console.error("Klaviyo API error:", data);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
