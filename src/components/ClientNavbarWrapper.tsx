"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientNavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
