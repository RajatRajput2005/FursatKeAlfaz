"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
 

export default function Navbar() {



    
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    router.push("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 5vw",
        background: "linear-gradient(90deg, #f3e7e9 0%, #e3eeff 100%)",
        borderBottom: "1.5px solid #e0c3fc",
        boxShadow: "0 2px 12px 0 rgba(123,67,151,0.06)",
        fontFamily: "'Merriweather', serif",
        flexWrap: "wrap",
        position: "relative",
        zIndex: 100,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        minWidth: 0,
        flex: "1 1 0%",
      }}>
        {/* Pen and ink box icon (SVG) instead of image */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "44px",
            width: "44px",
            marginRight: "14px",
            borderRadius: "8px",
            background: "#f3e7e9",
            boxShadow: "0 2px 8px rgba(123,67,151,0.08)"
          }}
        >
          {/* Simple pen and ink SVG icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="18" width="24" height="8" rx="2" fill="#7b4397" />
            <path d="M7 17L21 3" stroke="#dc2430" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M19 5L23 9" stroke="#dc2430" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="21" cy="3" r="2" fill="#dc2430" />
          </svg>
        </span>
        <Link
          href="/"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#7b4397",
            fontFamily: "'Dancing Script', cursive",
            letterSpacing: "1px"
          }}
        >
          FursatKeAlfaz
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <Link
          href="/poems"
          style={{
            margin: "0 12px",
            color: "#dc2430",
            fontWeight: "bold",
            fontSize: "1.08rem",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          All Poems
        </Link>
        <Link
          href="/explore"
          style={{
            margin: "0 12px",
            color: "#7b4397",
            fontWeight: "bold",
            fontSize: "1.08rem",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          Explore
        </Link>
        <Link
          href="/create-poem"
          style={{
            margin: "0 12px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "1.08rem",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          Create
        </Link>
        <Link
          href="/my-poems"
          style={{
            margin: "0 12px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "1.08rem",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          My Poems
        </Link>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "18px",
            cursor: "pointer",
            padding: "7px 18px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(90deg, #dc2430 0%, #7b4397 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 2px 8px rgba(123,67,151,0.08)",
            transition: "background 0.2s"
          }}
        >
          Logout
        </button>
      </div>
      <style>{`
        @media (max-width: 900px) {
          nav {
            flex-direction: column;
            align-items: stretch !important;
            padding: 10px 2vw !important;
          }
          nav > div {
            justify-content: center !important;
            margin-bottom: 8px;
          }
        }
        @media (max-width: 600px) {
          nav {
            padding: 8px 1vw !important;
          }
          nav > div {
            flex-direction: column !important;
            align-items: center !important;
            margin-bottom: 0 !important;
          }
          nav a, nav button {
            font-size: 0.98rem !important;
            padding: 6px 10px !important;
            margin: 4px 0 !important;
          }
          nav span {
            height: 36px !important;
            width: 36px !important;
            margin-right: 8px !important;
          }
        }
      `}</style>
    </nav>
  );
}
