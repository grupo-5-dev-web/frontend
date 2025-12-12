import { Booking as BookingType } from "@/api/booking/create";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type BookingProps = {
  booking: BookingType & { id: string };
};

const Booking = ({ booking }: BookingProps) => {
  return (
    <Card key={booking.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-gray-900">{booking.userId}</p>
          <p className="text-sm text-gray-600">
            {booking.startTime} - {booking.endTime}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{booking.resourceId}</p>
      </CardContent>
    </Card>
  );
};

export { Booking };
