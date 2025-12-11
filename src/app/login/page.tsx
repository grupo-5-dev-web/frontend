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
import { setAuthToken } from "@/utils";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Simulação de login, validar com backend
    if (email && password) {
      // TODO: Login bem-sucedido
      setAuthToken(email);
      router.push("/");
    }
  };

  const onNavigateToRegister = () => {
    router.push("/register");
  };

  return (
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
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              />
            </div>

            <Button type="submit" className="w-full mt-8">
              <LogIn className="w-4 h-4 mr-2" />
              Entrar
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
  );
}
