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

export const galleryProjectSchema = z.object({
  description: z.string().default("To be updated."),
  display_order: z.number().int().default(0),
  image_urls: z.array(z.string()).max(3).default([]),
  is_active: z.boolean().default(true),
  text_side: z.enum(["left", "right"]).optional(),
  title: z.string().trim().min(1),
});

export const officerSchema = z.object({
  display_order: z.number().int().default(0),
  image_url: z.string().default(""),
  is_active: z.boolean().default(true),
  linkedin_url: z.string().url().or(z.literal("")).default(""),
  name: z.string().trim().min(1),
  role: z.string().trim().min(1),
});

export const eventSchema = z.object({
  address: z.string(),
  created_at: firestoreDateSchema,
  description: z.string(),
  ends_at: firestoreDateSchema,
  event_id: z.string(),
  image_url: z.string().optional(),
  location_name: z.string(),
  points_value: z.string(),
  starts_at: firestoreDateSchema,
  title: z.string(),
});

const requestDateSchema = z.iso
  .datetime({ offset: true })
  .transform((value) => new Date(value));

export const createEventSchema = eventSchema
  .omit({ created_at: true })
  .extend({
    title: z.string().trim().min(1, "Title is required."),
    starts_at: requestDateSchema,
    ends_at: requestDateSchema,
    image_url: z.string().url().optional(),
  })
  .refine((event) => event.ends_at > event.starts_at, {
    message: "End time must be after start time.",
    path: ["ends_at"],
  });

export const profileSettingsSchema = z.object({
  dark: z.boolean().default(false),
  events: z.boolean().default(true),
  meetings: z.boolean().default(true),
  eventReminder: z.string().default("1 Hour"),
  meetingReminder: z.string().default("30 Minutes"),
});

export const profileSchema = z.object({
  attended_ids: z.array(z.string()).default([]),
  created_at: firestoreDateSchema.optional(),
  full_name: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  ufid: z.string().optional(),
  google_email: z.string(),
  grad_semester: z.string().default(""),
  major: z.string().default(""),
  minor: z.string().default(""),
  profilepicture_url: z.string().default(""),
  role: z.string().default("Member"),
  settings: profileSettingsSchema.optional(),
  updated_at: firestoreDateSchema.optional(),
  username: z.string().default(""),
});

export const userProfileFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().email("A valid email is required."),
  ufid: z
    .string()
    .regex(/^[0-9]{8}$/, "UFID must be 8 digits")
    .optional()
    .or(z.literal("")),
  avatar: z.string().optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
export type GalleryProject = z.infer<typeof galleryProjectSchema>;
export type Officer = z.infer<typeof officerSchema>;
export type Event = z.infer<typeof eventSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type ProfileSettings = z.infer<typeof profileSettingsSchema>;
export type UserProfileForm = z.infer<typeof userProfileFormSchema>;
