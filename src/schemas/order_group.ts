import { z } from "zod";

export const OrderGroupSchema = z.object({
  shipperId: z.string().uuid("Shipper ID is required"),
  location: z.string().min(1, "Location is required"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
});
