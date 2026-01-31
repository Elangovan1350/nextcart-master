import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      favorites,

      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { productId, name, imageUrl, price } = await request.json();
    // Further processing can be done here
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        productId,
        name,
        imageUrl,
        price,
      },
    });

    return NextResponse.json(
      { success: true, message: "Favorite added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating favorite:", error);
    return NextResponse.json(
      { error: "Failed to create favorite" },
      { status: 500 },
    );
  }
}
