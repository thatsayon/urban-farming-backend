import "dotenv/config";
import { PrismaClient, Role, CertificationStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

async function main() {

 await prisma.order.deleteMany();
 await prisma.communityPost.deleteMany();
 await prisma.sustainabilityCert.deleteMany();
 await prisma.rentalSpace.deleteMany();
 await prisma.produce.deleteMany();
 await prisma.vendorProfile.deleteMany();
 await prisma.user.deleteMany();

 const password = await bcrypt.hash("123456", 10);

 /*
 ADMIN
 */

 await prisma.user.create({
  data:{
   name:"Admin",
   email:"admin@mail.com",
   password,
   role:Role.ADMIN
  }
 });

 /*
 VENDORS + PROFILE
 */

 const vendors = [];

 for(let i=1;i<=10;i++){

  const user = await prisma.user.create({
   data:{
    name:`Vendor ${i}`,
    email:`vendor${i}@mail.com`,
    password,
    role:Role.VENDOR
   }
  });

  const profile = await prisma.vendorProfile.create({
   data:{
    userId:user.id,
    farmName:`Green Farm ${i}`,
    farmLocation:`Dhaka ${i}`,
    certificationStatus:CertificationStatus.APPROVED
   }
  });

  vendors.push(profile);

 }

 /*
 CUSTOMERS
 */

 for(let i=1;i<=5;i++){

  await prisma.user.create({
   data:{
    name:`Customer ${i}`,
    email:`customer${i}@mail.com`,
    password,
    role:Role.CUSTOMER
   }
  });

 }

 /*
 PRODUCE (100 items)
 */

 for(let i=1;i<=100;i++){

  const vendor =
   vendors[Math.floor(Math.random()*vendors.length)];

  await prisma.produce.create({
   data:{
    name:`Organic Product ${i}`,
    description:`Fresh organic produce ${i}`,
    price:Math.floor(Math.random()*500)+50,
    category:"vegetable",
    availableQuantity:100,
    certificationStatus:CertificationStatus.APPROVED,
    vendorId:vendor.id
   }
  });

 }

 console.log("Seed completed successfully");

}

main()
 .catch(console.error)
 .finally(()=>prisma.$disconnect());