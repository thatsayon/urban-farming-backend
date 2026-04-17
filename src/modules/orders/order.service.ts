import { prisma } from "../../config/db";

export const createOrder = async (
  userId: string,
  produceId: string
) => {
  const produce = await prisma.produce.findUnique({
    where: { id: produceId }
  });

  if (!produce) {
    throw new Error("Produce not found");
  }

  if (produce.availableQuantity < 1) {
    throw new Error("Out of stock");
  }

  const order = await prisma.order.create({
    data: {
      userId,
      produceId,
      vendorId: produce.vendorId
    }
  });

  await prisma.produce.update({
    where: { id: produceId },
    data: {
      availableQuantity: {
        decrement: 1
      }
    }
  });

  return order;
};

export const getMyOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      produce: true
    }
  });
};

export const getVendorOrders = async (vendorUserId: string) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId: vendorUserId }
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return prisma.order.findMany({
    where: {
      vendorId: vendor.id
    },
    include: {
      produce: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};