import { api } from "./api";

export const getTasks = (query = "") =>
  api(`/tasks${query}`);

export const createTask = (title: string) =>
  api("/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

export const deleteTask = (id: string) =>
  api(`/tasks/${id}`, {
    method: "DELETE",
  });

export const toggleTask = (id: string) =>
  api(`/tasks/${id}/toggle`, {
    method: "PATCH",
  });
