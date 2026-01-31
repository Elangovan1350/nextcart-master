import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { log } from "console";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const productId = parseInt(id);
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userFav = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        favorites: true,
      },
    });

    const favoriteToDelete = userFav?.favorites.find(
      (fav) => fav.productId === productId,
    );
    if (!favoriteToDelete) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 },
      );
    }
    const deletedFavorite = await prisma.favorite.delete({
      where: {
        id: favoriteToDelete.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Favorite deleted successfully",
        deletedFavorite,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json(
      { error: "Failed to delete favorite" },
      { status: 500 },
    );
  }
}
