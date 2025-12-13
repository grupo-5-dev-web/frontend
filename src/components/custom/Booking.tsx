import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Booking as BookingType, Resource, User } from "@/api/types";
import { getUser } from "@/api/user/getUser";

import { format } from "date-fns";
import { getResource } from "@/api/resource/getResource";

type BookingProps = {
  booking: BookingType;
};

const Booking: React.FC<BookingProps> = ({ booking }) => {
  const [user, setUser] = useState<User>();
  const [resource, setResource] = useState<Resource>();

  useEffect(() => {
    getUser(booking.user_id).then(setUser).catch(console.error);
    getResource(booking.resource_id).then(setResource).catch(console.error);
  }, [booking.user_id, booking.resource_id]);

  const formatTime = (date: string) => {
    const formattedTime = format(date, "HH:mm");
    return formattedTime;
  };

  return (
    <Card key={booking.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-gray-900 font-bold">{user?.name || "–"}</p>
          <p className="text-sm text-gray-600">
            {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{resource?.name || "–"}</p>
      </CardContent>
    </Card>
  );
};

export { Booking };
