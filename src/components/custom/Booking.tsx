import { Booking as BookingType } from "@/api/booking/create";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type BookingProps = {
  booking: BookingType & { id: string };
};

// TODO: Fix display of booking details
const Booking = ({ booking }: BookingProps) => {
  return (
    <Card key={booking.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-gray-900 font-bold">{booking.userId || "User"}</p>
          <p className="text-sm text-gray-600">
            {booking.startTime || "HH:mm"} - {booking.endTime || "HH:mm"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          {booking.resourceId || "resource"}
        </p>
      </CardContent>
    </Card>
  );
};

export { Booking };
