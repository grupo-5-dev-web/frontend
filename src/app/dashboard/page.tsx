"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/custom/DatePicker";
import { Toast } from "@/components/ui/toast";
import { BookResourceModal } from "@/components/custom/BookResourceModal";
import { Booking as BookingItem } from "@/components/custom/Booking";
import { SearchSlash } from "lucide-react";

import { create as createBooking } from "@/api/booking/create";
import { list as listBookings } from "@/api/booking/list";
import { Booking } from "@/api/types";

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "default" | "success" | "error"
  >("default");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    listBookings().then(setBookings).catch(console.error);
  }, []);

  const handleBooking = (newBooking: Booking) => {
    createBooking(newBooking)
      .then(() => {
        setToastVariant("success");
        setToastMessage("Reserva efetuada com sucesso!");
        setToastOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setToastVariant("error");
        setToastMessage("Falha ao reservar recurso");
        setToastOpen(true);
      });
    setIsBookingModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Visão geral do sistema de gerenciamento de recursos
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setIsBookingModalOpen(true)}>
              Reservar Recurso
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Total de Recursos Disponíveis
                  </p>
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl">24</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600">
                    Total de Agendamentos Hoje
                  </h3>
                  <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600">
                    Recursos Disponíveis Agora
                  </h3>
                  <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl">18</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3>Agendamentos de Hoje</h3>
            <p className="text-sm text-gray-500">
              Selecione uma data para visualizar agendamentos
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DatePicker />

              {!!bookings.length ? (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <Card className="flex items-center justify-center">
                  <CardContent className="py-12">
                    <div className="text-center text-gray-500">
                      <SearchSlash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Nenhuma reserva encontrada</p>
                      <p className="text-sm">
                        Use o botão &quot;Reservar Recurso&quot; para começar
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookResourceModal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        onBookResource={handleBooking}
      />

      <Toast open={toastOpen} variant={toastVariant} message={toastMessage} />
    </>
  );
}
