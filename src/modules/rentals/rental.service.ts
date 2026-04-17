import { prisma } from "../../config/db";

type CreateRentalSpacePayload = {
  location: string;
  size: string;
  price: number;
};

export const createRentalSpace = async (
  userId: string,
  data: CreateRentalSpacePayload
) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    throw new Error("Vendor profile required");
  }

  return prisma.rentalSpace.create({
    data: {
      vendorId: vendor.id,
      location: data.location,
      size: data.size,
      price: data.price
    }
  });
};

export const listRentalSpaces = async () => {
  return prisma.rentalSpace.findMany({
    where: {
      availability: true
    },
    include: {
      vendor: true
    }
  });
};

export const myRentalSpaces = async (userId: string) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    throw new Error("Vendor profile not found");
  }

  return prisma.rentalSpace.findMany({
    where: {
      vendorId: vendor.id
    }
  });
};