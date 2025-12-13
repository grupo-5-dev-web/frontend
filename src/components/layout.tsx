"use client";

import { Button } from "./ui/button";
import { ClockFading } from "lucide-react";

import { logout } from "@/api/user/logout";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useUser } from "@/contexts/UserContext";

import { Tenant } from "@/api/types";
import { getTenant } from "@/api/tenant/getTenant";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const activePath = pathname.split("/")[1];

  const { userState: user } = useUser();

  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    if (user) {
      getTenant(user.tenant_id).then(setTenant).catch(console.error);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <ClockFading />

                <div className="flex flex-col">
                  <h1 className="text-2xl text-gray-900 font-semibold">
                    Chronos
                  </h1>
                  {tenant && (
                    <span className="text-sm text-gray-500 font-medium">
                      /{tenant.name}
                    </span>
                  )}
                </div>
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
