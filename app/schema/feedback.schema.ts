import { z } from "zod";

export const feedbackSchema = z.object({
  title: z.string().min(3, { message: "Title can't be empty" }),
  description: z.string().min(1, { message: "Add Description" }),
  status: z.enum(["Public", "Private"], {
    message: "Status must be either Public or Private",
  }),
  tags: z.array(z.string()).min(1, { message: "Please add at least one tag" }),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
