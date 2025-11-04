import { z } from "zod"

export const registrationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  eventId: z.string().min(1)
})
export type RegistrationForm = z.infer<typeof registrationSchema>
