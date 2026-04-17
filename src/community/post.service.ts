import { prisma } from "../config/db";

export const createPost = async (userId: string, content: string) => {
 return prisma.communityPost.create({
  data:{
   userId,
   postContent: content
  }
 });
};


export const getPosts = async (skip: number, limit: number) => {

 const [data, count] = await prisma.$transaction([
  prisma.communityPost.findMany({
   skip,
   take: limit,
   include:{
    user: {
     select: {
      id: true,
      name: true,
      email: true,
      role: true
     }
    }
   },
   orderBy:{
    postDate:"desc"
   }
  }),
  prisma.communityPost.count()
 ]);

 return { data, count };
};