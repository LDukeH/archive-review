import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search") || "";

    if (!searchTerm) {
      return NextResponse.json([]);
    }

    const reviews = await prisma.review.findMany({
      where: {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const review = await prisma.review.create({
      data: {
        authorName: data.authorName,
        coverImage: data.coverImage,
        description: data.description,
        ExternalLink: data.ExternalLink,
        rating: parseInt(data.rating, 10),
        title: data.title,
        type: data.type,
        tags: {
          connect: data.tags.map((tag: string) => ({ name: tag })),
        },
        story: data.story,
        pros: data.pros,
        cons: data.cons,
        summary: data.summary,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
