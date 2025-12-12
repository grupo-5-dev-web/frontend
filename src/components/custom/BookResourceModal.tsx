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

import { Resource } from "@/api/resource/create";
import { list as listResources } from "@/api/resource/list";
import { Booking } from "@/api/booking/create";

import { useEffect, useState } from "react";

interface BookResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookResource: (booking: Booking) => void;
}

const BookResourceModal: React.FC<BookResourceModalProps> = ({
  open,
  onOpenChange,
  onBookResource,
}) => {
  const [availableResources, setAvailableResources] = useState<Resource[]>([]);

  const [resource, setResource] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    listResources()
      .then(setAvailableResources)
      .catch((error) => {
        console.error(error);
        setAvailableResources([]);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resource && startTime && endTime) {
      onBookResource({
        resourceId: resource,
        userId: "",
        startTime,
        endTime,
        notes,
      });
      setResource("");
      setStartTime("");
      setEndTime("");
      setNotes("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
          <DialogTitle className="text-xl">Reservar Recurso</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mb-4">
            Escolha um recurso e reserve-o para o seu uso (sujeito à
            disponibilidade)
          </DialogDescription>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="booking-resource-name" className="text-sm">
                  Recurso *
                </Label>
                <Select
                  value={resource}
                  disabled={!availableResources?.length}
                  onValueChange={setResource}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o recurso" />
                  </SelectTrigger>

                  {!!availableResources?.length && (
                    <SelectContent>
                      {availableResources.map((resource) => (
                        <SelectItem key={resource.id} value={resource.id}>
                          {resource.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Agendamento *</p>
                <div className="flex gap-4 justify-between">
                  <div className="space-y-2">
                    <Label
                      htmlFor="booking-resource-scheduling-start"
                      className="text-sm"
                    >
                      Início
                    </Label>
                    <Input
                      id="booking-resource-scheduling"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="00:00"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="booking-resource-scheduling-start"
                      className="text-sm"
                    >
                      Fim
                    </Label>
                    <Input
                      id="booking-resource-scheduling"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="23:59"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
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
                Reservar
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export { BookResourceModal };
