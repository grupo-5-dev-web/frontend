import { UUID } from "crypto";

export type UserPermissions = {
  can_book: boolean;
  can_manage_resources: boolean;
  can_manage_users: boolean;
  can_view_all_bookings: boolean;
};

export type User = {
  id?: UUID;
  tenant_id?: UUID;
  name: string;
  email: string;
  phone: string;
  password: string;
  user_type?: "admin" | "user";
  department?: string;
  is_active?: boolean;
  permissions?: UserPermissions;
  created_at?: string;
  updated_at?: string;
};

export type Login = Pick<User, "email" | "password">;

export type Tenant = {
  name: string;
  domain: string;
  logo_url: string;
  theme_primary_color: string;
  plan: "basico" | "profissional";
  settings: {
    business_type: string;
    timezone?: string;
    working_hours_start: string;
    working_hours_end: string;
    booking_interval?: number;
    advance_booking_days?: number;
    cancellation_hours?: number;
    custom_labels: {
      resource_singular: string;
      resource_plural: string;
      booking_label: string;
      user_label: string;
    };
  };
  is_active?: true;
};

export type Category = {
  id?: UUID;
  tenant_id?: UUID;
  name: string;
  description: string;
  type: "fisico" | "humano";
  icon?: string;
  color?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ResourceSchedule = Record<
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday",
  string[]
>;

export type Resource = {
  id?: UUID;
  tenant_id?: UUID;
  category_id?: UUID;
  name: string;
  description: string;
  type: string;
  status?: "disponivel" | "indisponivel" | "manutencao";
  capacity: number;
  location?: string;
  availability_schedule?: ResourceSchedule;
  image_url?: string;
  category?: Category;
  created_at?: string;
  updated_at?: string;
};

export type Booking = {
  id?: UUID;
  tenant_id?: UUID;
  resource_id: UUID;
  user_id: string;
  start_time: string;
  end_time: string;
  notes?: string;
  status?: "pendente" | "confirmado" | "cancelado";
  created_at?: string;
  updated_at?: string;
};
