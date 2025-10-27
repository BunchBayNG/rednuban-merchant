import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationId, userId, firstName, lastName, email, role, message } = body;

    // Validate required fields
    if (!organizationId || !userId || !firstName || !lastName || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields: organizationId, userId, firstName, lastName, email, role" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    console.log("Retrieved accessToken from cookie:", accessToken ? "Present" : "Missing");

    if (!accessToken) {
      console.error("No access token found in cookie");
      return NextResponse.json({ error: "Authorization required" }, { status: 401 });
    }

    const payload = {
      organizationId,
      userId,
      firstName,
      lastName,
      email,
      role,
      message: message || `You have been invited to join as ${role}`,
    };

    const apiUrl = "https://redcollection.onrender.com/api/v1/users/invite";
    console.log("External API URL:", apiUrl);
    console.log("Request Payload:", JSON.stringify(payload, null, 2));

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("External API Response:", {
      status: res.status,
      body: JSON.stringify(data, null, 2),
    });

    if (res.ok && data.status) {
      return NextResponse.json(data, { status: 200 });
    } else {
      console.error("External API Error:", data);
      return NextResponse.json(
        {
          error: data.detail || data.message || "Failed to send invitation",
          status: res.status,
        },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error("Invite API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}