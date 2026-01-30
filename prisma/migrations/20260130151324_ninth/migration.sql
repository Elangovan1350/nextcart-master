-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';
