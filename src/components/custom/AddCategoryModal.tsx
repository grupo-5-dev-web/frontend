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
import Color from "colorjs.io";

import { Category } from "@/api/category/create";

import { useState } from "react";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCategory: (category: Category) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onOpenChange,
  onAddCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryType, setCategoryType] = useState<Category["type"] | null>();
  const [categoryColor, setCategoryColor] = useState("#155dfc");

  const getExampleBackgroundColor = (color: string) => {
    const parsedColor = new Color(color);
    parsedColor.alpha = 0.25;
    return parsedColor.toString({ format: "hex" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName && categoryType) {
      onAddCategory({
        name: categoryName,
        description: categoryDescription,
        type: categoryType,
        color: categoryColor,
      });
      setCategoryName("");
      setCategoryDescription("");
      setCategoryType(null);
      setCategoryColor("#155dfc");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
          <DialogTitle className="text-xl">Adicionar Categoria</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mb-4">
            Preencha as informações da nova categoria
          </DialogDescription>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name" className="text-sm">
                  Nome da Categoria *
                </Label>
                <Input
                  id="category-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Portáteis"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-description" className="text-sm">
                  Descrição
                </Label>
                <Input
                  id="category-description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Identifica os dispositivos portáteis como laptops e tablets"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-type" className="text-sm">
                  Tipo de Recurso
                </Label>
                <Select
                  value={categoryType as string}
                  onValueChange={(value) =>
                    setCategoryType(value as Category["type"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="fisico">Equipamento</SelectItem>
                    <SelectItem value="humano">Humano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-color" className="text-sm">
                  Cor
                </Label>

                <div className="flex gap-4 items-center">
                  <Input
                    id="category-color"
                    type="color"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={categoryColor}
                    onChange={(e) => {
                      const parsedColor = new Color(e.target.value);
                      setCategoryColor(parsedColor.toString({ format: "hex" }));
                    }}
                  />
                  <span
                    className={`px-2 py-1 rounded-md text-xs`}
                    style={{
                      backgroundColor: getExampleBackgroundColor(categoryColor),
                      color: categoryColor,
                    }}
                  >
                    exemplo
                  </span>
                </div>
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
                Adicionar
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export { AddCategoryModal };
