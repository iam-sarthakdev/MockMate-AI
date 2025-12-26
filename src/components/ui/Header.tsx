"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/src/components/ui/button'
import { signOut } from 'next-auth/react'


import { Logo } from '@/src/components/ui/Logo'

const Header = () => {

  return (
    <div className="w-full bg-black/50 backdrop-blur-md border-b border-white/10 flex justify-between px-6 py-4 sticky top-0 z-50">
      <Link href="/landingPage" className="flex items-center">
        <Logo />
      </Link>


      <Button className="btn-primary" onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
    </div>
  )
}

export default Header
