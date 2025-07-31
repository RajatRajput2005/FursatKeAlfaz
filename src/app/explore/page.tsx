"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "@/components/withAuth";   

function ExplorePage() {
  const [poems, setPoems] = useState([]);
  const [category, setCategory] = useState("");

  const fetchPoems = async (category = "") => {
    const res = await axios.get(`/api/poem${category ? `?category=${category}` : ""}`);
    setPoems(res.data.poems);
  };

  useEffect(() => { fetchPoems(); }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f3e7e9 100%)",
        fontFamily: "'Merriweather', serif",
        padding: "0",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "32px auto 0 auto",
          padding: "0 16px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2.2rem",
            color: "#7b4397",
            textAlign: "center",
            marginBottom: "18px",
            letterSpacing: "1px",
          }}
        >
          Explore Shayari
        </h1>
        <div style={{ textAlign: "center", marginBottom: "28px", display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          {["All", "Love", "Sad", "Romantic", "Motivational", "Adults", "Other"].map((cat) => {
            // Map button label to backend category value
            const value = cat === "All" ? "" : cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => { setCategory(value); fetchPoems(value); }}
                style={{
                  padding: "10px 22px",
                  borderRadius: "8px",
                  border: "none",
                  background: category === value ? "linear-gradient(90deg, #7b4397 0%, #dc2430 100%)" : "linear-gradient(90deg, #dc2430 0%, #7b4397 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(123,67,151,0.08)",
                  transition: "background 0.2s"
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(90deg, #7b4397 0%, #dc2430 100%)")}
                onMouseLeave={e => (e.currentTarget.style.background = category === value ? "linear-gradient(90deg, #7b4397 0%, #dc2430 100%)" : "linear-gradient(90deg, #dc2430 0%, #7b4397 100%)")}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            marginBottom: "32px"
          }}
        >
          {poems.map((poem: any) => (
            <div
              key={poem.id}
              style={{
                background: "rgba(255,255,255,0.97)",
                borderRadius: "18px",
                boxShadow: "0 4px 18px 0 rgba(123,67,151,0.10)",
                border: "1px solid #e0c3fc",
                padding: "24px 22px 18px 22px",
                transition: "box-shadow 0.25s, transform 0.18s",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px 0 rgba(123,67,151,0.18)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.02)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 18px 0 rgba(123,67,151,0.10)";
                (e.currentTarget as HTMLDivElement).style.transform = "none";
              }}
            >
              <h2
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: "#dc2430",
                  fontSize: "1.4rem",
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                  alignSelf: "center"
                }}
              >
                {poem.title}
              </h2>
              <p
                style={{
                  fontSize: "1.12rem",
                  color: "#333",
                  marginBottom: "12px",
                  whiteSpace: "pre-line",
                  lineHeight: 1.7,
                  alignSelf: "center",
                  textAlign: "center",
                  width: "100%"
                }}
              >
                {poem.content}
              </p>
              <p
                style={{
                  color: "#7b4397",
                  fontSize: "1rem",
                  marginBottom: "10px",
                  fontStyle: "italic",
                  alignSelf: "flex-end"
                }}
              >
                Category: {poem.category}
              </p>
              <p
                style={{
                  color: "#dc2430",
                  fontSize: "1rem",
                  marginBottom: "0",
                  fontWeight: "bold",
                  alignSelf: "flex-end"
                }}
              >
                ❤️ {poem._count.likes} Likes
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAuth(ExplorePage);
