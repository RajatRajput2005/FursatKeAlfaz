"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditPoemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [poem, setPoem] = useState({ title: "", content: "", category: "" });

  useEffect(() => {
    const fetchPoem = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/poem/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPoem(res.data.poem);
    };
    fetchPoem();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      "/api/poem",
      { poemId: id, title: poem.title, content: poem.content, category: poem.category },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Poem Updated Successfully");
    router.push("/my-poems");
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
          padding: "38px 32px 32px 32px",
          maxWidth: "420px",
          width: "100%",
          border: "1px solid #e0c3fc",
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2rem",
            color: "#7b4397",
            marginBottom: "18px",
            letterSpacing: "1px",
            textAlign: "center",
          }}
        >
          Edit Shayari
        </h1>
        <input
          value={poem.title}
          onChange={(e) => setPoem({ ...poem, title: e.target.value })}
          placeholder="Title"
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "1px solid #d1c4e9",
            fontSize: "1rem",
            outline: "none",
            background: "#f3e7e9",
          }}
        />
        <textarea
          value={poem.content}
          onChange={(e) => setPoem({ ...poem, content: e.target.value })}
          placeholder="Content"
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
            resize: "vertical",
          }}
        />
        <select
          value={poem.category}
          onChange={(e) => setPoem({ ...poem, category: e.target.value })}
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "10px 0 18px 0",
            borderRadius: "8px",
            border: "1px solid #d1c4e9",
            fontSize: "1rem",
            background: "#f3e7e9",
          }}
        >
          <option value="">Select Category</option>
          <option value="sad">Sad</option>
          <option value="love">Love</option>
          <option value="romantic">Romantic</option>
          <option value="motivational">Motivational</option>
          <option value="adults">Adults</option>
          <option value="other">Other</option>
        </select>
        <button
          onClick={handleUpdate}
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
            boxShadow: "0 2px 8px rgba(123,67,151,0.08)",
            marginTop: "10px",
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
