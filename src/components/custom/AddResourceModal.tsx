"use client";

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddResource: (resource: {
    name: string;
    type: string;
    quantity: number;
  }) => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({
  open,
  onOpenChange,
  onAddResource,
}) => {
  const [resourceName, setResourceName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [resourceQuantity, setResourceQuantity] = useState(0);

  const editingResource = false; // Placeholder for edit mode

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resourceName && resourceType && resourceQuantity) {
      onAddResource({
        name: resourceName,
        type: resourceType,
        quantity: resourceQuantity,
      });
      setResourceName("");
      setResourceType("");
      setResourceQuantity(0);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
          <DialogTitle className="text-xl mb-2">
            {editingResource ? "Editar Recurso" : "Adicionar Recurso"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mb-4">
            {editingResource
              ? "Atualize as informações do recurso"
              : "Preencha as informações do novo recurso"}
          </DialogDescription>
          <DialogClose asChild>
            <Button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="resource-name" className="text-sm">
                  Nome do Recurso
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
                <Label htmlFor="resource-type" className="text-sm">
                  Tipo de Recurso
                </Label>
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="sala">Sala</SelectItem>
                    <SelectItem value="equipamento">Equipamento</SelectItem>
                    <SelectItem value="veiculo">Veículo</SelectItem>
                    <SelectItem value="ferramenta">Ferramenta</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-quantity" className="text-sm">
                  Quantidade
                </Label>
                <Input
                  id="resource-quantity"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 1"
                  value={resourceQuantity}
                  onChange={(e) =>
                    setResourceQuantity(parseInt(e.target.value))
                  }
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
                {editingResource ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export { AddResourceModal };
