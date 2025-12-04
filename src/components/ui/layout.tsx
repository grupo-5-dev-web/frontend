"use client";

import { useRouter, usePathname } from "next/navigation";
import { removeAuthToken } from "@/utils";

import { Button } from "./button";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const activePath = pathname.split("/")[1];

  const handleLogout = () => {
    removeAuthToken();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white">RG</span>
                </div>
                <span className="text-gray-900">Resource Manager</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => router.push("/")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activePath === ""
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={() => router.push("/users")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activePath === "users"
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Usuários
                </Button>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
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
