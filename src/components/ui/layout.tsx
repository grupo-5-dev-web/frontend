"use client";

import { Button } from "./button";
import { ClockFading } from "lucide-react";

import { logout } from "@/api/user/logout";

import { useRouter, usePathname } from "next/navigation";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const activePath = pathname.split("/")[1];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <ClockFading />
                <h1 className="text-gray-900">Chronos</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={activePath === "" ? "default" : "ghost"}
                  onClick={() => router.push("/")}
                >
                  Dashboard
                </Button>
                <Button
                  variant={activePath === "users" ? "default" : "ghost"}
                  onClick={() => router.push("/users")}
                >
                  Usuários
                </Button>
                <Button
                  variant={activePath === "resources" ? "default" : "ghost"}
                  onClick={() => router.push("/resources")}
                >
                  Recursos
                </Button>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export { Layout };
