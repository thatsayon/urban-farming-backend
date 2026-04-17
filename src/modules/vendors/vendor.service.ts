import { prisma } from "../../config/db";

export const createVendorProfile = async (userId: string, data: {
  farmName: string;
  farmLocation: string;
}) => {
  const exists = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (exists) {
    throw new Error("Vendor profile already exists");
  }

  return prisma.vendorProfile.create({
    data: {
      userId,
      farmName: data.farmName,
      farmLocation: data.farmLocation,
      certificationStatus: "PENDING"
    }
  });
};

export const getVendorProfile = async (userId: string) => {
  return prisma.vendorProfile.findUnique({
    where: { userId }
  });
};