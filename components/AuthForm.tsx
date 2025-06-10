"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import axios from "axios"
import FormField from "./FormField"

import FormRadioGroup from "./FormRadioGroup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useProfileStore } from "@/hooks/use-modal-store"
 

type FormType = "signin" | "signup";

interface AuthFormProps {
  type: FormType
}


const Authform = ({type}:AuthFormProps) => {
  const {setProfile} = useProfileStore();

  const formSchema = z.object({
    name: type === "signup" ? z.string().min(3) : z.string().optional(),
    role:  type === "signup" ? z.string().optional() : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })

  const router = useRouter()

  console.log(type, "type")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          role: ""
        },
      })

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        if(type === "signup"){
          const { name, email, password, role } = values;
          
          const userCredentials = {
            name, email, password, role
          }

          const res = await axios.post("/api/profile", userCredentials)
          console.log(res, "work")

          toast.success("Profile created")
          router.push("/signin")
        } else {
          const {email, password} = values;

          const userCredentials = {
            email, password,
          }

          const res = await axios.post("/api/profile/signin", userCredentials)
          console.log(res)
          setProfile(res.data)
          toast.success("Welcome Back")
          router.push("/")
        }
      }

      const isSignIn = type === "signin";

    return (
        <div className="border border-gradient p-0.5 rounded-2xl w-fit lg:min-w-[566px]"> 
           <div className="flex flex-col gap-6 dark-gradient rounded-2xl min-h-full py-14 px-10">
           <div className="flex flex-row gap-2 justify-center">
          <h2 className="text-primary-100 uppercase">Welcome to QuizFlick</h2>
        </div>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 mt-4 form"
      >
    {!isSignIn && (
      <div className="flex items-center gap-16">
      <FormField
        control={form.control}
        name="name"
        label="Name"
        placeholder="Your Name"
        type="text"
      />

      <FormRadioGroup
       control={form.control}
       name="role"
       label="I am a"
       options={[
         { label: "Teacher", value: "teacher" },
         { label: "Student", value: "student" },
       ]}
      />
      
     </div>
    )}

    <FormField
      control={form.control}
      name="email"
      label="Email"
      placeholder="Your email address"
      type="email"
    />

    <FormField
      control={form.control}
      name="password"
      label="Password"
      placeholder="Enter your password"
      type="password"
    />

    <Button className="btn">
      {isSignIn ? "Sign In" : "Create an Account"}
    </Button>
        </form>
        </Form>
           </div>
        </div>
    )
}

export default Authform;