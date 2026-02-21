import * as repo from "../repositories/task.repository";

export const createTaskService = (userId: string, title: string) =>
  repo.createTask({ title, userId });

export const countTasks = (userId: string) =>
  repo.countTasks(userId);

export const getTasksService = (userId: string, query: any) =>
  repo.getTasks(userId, query);

export const updateTaskService = (id: string, data: any) =>
  repo.updateTask(id, data);

export const deleteTaskService = (id: string) =>
  repo.deleteTask(id);

export const toggleTaskService = async (id: string) => {
  const task = await repo.findTask(id);
  return repo.updateTask(id, { completed: !task?.completed });
};
