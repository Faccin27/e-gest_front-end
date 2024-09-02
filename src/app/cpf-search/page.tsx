"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CPFConsultationPage from "@/components/CPFConsultationPage";
import { checkUserLoggedIn } from "@/utils/checkUserLoggedIn";

export default function UsersPage() {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await checkUserLoggedIn();
      if (!userLoggedIn) {
        router.push("/login");
      } else {
        setIsCheckingLogin(false);
      }
    };

    checkLoginStatus();
  }, [router]);

  if (isCheckingLogin) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900 text-white font-bold">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800">
          <div className="container mx-auto px-6 py-8">
            <CPFConsultationPage />
          </div>
        </main>
      </div>
    </div>
  );
}
