// import { prisma } from "@/lib/prisma"
// import { NextResponse } from "next/server"
// import { compare } from "bcrypt"

// export async function POST(req: Request) {
//   const body = await req.json()
//   const { email, password } = body

//   if (!email || !password) {
//     return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
//   }

//   const user = await prisma.user.findUnique({
//     where: { email },
//   })

//   if (!user) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
//   }

//   const passwordMatch = await compare(password, user.password)

//   if (!passwordMatch) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
//   }

//   // Success - user is authenticated
//   return NextResponse.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } }, { status: 200 })
// }