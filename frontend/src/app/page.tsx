"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.subtitle}>Organize your work efficiently</p>

        <div style={styles.buttonGroup}>
          <Link href="/login" style={styles.loginBtn}>
            Login
          </Link>

          <Link href="/register" style={styles.registerBtn}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    textAlign: "center" as const,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  loginBtn: {
    padding: "12px",
    borderRadius: "8px",
    background: "#3b82f6",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  registerBtn: {
    padding: "12px",
    borderRadius: "8px",
    background: "#10b981",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
