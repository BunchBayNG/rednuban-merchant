// ================= API ROUTE =================
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// function parseDate(dateStr: string): Date {
//   return new Date(`${dateStr}T00:00:00Z`);
// }

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const previousStart = searchParams.get("previousStart");
    const previousEnd = searchParams.get("previousEnd");
    const merchantOrgId = searchParams.get("merchantOrgId") || "";

    if (!startDate || !endDate || !previousStart || !previousEnd) {
      return NextResponse.json(
        {
          status: false,
          statusCode: 400,
          message: "All date ranges are required",
          data: null,
        },
        { status: 400 }
      );
    }
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          status: false,
          statusCode: 401,
          message: "Unauthorized: Missing access token",
          data: null,
        },
        { status: 401 }
      );
    }

    const fetchSummary = async (start: string, end: string) => {
      const apiUrl = `https://redcollection.onrender.com/api/v1/analytics/transactions/count-summary?startDate=${start}T00:00:00Z&endDate=${end}T00:00:00Z${merchantOrgId ? `&merchantOrgId=${merchantOrgId}` : ""}`;

      const res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
      });

      const data = await res.json();
      if (!res.ok || !data.status || !data.data) {
        throw new Error(data.message || "Failed to fetch summary data");
      }

      return data.data;
    };

    const current = await fetchSummary(startDate, endDate);
    const previous = await fetchSummary(previousStart, previousEnd);

    const totalNow = current.total || 0;
    const totalPrev = previous.total || 0;
    const successNow = current.success || 0;
    const successPrev = previous.success || 0;

    const totalChange =
      totalPrev !== 0 ? ((totalNow - totalPrev) / totalPrev) * 100 : 0;
    const successChange =
      successPrev !== 0 ? ((successNow - successPrev) / successPrev) * 100 : 0;

    return NextResponse.json(
      {
        status: true,
        statusCode: 200,
        message: "Metrics fetched successfully",
        data: {
          total: totalNow,
          success: successNow,
          change: Math.round(totalChange * 10) / 10,
          successChange: Math.round(successChange * 10) / 10,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}
