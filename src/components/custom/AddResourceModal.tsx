"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Category, Resource } from "@/api/types";

import { useState } from "react";

interface AddResourceModalProps {
  open: boolean;
  isEditing?: Resource | null;
  types?: Category[];
  onOpenChange: (open: boolean) => void;
  onAddResource: (resource: Resource) => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({
  open,
  isEditing,
  types,
  onOpenChange,
  onAddResource,
}) => {
  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [resourceCapacity, setResourceCapacity] = useState(0);
  const [resourceStatus, setResourceStatus] =
    useState<Resource["status"]>("disponivel");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resourceName) {
      onAddResource({
        name: resourceName,
        description: resourceDescription,
        type: resourceType,
        capacity: resourceCapacity,
        status: resourceStatus,
      });
      setResourceName("");
      setResourceDescription("");
      setResourceType("");
      setResourceCapacity(0);
      setResourceStatus("disponivel");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
          <DialogTitle className="text-xl">
            {isEditing ? "Editar Recurso" : "Adicionar Recurso"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mb-4">
            {isEditing
              ? "Atualize as informações do recurso"
              : "Preencha as informações do novo recurso"}
          </DialogDescription>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="resource-name" className="text-sm">
                  Nome do Recurso *
                </Label>
                <Input
                  id="resource-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Sala de Reunião A"
                  value={resourceName}
                  onChange={(e) => setResourceName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-description" className="text-sm">
                  Descrição
                </Label>
                <Input
                  id="resource-description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Localizada no 2º andar, 25m²"
                  value={resourceDescription}
                  onChange={(e) => setResourceDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-type" className="text-sm">
                  Tipo de Recurso *
                </Label>
                <Select
                  value={resourceType}
                  disabled={!types?.length}
                  onValueChange={setResourceType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>

                  {!!types?.length && (
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.id} value={type.id as string}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-capacity" className="text-sm">
                  Quantidade
                </Label>
                <Input
                  id="resource-capacity"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 1"
                  value={resourceCapacity}
                  onChange={(e) =>
                    setResourceCapacity(parseInt(e.target.value))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-status" className="text-sm">
                  Status
                </Label>
                <Select
                  value={resourceStatus}
                  onValueChange={(value) =>
                    setResourceStatus(value as Resource["status"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="disponivel">Disponível</SelectItem>
                    <SelectItem value="indisponivel">Indisponível</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-8">
              <Button type="button" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {isEditing ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export { AddResourceModal };
