import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: NextResponse,
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const body = await request.json();
    const { name, description, price, imageUrl, category } = body;

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
