import {z} from"zod"

// identifier for email
export const messageSchema=z.object({
    content:z
    .string()
    .min(10,{message:"Content must be at least of 10 characters"})
    .min(300,{message:"Content must be no longer than 300 characters"})
   

})