import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
// credentials se behind the seen next auth hmare liye ek 
// html form bnaega jis ke through user login krega
// isme hme ek custom method async authorize define krna pdta h
// kyuki next auth ko nhi pta ke authorize kese krna h user ko
export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
               email: { label: "Email", type: "text", },
      password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any):Promise<any>{
            // credentials.identifier.email ese access kr skte hn ise
              await dbConnect()
              try {
                // or ka mtlb koi b ek value mile to wo return kr dega
              const user=  await UserModel.findOne({
                    $or:[
                        {email:credentials.identifier},
                        {username:credentials.identifier},
                        
                    ]
                })
                 if(!user){
                    throw new Error('no user found with this email')
                 }
                    // agar verified nhi h 
                    if(!user.isVerified){
                        throw new Error('please verify your account before login')
                    }

                    // for password check yha password directly mil jata h

                   const isPasswordCorrect= await bcrypt.compare(credentials.password,user.password)
                   if(isPasswordCorrect){
                    return user
                   }else{
                    throw new Error('Incorrect Password')
                
                   }
              } catch (err:any) {
                // throw err of null return is compulsory acc to document
                 throw new Error(err)
              }
            }
        })
    ],
    // callbacks
    // user hmne upper jo return kra tha wo h yha pe
    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token._id=user._id?.toString()
                token.isVerified=user.isVerified;
                token.isAcceptingMessages=user.isAcceptingMessages;
                token.username=user.username
            }
            return token
          },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id;
                session.user.isVerified=token.isVerified
                session.user.isAcceptingMessages=token.isAcceptingMessages
                session.user.username=token.username
            }
            return session
          },
         
    },
    // pages
    pages:{
        signIn:'/sign-in'
    },
    session:{
         strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
}
