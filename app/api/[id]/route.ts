import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  console.log("ID received:", id);

  // Now you can use the id
  try {
    const response = await prisma.review.findUnique({
      where: { id: id as string },
    });

    if (!response) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching review by ID", error);
    return NextResponse.json(
      { error: "Failed to fetch review by ID" },
      { status: 500 }
    );
  }
}
