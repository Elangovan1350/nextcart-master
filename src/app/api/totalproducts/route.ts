import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const totalProducts = await prisma.product.findMany();
    return NextResponse.json(totalProducts);
  } catch (error) {
    console.error("Error fetching total products:", error);
    return NextResponse.json(
      { error: "Failed to fetch total products" },
      { status: 500 },
    );
  }
}
