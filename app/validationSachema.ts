import { z } from "zod";

export const issueshema = z.object({
  title: z.string().min(1, "Title is requitrd").max(255),
  description: z.string().min(1, "Description is requitrd"),
});
