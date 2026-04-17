import { prisma } from "../../config/db";

type CreateProducePayload = {
  name: string;
  description: string;
  price: number;
  category: string;
  availableQuantity: number;
};

export const createProduce = async (
  userId: string,
  payload: CreateProducePayload
) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    throw new Error("Vendor profile required");
  }

  return prisma.produce.create({
    data: {
      vendorId: vendor.id,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      category: payload.category,
      availableQuantity: payload.availableQuantity
    }
  });
};

export const listProduce = async (skip: number, limit: number) => {
  const [data, count] = await prisma.$transaction([
    prisma.produce.findMany({
      skip,
      take: limit,
      include: {
        vendor: true
      }
    }),
    prisma.produce.count()
  ]);

  return { data, count };
};

export const getVendorProduce = async (userId: string) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return prisma.produce.findMany({
    where: {
      vendorId: vendor.id
    }
  });
};