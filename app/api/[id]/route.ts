import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, context: any) {
  const { id } = await context.params;

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
