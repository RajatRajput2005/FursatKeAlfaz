"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      router.push("/");  // ✅ Redirect to home page after login
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f3e7e9 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Merriweather', serif"
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "18px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          padding: "40px 32px",
          maxWidth: "350px",
          width: "100%",
          textAlign: "center",
          border: "1px solid #e0c3fc"
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2.2rem",
            color: "#7b4397",
            marginBottom: "18px",
            letterSpacing: "1px"
          }}
        >
          Fursat Ke Alfaz
        </h1>
        <div
          style={{
            fontStyle: "italic",
            color: "#555",
            marginBottom: "28px",
            fontSize: "1.1rem"
          }}
        >
          "हर अल्फ़ाज़ में छुपा है एक जज़्बात..."
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "8px 0",
            borderRadius: "8px",
            border: "1px solid #d1c4e9",
            fontSize: "1rem",
            outline: "none",
            background: "#f3e7e9"
          }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "8px 0 18px 0",
            borderRadius: "8px",
            border: "1px solid #d1c4e9",
            fontSize: "1rem",
            outline: "none",
            background: "#f3e7e9"
          }}
        /><br />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(90deg, #7b4397 0%, #dc2430 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginBottom: "12px",
            boxShadow: "0 2px 8px rgba(123,67,151,0.08)"
          }}
        >
          Login
        </button>
        <div style={{ marginTop: "10px", color: "#7b4397", fontSize: "0.98rem" }}>
          <span>Don't have an account? </span>
          <Link
            href="/register"
            style={{
              color: "#dc2430",
              textDecoration: "underline",
              fontWeight: "bold"
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
