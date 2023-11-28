import { z } from "zod";

export const issueshema = z.object({
  title: z.string().min(1, "Title is requirrd1.").max(255),
  description: z.string().min(1, "Description is requirrd."),
});
export const patchissueschema = z.object({
  title: z.string().min(1,"Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is requirrd.")
    .max(65535)
    .optional(),
    assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
