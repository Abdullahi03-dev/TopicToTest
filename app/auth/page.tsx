"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Mail, Lock, User, ArrowLeft } from "lucide-react"
import {FcGoogle} from 'react-icons/fc'
import {signIn,useSession} from "next-auth/react"
// import Link from "next/link"
// import { signIn } from "next-auth/react";
import {toast} from 'react-hot-toast'
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthPage() {
  const {status} =useSession()
  const params=useSearchParams()
  const [signUpLoading, setSignUpLoading] = useState(false)
  const [signInLoading, setSignInLoading] = useState(false)
  const [signupForm,setSignupForm]=useState({name:'',email:'',password:''})
  const [signInForm,setSignInForm]=useState({email:'',password:''})
  const [googleLoading,setGoogleLoader]=useState(false)

  const router = useRouter()

  useEffect(()=>{
    if(status==='authenticated'){
      toast.success('Google Sign-In Successfully')
      const time=setTimeout(()=>{
        router.push('/dashboard')
      },2000)
      return ()=>clearTimeout(time)
    }
  },[status,router])
  const handleGoogleSignup=()=>{
    setGoogleLoader(true)
    signIn("google",{callbackUrl:'/google-login'})
  }



  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInLoading(true)
    console.log(JSON.stringify(signInForm))
    const res = await signIn("credentials", {
      redirect:false,
      email:signInForm.email,
      password:signInForm.password

    })
    if (!res?.ok) {
      setSignInLoading(false)
      toast.error("Login failed")
      return
    }

    toast.success("Login successful!")
    setTimeout(()=>{
      router.push('/dashboard')
    },2000)
  };



  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignUpLoading(true)
    console.log(JSON.stringify(signupForm))
    try{
      const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupForm),
    })
    const data = await res.json()
    
    if (res.ok) {
      setSignupForm({name:'',email:'',password:''})
      const loginResult=await signIn('credentials',{
        redirect:false,
        email:signupForm.email,
        password:signupForm.password
      });


if(loginResult){
        router.push('/dashboard')
}
      
      toast.success('Signup Successfully')
    }else{
      setSignUpLoading(false)
      toast.error(data.error)
    }

    
    
    }catch(e){
      console.log(e)
    }
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to start generating exam questions</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center">Authentication</CardTitle>
            <CardDescription className="text-center">Choose your preferred method to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                <Button 
          onClick={handleGoogleSignup}
            variant="outline" 
            disabled={googleLoading}
            className="w-full text-black border border-slate-600 ">
            <FcGoogle className='w-4 h-4 mr-3'/>
            {googleLoading?'Creating.....':'Continue with Google'}
          </Button>
          <div>

          </div>
          <hr></hr>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="email" type="email" placeholder="student@university.edu" onChange={(e=>setSignInForm({...signInForm,email:e.target.value}))} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e=>setSignInForm({...signInForm,password:e.target.value}))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-slate-800 hover:to-purple-700"
                    disabled={signInLoading}>
                    {signInLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleAuth} className="space-y-4">
                <Button 
          onClick={handleGoogleSignup}
            variant="outline" 
            disabled={googleLoading}
            className="w-full text-black border border-slate-600 ">
            <FcGoogle className='w-4 h-4 mr-3'/>
            {googleLoading?'Creating.....':'Continue with Google'}
          </Button>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="name" type="text" placeholder="John Doe"
                      onChange={(e)=>setSignupForm({...signupForm,name:e.target.value})}
                      className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="student@university.edu"
                        onChange={(e)=>setSignupForm({...signupForm,email:e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                       onChange={(e)=>setSignupForm({...signupForm,password:e.target.value})}
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-slate-800 hover:to-purple-700"

                    disabled={signUpLoading}
                  >
                    {signUpLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
