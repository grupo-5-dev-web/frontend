import { Booking as BookingType } from "@/api/booking/create";
import { getUser } from "@/api/user/getUser";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

type BookingProps = {
  booking: BookingType & { id: string };
};

// TODO: Fix display of booking details
const Booking = ({ booking }: BookingProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(booking.userId)
      .then(setUser)
      .catch((error) => {
        console.error(error);
      });
  }, [booking.userId]);

  return (
    <Card key={booking.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-gray-900 font-bold">{user?.name || "user name"}</p>
          <p className="text-sm text-gray-600">
            {booking.startTime || "HH:mm"} - {booking.endTime || "HH:mm"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          {booking.resourceId || "resource name"}
        </p>
      </CardContent>
    </Card>
  );
};

export { Booking };
