import { prisma } from "../../config/db";

type CreateCertificationPayload = {
  certifyingAgency: string;
  certificationDate: string;
};

export const createCertification = async (
  userId: string,
  payload: CreateCertificationPayload
) => {

  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    throw new Error("Vendor profile required");
  }

  return prisma.sustainabilityCert.create({
    data: {
      vendorId: vendor.id,
      certifyingAgency: payload.certifyingAgency,
      certificationDate: new Date(payload.certificationDate),
      status: "PENDING"
    }
  });

};

export const getMyCertifications = async (userId: string) => {

  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return prisma.sustainabilityCert.findMany({
    where: { vendorId: vendor.id },
    orderBy: {
      certificationDate: "desc"
    }
  });

};

export const verifyCertification = async (
  certId: string,
  status: "PENDING" | "APPROVED" | "REJECTED"
) => {

  const cert = await prisma.sustainabilityCert.update({
    where: { id: certId },
    data: { status }
  });

  if (status === "APPROVED") {

    await prisma.vendorProfile.update({
      where: { id: cert.vendorId },
      data: {
        certificationStatus: "APPROVED"
      }
    });

  }

  return cert;

};

export const getAllCertifications = async (status?: string) => {

 return prisma.sustainabilityCert.findMany({

  where: status
   ? { status }
   : {},

  include:{
   vendor:{
    include:{
     user: {
      select: {
       id: true,
       name: true,
       email: true,
       role: true,
       status: true,
       createdAt: true,
       updatedAt: true
      }
     }
    }
   }
  },

  orderBy:{
   certificationDate:"desc"
  }
 });
};