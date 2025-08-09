import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  })

  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  const hashed = await hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  })
 
  return NextResponse.json({ message: "User created", user }, { status: 201 })
}