import { prisma } from "./config/prisma";

async function main() {
  try {
    
    const user = await prisma.user.create({
      data: {
        email: `user${Date.now()}@gmail.com`, 
        password: "123456",
      },
    });

    console.log("✅ User created:", user);

   
    const task = await prisma.task.create({
      data: {
        title: "Learn Prisma",
        userId: user.id, 
      },
    });

    console.log("📝 Task created:", task);

    
    const users = await prisma.user.findMany({
      include: {
        tasks: true,
      },
    });

    console.log("📦 Users with tasks:", users);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
