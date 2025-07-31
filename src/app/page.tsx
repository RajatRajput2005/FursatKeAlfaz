"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar.tsx";

type Poem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: { name?: string };
  _count?: { likes?: number };
};

export default function Home() {
  const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    fetch("/api/poem")
      .then((res) => res.json())
      .then((data) => setPoems(data.poems));
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f3e7e9 100%)",
        fontFamily: "'Merriweather', serif",
        padding: "0",
      }}
    >
      {/* <Navbar /> */}
      <div
        style={{
          maxWidth: "700px",
          margin: "32px auto 0 auto",
          padding: "0 16px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2.5rem",
            color: "#7b4397",
            textAlign: "center",
            marginBottom: "8px",
            letterSpacing: "1px",
          }}
        >
          Fursat Ke Alfaz
        </h1>
        <div
          style={{
            fontStyle: "italic",
            color: "#555",
            textAlign: "center",
            marginBottom: "32px",
            fontSize: "1.15rem",
          }}
        >
          "हर शायरी में छुपा है दिल का हाल..."
        </div>
        {poems.map((poem) => (
          <div
            key={poem.id}
            style={{
              background: "rgba(255,255,255,0.97)",
              borderRadius: "16px",
              boxShadow: "0 4px 18px 0 rgba(123,67,151,0.08)",
              border: "1px solid #e0c3fc",
              padding: "24px 22px 18px 22px",
              margin: "0 0 28px 0",
              transition: "box-shadow 0.2s",
            }}
          >
            <h2
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#dc2430",
                fontSize: "1.5rem",
                marginBottom: "10px",
                letterSpacing: "0.5px",
              }}
            >
              {poem.title}
            </h2>
            <p
              style={{
                fontSize: "1.12rem",
                color: "#333",
                marginBottom: "16px",
                whiteSpace: "pre-line",
                lineHeight: 1.7,
              }}
            >
              {poem.content}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#7b4397", fontSize: "1rem", fontStyle: "italic" }}>
                By: {poem.author?.name || "Unknown"}
              </span>
              <span style={{ color: "#dc2430", fontWeight: "bold", fontSize: "1rem" }}>
                ❤️ {poem._count?.likes ?? 0} Likes
              </span>
            </div>
            <small
              style={{
                color: "#7b4397",
                fontSize: "0.98rem",
                fontStyle: "italic",
              }}
            >
              {new Date(poem.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </main>
  );
}
