import NextAuth  from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            id:string
            name:string
            email:string
            image?:string|null
        }
    }


    interface User{
        id:string
            name:string
            email:string
            image?:string|null
    }

}

declare module "next-auth/jwt" {
    interface JWT{
        id:string
    }
}



