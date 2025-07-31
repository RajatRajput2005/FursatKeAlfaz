"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreatePoemPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first!");

      await axios.post("/api/poem", { title, content, category }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Poem Created Successfully!");
      router.push("/mypoems");
    } catch (err: any) {
      console.error("Create Poem Error:", err);
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
        fontFamily: "'Merriweather', serif"
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "18px",
          boxShadow: "0 8px 32px 0 rgba(123,67,151,0.10)",
          padding: "38px 32px 32px 32px",
          maxWidth: "420px",
          width: "100%",
          border: "1px solid #e0c3fc"
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2rem",
            color: "#7b4397",
            marginBottom: "18px",
            letterSpacing: "1px",
            textAlign: "center"
          }}
        >
          Write a New Shayari
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              margin: "10px 0",
              borderRadius: "8px",
              border: "1px solid #d1c4e9",
              fontSize: "1rem",
              outline: "none",
              background: "#f3e7e9"
            }}
          /><br />

          <textarea
            placeholder="Write your poem here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={7}
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "10px",
              border: "1px solid #d1c4e9",
              fontSize: "1.05rem",
              fontFamily: "'Merriweather', serif",
              background: "#f3e7e9",
              resize: "vertical"
            }}
          ></textarea><br />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              margin: "10px 0 18px 0",
              borderRadius: "8px",
              border: "1px solid #d1c4e9",
              fontSize: "1rem",
              background: "#f3e7e9"
            }}
          >
            <option value="">Select Category</option>
            <option value="sad">Sad</option>
            <option value="love">Love</option>
            <option value="romantic">Romantic</option>
            <option value="motivational">Motivational</option>
            <option value="adults">Adults</option>
            <option value="other">Other</option>
          </select><br />

          <button
            type="submit"
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
              boxShadow: "0 2px 8px rgba(123,67,151,0.08)"
            }}
          >
            Submit Poem
          </button>
        </form>
      </div>
    </div>
  );
}
