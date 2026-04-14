import { z } from 'zod'

export const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[0-9+\s()-]+$/, 'Invalid phone number'),
  participantType: z.enum(['single', 'facilitator', 'minister', 'guest'], { message: 'Participant type is required' }),
  title: z.string().optional(),
  designation: z.string().optional(),
  isNonCOP: z.boolean().default(false),
})

export const step2Schema = z.object({
  venue: z.enum(['PCC', 'KNUST'], { message: 'Please select a venue' }),
})

export const registrationSchema = step1Schema.merge(step2Schema).extend({
  region: z.string().default('Central'),
  area: z.string().default('Assin Fosu'),
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type RegistrationData = z.infer<typeof registrationSchema>
