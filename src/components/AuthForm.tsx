"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import Image from "next/image";
import { Form } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ApiResponse } from "../types/ApiResponse"
import { AxiosError } from "axios";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FormType } from "../types"
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, ArrowLeft } from "lucide-react";


//defining the zod schema for sign in and sign up
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, { message: "Name must atleast have 3 characters" }).max(50, { message: "Name cannot exceed the length 50" }) : z.string().optional(), //we will have the name field only in sign up form
    email: z.email({ message: "Invalid Email Address" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" }),

  })
}

//---------------------------------------------------------------------------------------------------------------------------------------------

const AuthForm = ({ type }: { type: FormType }) => {

  const formSchema = authFormSchema(type);
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })


  //here we will write the function that we want to be performed when the user submits the form
  async function onSubmit(data: z.infer<typeof formSchema>) {


    try {


      //-----------------------------------------------------------------------------------------------------------------------------
      //function for sign-up
      if (type === "sign-up") {
        setIsSubmitting(true);

        try {
          //send the data to the backend
          const response = await axios.post<ApiResponse>("/api/sign-up", data);
          console.log(response.data.message);

          toast.success("Account created successfully ,Please SignIn !!")
          router.push("/sign-in");
          console.log("Sign up credentials", data);



        } catch (error) {
          console.error("Error in signing up the user", error);
          const axiosError = error as AxiosError<ApiResponse>;
          let errorMessage = axiosError.response?.data.message;
          toast(errorMessage);
          router.push("/sign-up");
        } finally {
          setIsSubmitting(false);
        }




        //------------------------------------------------------------------------------------------------------------------

        //when the type is of sign-in

      } else {


        const result = await signIn("credentials", {
          redirect: false,
          identifier: data.email, //email is our indentifier
          password: data.password
        })
        if (result?.error) {
          toast("Login failed");
        }
        //we get sign in url after successful login
        if (result?.url) {
          toast.success("Signed in successfully!");
          router.replace("/dashboard");
        }
      }



    } catch (error) {
      console.log(error);
      toast.error(`There was an error:${error}`);
    }
  }






  //-----------------------------------------------------------------------------------------------------------------------------------------------

  //variable
  const isSignIn = type === "sign-in"
  return (

    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Back Button */}
      <Link href="/landingPage" className="absolute top-8 left-8 z-50">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm text-white transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </button>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel-strong p-8 rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              MockMate AI
            </h2>
            <p className="text-gray-400 text-sm">Smart Interview Preparation with AI</p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">

              {!isSignIn && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Enter your name" />
                </motion.div>
              )}


              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: !isSignIn ? 0.4 : 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: !isSignIn ? 0.5 : 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password" />
              </motion.div>


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: !isSignIn ? 0.6 : 0.5 }}
              >
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold py-6 rounded-xl transition-all">
                  {isSignIn ? "Sign In" : "Create an Account"}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: !isSignIn ? 0.7 : 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-black text-gray-400">Or continue with</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: !isSignIn ? 0.8 : 0.7 }}
                className="flex flex-col gap-3 w-full"
              >
                <Button
                  type="button"
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-6 transition-all"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                  <Image src="/google.svg" width={20} height={20} alt="google" className="mr-2" />
                  Sign in with Google
                </Button>

                <Button
                  type="button"
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-6 transition-all"
                  onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                >
                  <Image src="/github.svg" width={20} height={20} alt="github" className="mr-2" />
                  Sign in with GitHub
                </Button>
              </motion.div>

            </form>
          </Form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: !isSignIn ? 0.9 : 0.8 }}
            className="text-center mt-6 text-gray-400 text-sm"
          >
            {isSignIn ? "No account yet?" : "Already have an account?"}
            <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-semibold text-blue-400 hover:text-blue-300 ml-1 transition-colors">
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/10"
          >
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Shield className="w-3 h-3 text-green-400" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>Fast</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>AI-Powered</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthForm
