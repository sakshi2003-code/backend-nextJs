import {z} from"zod"

// identifier for email
export const acceptMessagesSchema=z.object({
    acceptMessages:z.boolean(),
   

})