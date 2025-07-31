"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post("/api/register", { name, email, password });
      alert("Registration Successful!");
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #f3e7e9 100%)",
        fontFamily: "'Merriweather', serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "18px",
          boxShadow: "0 8px 32px 0 rgba(123,67,151,0.10)",
          padding: "40px 32px",
          maxWidth: "350px",
          width: "100%",
          border: "1px solid #e0c3fc",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2rem",
            color: "#7b4397",
            marginBottom: "18px",
            letterSpacing: "1px",
          }}
        >
          Register
        </h1>
        <div
          style={{
            fontStyle: "italic",
            color: "#555",
            marginBottom: "22px",
            fontSize: "1.05rem",
          }}
        >
          "शायरी की दुनिया में आपका स्वागत है"
        </div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "8px 0",
            borderRadius: "8px",
            border: "1px solid #d1c4e9",
            fontSize: "1rem",
            outline: "none",
            background: "#f3e7e9",
          }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "8px 0",
            borderRadius: "8px",
            border: "1px solid #d1c4e9",
            fontSize: "1rem",
            outline: "none",
            background: "#f3e7e9",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "8px 0 18px 0",
            borderRadius: "8px",
            border: "1px solid #d1c4e9",
            fontSize: "1rem",
            outline: "none",
            background: "#f3e7e9",
          }}
        />
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background:
              "linear-gradient(90deg, #7b4397 0%, #dc2430 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginBottom: "12px",
            boxShadow: "0 2px 8px rgba(123,67,151,0.08)",
          }}
        >
          Register
        </button>
        <div
          style={{
            marginTop: "10px",
            color: "#7b4397",
            fontSize: "0.98rem",
          }}
        >
          <span>Already have an account? </span>
          <Link
            href="/login"
            style={{
              color: "#dc2430",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
