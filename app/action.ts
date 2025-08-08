"use server";

import { signIn, signOut } from "@/auth";

import prisma from "@/lib/prisma";

const page = process.env.PAGE || "http://localhost:3000";

export async function signInWith(provider: string) {
  await signIn(provider, { redirectTo: page });
  return;
}

export async function addToFavorites({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}) {
  if (!reviewId || !userId) {
    throw new Error("Review ID and User ID are required");
  }
  try {
    const response = await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteReviews: {
          connect: { id: reviewId },
        },
      },
    });
    if (response) {
      console.log("Successfully added to favorites");
    }
    return response;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw new Error("Failed to add to favorites");
  }
}

export async function removeFromFavorites({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}) {
  if (!reviewId || !userId) {
    throw new Error("Review ID and User ID are required");
  }

  try {
    const response = await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteReviews: {
          disconnect: { id: reviewId },
        },
      },
    });
    if (response) {
      console.log("Successfully removed from favorites");
    }
    if (!response) {
      throw new Error("User not found or review not in favorites");
    }
    return;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw new Error("Failed to remove from favorites");
  }
}

export async function findFavoriteReviews(userId: string | undefined) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favoriteReviews: true },
    });
    return user?.favoriteReviews || [];
  } catch (error) {
    console.error("Error finding favorite reviews:", error);
    throw new Error("Failed to find favorite reviews");
  }
}
