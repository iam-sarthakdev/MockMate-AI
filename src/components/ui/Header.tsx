"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/src/components/ui/button'
import { signOut } from 'next-auth/react'


const Header = () => {
  
  return (
     <div className="w-fulll bg-[#07060f] flex justify-between p-3 text-lg font-bold mb-4">
        <Link href="/" className="flex items-center gap-2 m-2">
        <Image src="/logo.png" alt="Logo" height={32} width={38} ></Image>
        <h2 className="text-primary-100">MockMateAI</h2>
        </Link>
       
      
       <Button className="btn-primary" onClick={()=>signOut({callbackUrl:"/"})}>Logout</Button>
    </div>
  )
}

export default Header
