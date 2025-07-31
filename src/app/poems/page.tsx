"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ExplorePage() {
  const [poems, setPoems] = useState([]);
  const [category, setCategory] = useState("");

  const fetchPoems = async (selectedCategory = "") => {
    try {
      const res = await axios.get(`/api/poem${selectedCategory ? `?category=${selectedCategory}` : ""}`);
      setPoems(res.data.poems);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  const handleLike = async (poemId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to like!");

      await axios.post("/api/like", { poemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchPoems(category); // Refresh after like
    } catch (err: any) {
      console.error("Like Error:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

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
          Enjoy  Shayari
        </h1>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); fetchPoems(e.target.value); }}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #d1c4e9",
              fontSize: "1rem",
              background: "#f3e7e9",
              color: "#7b4397",
              fontWeight: "bold",
              outline: "none",
              marginBottom: "8px"
            }}
          >
            <option value="">All Categories</option>
            <option value="sad">Sad</option>
            <option value="love">Love</option>
            <option value="romantic">Romantic</option>
            <option value="adult">Adult</option>
          </select>
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
                By: {poem.author?.name || "Unknown"}
              </p>
              <button
                onClick={() => handleLike(poem.id)}
                style={{
                  background: "linear-gradient(90deg, #dc2430 0%, #7b4397 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "7px 18px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(123,67,151,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  alignSelf: "center",
                  marginTop: "auto",
                  transition: "background 0.2s"
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(90deg, #7b4397 0%, #dc2430 100%)")}
                onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(90deg, #dc2430 0%, #7b4397 100%)")}
              >
                <span style={{ fontSize: "1.2rem" }}>❤️</span>
                {poem._count.likes} Likes
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
