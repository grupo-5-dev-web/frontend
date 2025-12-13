"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

import { login } from "@/api/user/login";
import { getCurrentUser } from "@/api/user/getCurrentUser";
import { Toast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "default" | "success" | "error"
  >("default");
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (email && password) {
      try {
        await login({ email, password });

        const userData = await getCurrentUser();
        setUser(userData);

        setToastVariant("success");
        setToastMessage("Login realizado com sucesso!");
        setToastOpen(true);
        router.push("/");
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Login failed");
        setToastVariant("error");
        setToastMessage("Falha no login. Verifique suas credenciais.");
        setToastOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onNavigateToRegister = () => {
    router.push("/register");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">RG</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-center">
              Faça login para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-8"
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="flex items-center justify-center text-sm">
                <span className="text-gray-600">Não tem uma conta? </span>
                <Button
                  type="button"
                  variant="link"
                  onClick={onNavigateToRegister}
                >
                  Cadastre-se
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Toast open={toastOpen} variant={toastVariant} message={toastMessage} />
    </>
  );
}
