import { ShippingAddress } from "./order";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  addresses?: ShippingAddress[];
  wishlistIds?: string[];
  role?: "customer" | "admin";
  createdAt?: string;
}
