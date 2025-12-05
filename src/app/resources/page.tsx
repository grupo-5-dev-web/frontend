"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { AddResourceModal } from "@/components/custom/AddResourceModal";

import { useState } from "react";

interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([
    { id: "1", name: "Sala de Reunião A", type: "sala", quantity: 1 },
    { id: "2", name: "Projetor Multimídia", type: "equipamento", quantity: 3 },
    { id: "3", name: "Notebook Dell XPS", type: "equipamento", quantity: 5 },
  ]);

  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      sala: "Sala",
      equipamento: "Equipamento",
      veiculo: "Veículo",
      ferramenta: "Ferramenta",
      outro: "Outro",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      sala: "bg-blue-100 text-blue-800",
      equipamento: "bg-purple-100 text-purple-800",
      veiculo: "bg-green-100 text-green-800",
      ferramenta: "bg-orange-100 text-orange-800",
      outro: "bg-gray-100 text-gray-800",
    };
    return colors[type] || colors.outro;
  };

  const handleAddResource = (newResource: {
    name: string;
    type: string;
    quantity: number;
  }) => {
    setResources([...resources, { id: crypto.randomUUID(), ...newResource }]);
    setIsResourceModalOpen(false);
  };

  const handleEditResource = (resource: Resource) => {
    setIsResourceModalOpen(true);
  };

  return (
    <>
      <div>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="mb-2">Recursos</h1>
            <p className="text-gray-600">
              Gerencie todos os recursos disponíveis
            </p>
          </div>
          <Button
            onClick={() => setIsResourceModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Adicionar Recurso
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg">{resource.name}</h3>
                <Button
                  onClick={() => handleEditResource(resource)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tipo:</span>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${getTypeColor(
                        resource.type
                      )}`}
                    >
                      {getTypeLabel(resource.type)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantidade:</span>
                    <span className="text-gray-900">{resource.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddResourceModal
        open={isResourceModalOpen}
        onOpenChange={setIsResourceModalOpen}
        onAddResource={handleAddResource}
      />
    </>
  );
}
