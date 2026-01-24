import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.product.findMany({
    take: 8,
  });
  return NextResponse.json(data);
}
