import * as service from "../services/task.service";

export const createTask = async (req: any, res: any) => {
  const task = await service.createTaskService(req.userId, req.body.title);
  res.json({task});
};

export const getTasks = async (req: any, res: any) => {
  const tasks = await service.getTasksService(req.userId, req.query);
  const count = await service.countTasks(req.userId);
  const totalPages = Math.ceil(count / 5);


  res.json({tasks,totalPages});
};

export const updateTask = async (req: any, res: any) => {
  const task = await service.updateTaskService(req.params.id, req.body);
  res.json(task);
};

export const deleteTask = async (req: any, res: any) => {
  await service.deleteTaskService(req.params.id);
  res.json({ message: "Deleted" });
};

export const toggleTask = async (req: any, res: any) => {
  const task = await service.toggleTaskService(req.params.id);
  res.json(task);
};
