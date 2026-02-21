"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(""); 

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(email, password);
      console.log("auth response", res);

      if (res.message !== "Invalid") {
        router.push("/dashboard");
      } else {
        setError("Wrong email or password");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>

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
        onClick={handleLogin}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
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
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
