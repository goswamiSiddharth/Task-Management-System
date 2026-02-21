"use client";

import { api } from "@/services/api";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  task: Task;
  onUpdate: () => void;
}

export default function TaskCard({ task, onUpdate }: Props) {
  const toggleTask = async () => {
    try {
      await api.patch(`/tasks/${task.id}/toggle`);
      onUpdate();
    } catch (err) {
      console.error("Toggle error", err);
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onUpdate();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <h3>{task.title}</h3>
        <span>
          {task.completed ? "✅ Done" : "⏳ Pending"}
        </span>
      </div>

      <div style={styles.buttons}>
        <button onClick={toggleTask}>Toggle</button>
        <button onClick={deleteTask} style={styles.delete}>
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #eee",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttons: {
    marginTop: 10,
    display: "flex",
    gap: 10,
  },
  delete: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "6px 12px",
  },
};
