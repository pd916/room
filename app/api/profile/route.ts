import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req:Request){
    const {name, role, email, password} = await req.json()
    console.log(name, role, email, password, "amaz")

        try {
            if (!name || !role || !email || !password) {
                return NextResponse.json("all fields are required", { status: 400 });
            }
            
            const userExist = await db.profile.findFirst({
                where:{
                    email:email,
                    role:role
                }
            })
            
            if(userExist){
                return NextResponse.json("user already exist", { status: 400 });
            }

            const hashPassword = await bcrypt .hashSync(password, 10)

             await db.profile.create({
                data:{
                    name,
                    email,
                    role,
                    password: hashPassword
                }
            })

            return NextResponse.json("Profile created", {status: 200})
        } catch (error) {
            console.log(error.stack, "ss")
            return NextResponse.json("Something went wrong", {status: 500})
        }

    }