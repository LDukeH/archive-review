import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.getAll("tags");

  console.log("Tags received:", tags);

  try {
    const movie = await prisma.review.findMany({
      where:
        tags.length > 0
          ? {
              type: "movie",
              AND: tags.map((tagName) => ({
                tags: {
                  some: {
                    name: tagName,
                  },
                },
              })),
            }
          : {
              type: "movie",
            },
      include: {
        tags: true,
      },
    });
    if (movie.length === 0) {
      return NextResponse.json({ message: "No movies found" }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie by tags", error);
    return NextResponse.json(
      { error: "Failed to fetch movie by tags" },
      { status: 500 }
    );
  }
}
