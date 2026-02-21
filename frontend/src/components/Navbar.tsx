"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  if (!mounted) return null;

  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  return (
    <nav style={styles.nav}>
      <h2>Task Manager</h2>

      <div style={styles.links}>
        {!isLoggedIn ? (
          <>
            {pathname !== "/login" && (
              <Link href="/login">Login</Link>
            )}
            {pathname !== "/register" && (
              <Link href="/register">Register</Link>
            )}
          </>
        ) : (
          <>
            {pathname !== "/dashboard" && (
              <Link href="/dashboard">Dashboard</Link>
            )}
            <button onClick={logout} style={styles.logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #ddd",
    background: "#f8fafc",
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
