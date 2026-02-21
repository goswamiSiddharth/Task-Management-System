"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import TaskCard from "@/components/TaskCard";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState(""); // ✅ NEW

  const fetchTasks = async (pageNumber = 1) => {
    try {
      const res = await api.get(`/tasks?page=${pageNumber}`);

      if (res.tasks) {
        setTasks(res.tasks);
        setTotalPages(res.totalPages || 1);
      } else if (Array.isArray(res)) {
        setTasks(res);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("Fetch tasks error", err);
      setTasks([]);
    }
  };

  const createTask = async () => {
    if (!title) return;

    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks(page);
    } catch (err) {
      console.error("Create task error", err);
    }
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "ALL") return true;
      if (filter === "COMPLETED") return task.completed;
      if (filter === "PROCESSING") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>

      <div style={styles.createBox}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <button onClick={createTask}>Add Task</button>
      </div>

      <div style={styles.filterRow}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="ALL">All</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      {filteredTasks.length === 0 && <p>No tasks found</p>}

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={() => fetchTasks(page)}
        />
      ))}

      <div style={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  createBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
  },
  search: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
};
