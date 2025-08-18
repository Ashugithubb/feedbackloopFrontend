import { z } from "zod";

export const disableUserSchema = z.object({
    userName: z.string().min(3, { message: "User name can't be empty" })
});