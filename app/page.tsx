"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gem, MapPin, PartyPopper, Utensils } from "lucide-react"
import Link from "next/link"
import logo from '@/public/grounded-gems-logo 2.svg'
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'

import { submitEmail } from "./actions"
import {useForm} from 'react-hook-form'
import { useState } from "react"
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})
type EmailSchema = z.infer<typeof emailSchema>

export default function WaitlistPage() {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  })

  async function onSubmit(data: EmailSchema){
    setStatus('submitting')
    const res = await submitEmail(data.email)
    setStatus(res.success ? 'success' : 'error')
  }
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="Grounded Gems Logo" width={60} height={60} />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Prominent Waitlist Form */}
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"></div>
          <div className="absolute inset-0 card-overlay-dots"></div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="block text-primary">Discover hidden gems</span>
              <span className="block text-secondary">Google can&apos;t find.</span>
            </h1>
            <div className="mx-auto mt-6 max-w-2xl text-xl">
              <p className="text-foreground">
                <span className="inline-block mx-1">📍 Secret spots</span> •
                <span className="inline-block mx-1">🍔 Local eats</span> •
                <span className="inline-block mx-1">🎉 Real events</span>
              </p>
              <p className="mt-4 text-foreground font-medium">Authentic. Underrated. Unfiltered.</p>
              <p className="mt-2 text-muted-foreground">
                <span className="font-bold">#GroundedGems</span> — Follow for your city&apos;s realest finds.
              </p>
            </div>

            {/* Simplified Waitlist Form */}
            <div className="mx-auto mt-10 max-w-md">
              <div className="rounded-lg bg-card-alt p-6 shadow-lg border border-border">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Join Our Waitlist</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                  <Input type="email" placeholder="Enter your email" {...register('email')} className="w-full border-input text-lg" required />
                  {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground text-lg hover:bg-primary/90"
                  >
                    {status === "submitting" ? "Joining…" : "Join Waitlist"}
                  </Button>
                  {status === "success" && (
        <p className="text-sm text-green-600">You&apos;re on the waitlist!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Oops, something went wrong. Try again later.
        </p>
      )}
                </form>
                <p className="mt-3 text-sm text-muted-foreground">Join 2,000+ others. We respect your privacy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Simplified */}
        <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Why Choose <span className="text-primary">Grounded</span> <span className="text-secondary">Gems</span>
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-card p-6 text-center border border-border/30 retro-photo-frame">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-foreground">Secret Spots</h3>
                <p className="mt-2 text-muted-foreground">
                  Discover hidden locations and experiences that don&apos;t show up in typical searches.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-lg bg-card p-6 text-center border border-border/30 retro-photo-frame">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <Utensils className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-foreground">Local Eats</h3>
                <p className="mt-2 text-muted-foreground">
                  Find authentic, underrated restaurants and food experiences loved by locals.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-lg bg-card p-6 text-center border border-border/30 retro-photo-frame">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <PartyPopper className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-foreground">Real Events</h3>
                <p className="mt-2 text-muted-foreground">
                  Get access to genuine local events and experiences that make your city special.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Simple CTA Section */}
        <section className="bg-gradient-to-r from-secondary to-primary px-4 py-12 sm:px-6 sm:py-16 lg:px-8 relative">
          <div className="absolute inset-0 card-pattern-grid"></div>
          <div className="mx-auto max-w-2xl text-center relative z-10">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Be the first to discover your city&apos;s hidden gems
            </h2>
            <div className="mt-6 flex justify-center">
              <Button
                className="bg-accent text-foreground px-8 py-6 text-lg font-medium hover:bg-accent/90"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Join Waitlist Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center">
              <Gem className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-bold text-secondary">Grounded Gems</span>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground md:mt-0">
              &copy; {new Date().getFullYear()} Grounded Gems. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
