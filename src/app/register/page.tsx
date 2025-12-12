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
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { create } from "@/api/user/create";
import { Toast } from "@/components/ui/toast";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "default" | "success" | "error"
  >("default");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      create({ name, phone, email, password })
        .then(() => {
          setToastOpen(true);
          setToastVariant("success");
          router.push("/login");
        })
        .catch((error) => {
          setToastOpen(true);
          setToastVariant("error");
          console.error(error);
        });
    }
  };

  const onNavigateToLogin = () => {
    router.push("/");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">RG</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Criar conta</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
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
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="(XX) XXXXX-XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500">Mínimo de 6 caracteres</p>
              </div>

              <Button type="submit" className="w-full mt-8">
                <UserPlus className="w-4 h-4 mr-2" />
                Cadastrar
              </Button>

              <div className="flex items-center justify-center text-sm">
                <span className="text-gray-600">Já tem uma conta? </span>
                <Button
                  type="button"
                  variant="link"
                  onClick={onNavigateToLogin}
                >
                  Faça login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Toast
        open={toastOpen}
        variant={toastVariant}
        message="Usuário cadastrado com sucesso!"
      />
    </>
  );
}
