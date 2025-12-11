"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: { name: string; email: string; password: string }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onOpenChange,
  onAddUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onAddUser({ name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
          <DialogTitle className="text-xl mb-2">Adicionar Usuário</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mb-4">
            Preencha as informações do novo usuário
          </DialogDescription>
          <DialogClose asChild>
            <Button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="user-name" className="text-sm">
                  Nome
                </Label>
                <Input
                  id="user-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email" className="text-sm">
                  Email
                </Label>
                <Input
                  id="user-email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="usuario@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-password" className="text-sm">
                  Senha
                </Label>
                <Input
                  id="user-password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export { AddUserModal };
