import {z} from 'zod'

export const usernameValidation=z
.string()
.min(2,"Username must be atleast 2 characters")
.max(20,"Username must no more than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special  characters")

// validation for signup
// yha hme ek se jayda chize check krni h isliye object ka use kra
export const signUpSchema=z.object({
username: usernameValidation,
email:z.string().email({message:'Invalid email address'}),
password:z.string().min(6,"password must be at least 6 characters")
})
