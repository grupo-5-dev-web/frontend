"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddCategoryModal } from "@/components/custom/AddCategoryModal";
import { AddResourceModal } from "@/components/custom/AddResourceModal";
import { Pencil, ClipboardClock } from "lucide-react";

import { Category, create as createCategory } from "@/api/category/create";
import { list as listCategories } from "@/api/category/list";
import { Resource, create as createResource } from "@/api/resource/create";
import { list as listResources } from "@/api/resource/list";

import { useEffect, useState } from "react";
import { Toast } from "@/components/ui/toast";

type CategoryWithId = Category & { id: string };

export default function ResourcesPage() {
  const [categories, setCategories] = useState<CategoryWithId[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "default" | "success" | "error"
  >("default");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch((error) => {
        console.error(error);
      });

    listResources()
      .then(setResources)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddCategory = (newCategory: Category) => {
    createCategory(newCategory)
      .then((createdCategory) => {
        setCategories((prevCategories) => [...prevCategories, createdCategory]);
        setToastVariant("success");
        setToastMessage("Categoria adicionada com sucesso!");
        setToastOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setToastVariant("error");
        setToastMessage("Falha ao adicionar categoria");
        setToastOpen(true);
      });
    setIsCategoryModalOpen(false);
  };

  const handleAddResource = (newResource: Resource) => {
    createResource(newResource)
      .then((createdResource) => {
        setResources((prevResources) => [...prevResources, createdResource]);
        setToastVariant("success");
        setToastMessage("Recurso adicionado com sucesso!");
        setToastOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setToastVariant("error");
        setToastMessage("Falha ao adicionar recurso");
        setToastOpen(true);
      });
    setIsResourceModalOpen(false);
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
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

          <div className="flex gap-2">
            <Button onClick={() => setIsCategoryModalOpen(true)}>
              Adicionar Categoria
            </Button>
            <Button onClick={() => setIsResourceModalOpen(true)}>
              Adicionar Recurso
            </Button>
          </div>
        </div>

        {resources.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Card key={resource.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg">{resource.name}</h3>
                    <Button onClick={() => handleEditResource(resource)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <hr />

                <CardContent>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Tipo:</p>
                      <span>{resource.description}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Quantidade:</p>
                      <p className="text-gray-900">{resource.capacity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <ClipboardClock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">Nenhum recurso cadastrado ainda</p>
                <p className="text-sm">
                  Use o botão &quot;Adicionar Recurso&quot; para começar
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <AddCategoryModal
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        onAddCategory={handleAddCategory}
      />

      <AddResourceModal
        open={isResourceModalOpen}
        isEditing={editingResource}
        types={categories}
        onOpenChange={setIsResourceModalOpen}
        onAddResource={handleAddResource}
      />

      <Toast open={toastOpen} variant={toastVariant} message={toastMessage} />
    </>
  );
}
