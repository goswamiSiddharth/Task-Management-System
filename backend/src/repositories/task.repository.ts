import { prisma } from "../config/prisma";

export const createTask = (data: any) =>
  prisma.task.create({ data });

export const countTasks = (userId: string) =>
  prisma.task.count({
    where: { userId }
  })


export const getTasks = (userId: string, query: any) => {
  return prisma.task.findMany({
    where: {
      userId,
      title: { contains: query.search || "" },
      completed: query.status ? query.status === "true" : undefined,
    },
    
    skip: (Number(query.page || 1) - 1) * 5,
    take: 5,
  });
};

export const updateTask = (id: string, data: any) =>
  prisma.task.update({ where: { id }, data });

export const deleteTask = (id: string) =>
  prisma.task.delete({ where: { id } });

export const findTask = (id: string) =>
  prisma.task.findUnique({ where: { id } });
