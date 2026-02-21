"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(""); 

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser(email, password);
      console.log("register res", res);

      if (res.message !== "Error") {
        router.push("/login");
      } else {
        setError("This email already exists");
      }
    } catch (err) {
      console.error("Register error", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(""); 
        }}
        style={{
          ...styles.input,
          borderColor: error ? "red" : "#ccc",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(""); 
        }}
        style={{
          ...styles.input,
          borderColor: error ? "red" : "#ccc",
        }}
      />

      {error && <p style={styles.error}>{error}</p>}

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    maxWidth: 400,
    margin: "auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#10b981",
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
