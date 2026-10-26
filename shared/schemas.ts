import { z } from "zod";

const firestoreDateSchema = z.date();

export const resourceSchema = z.object({
  category: z.string(),
  description: z.string(),
  is_active: z.boolean(),
  provider: z.string(),
  title: z.string(),
  url: z.string(),
});

export const eventSchema = z.object({
  address: z.string(),
  created_at: firestoreDateSchema,
  description: z.string(),
  ends_at: firestoreDateSchema,
  event_id: z.string(),
  location_name: z.string(),
  points_value: z.string(),
  starts_at: firestoreDateSchema,
  title: z.string(),
});

export const profileSchema = z.object({
  attended_ids: z.array(z.string()),
  created_at: firestoreDateSchema,
  full_name: z.string(),
  google_email: z.string(),
  grad_semester: z.string(),
  major: z.string(),
  minor: z.string(),
  profilepicture_url: z.string(),
  role: z.string(),
  updated_at: firestoreDateSchema,
  username: z.string(),
});

export type Resource = z.infer<typeof resourceSchema>;
export type Event = z.infer<typeof eventSchema>;
export type Profile = z.infer<typeof profileSchema>;
