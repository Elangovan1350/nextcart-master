import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const productId = parseInt(id);
  console.log(productId);
  const data = await prisma.product.findUnique({
    where: { id: productId },
  });
  return NextResponse.json(data);
}
