import {z} from"zod"

// identifier for email
export const signInSchema=z.object({
    identifier:z.string(),
    password:z.string()

})