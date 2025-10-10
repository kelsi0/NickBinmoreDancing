import { type NextRequest, NextResponse } from "next/server";
import { contentfulClient } from "@/lib/contentful";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contentType = searchParams.get("content_type");
    const fieldName = searchParams.get("field_name");
    const fieldValue = searchParams.get("field_value");

    if (!contentType) {
      return NextResponse.json(
        { error: "content_type parameter is required" },
        { status: 400 },
      );
    }

    const query: any = {
      content_type: contentType,
    };

    // Add field filter if provided
    if (fieldName && fieldValue) {
      query[`fields.${fieldName}`] = fieldValue;
    }

    const entries = await contentfulClient.getEntries(query);

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Contentful API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content from Contentful" },
      { status: 500 },
    );
  }
}
