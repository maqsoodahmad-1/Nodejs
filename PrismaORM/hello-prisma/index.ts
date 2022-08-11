import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main() {
    //connect the client 
    await prisma.$connect()
    //creating a user 
    await prisma.user.create({
        data: {
            name:   'Maqsood',
            email:  'maqsoodmaxood75@gmail.com',
            posts:   {
                create: {
                    title:  'My first Post',
                    body:   'Lots of really intresting stuff',
                    slug:   'my-first-post' , 
                },
            },
        },
    })
 //updating the user 
 async function main() {
  await prisma.post.update({
    where: {
      slug: 'my-first-post',
    },
    data: {
      comments: {
        createMany: {
          data: [
            { comment: 'Great post!' },
            { comment: "Can't wait to read more!" },
          ],
        },
      },
    },
  })
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  })

  console.dir(posts, { depth: Infinity })
}
    //You will write your prisma client queries here 
    const allUser = await prisma.user.findMany({
        include:{
            posts: true,
        },
    })
    console.log(allUser,{depth: null});   
}

main()
   .then(async () => {
    await prisma.$disconnect()
   })
   .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect()
    process.exit(1)
   })