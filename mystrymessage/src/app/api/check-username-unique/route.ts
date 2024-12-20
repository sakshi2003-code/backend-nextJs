import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

// checking ke liye hmne zod m verifySchema likh rkha h
const UsernameQuerySchema=z.object({
    username:usernameValidation
})

// username validation 

export async function GET(request:Request) {
    await dbConnect()
    // query-localhost:3000/api/cuu?username=sakshi?phone=android
    try {
        const {searchParams}=new URL(request.url)
        const queryParam={
            username:searchParams.get('username')
        }
        // validate queryParams with zod
         const result= UsernameQuerySchema.safeParse(queryParam)
            console.log("resuslt",result); //Todo:remove
            if(!result.success){
                const usernameErrors=result.error.format().username?._errors ||[]
                return Response.json(
                    {
                    success:false,
                    message:usernameErrors?.length>0
                    ?usernameErrors.join(',')
                    :'Invalid query parameters'

                },
                {status:400})
            }

      const {username}=result.data
      const existingVerifiedUser=await UserModel.findOne({username,isVerified:true})
       if(existingVerifiedUser){
        return Response.json(
            {
            success:false,
            message:'Username is already taken'

        },
        {status:400})
       }
// if username is not exists
       return Response.json(
        {
        success:true,
        message:'Username is unique'

    },
    {status:201})


    } catch (error) {
        console.log("Error checking username",error);
        return Response.json({
            success:false,
            message:"Error checking username"
        },{status:500})
        
    }
}
