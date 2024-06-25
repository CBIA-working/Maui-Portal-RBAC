"use client";

import { toast } from "sonner"
import React, { useState } from 'react'
import { date, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fname: z.string().min(2).max(50),
  lname: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  email: z.string().email(),
  dob: z.string(),
  address: z.string().min(5).max(100),
  gender: z.string().min(4).max(6),
  bloodGroup: z.string().min(2).max(3),
  dietaryPreferance: z.string().min(2).max(50),
  emergencyContact: z.string().min(10).max(15),
  emergencyContactName: z.string().min(2).max(50),
  emergencyContactRelation: z.string().min(2).max(50),
});

export default function Page() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      password: "",
      email: "",
      dob: "",
      address: "",
      gender: "",
      bloodGroup: "",
      dietaryPreferance: "",
      emergencyContact: "",
      emergencyContactName: "",
      emergencyContactRelation: "",
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Values",values);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    // toast(`User (${values.fname}) registered successfully!`)
    toast({
      title: `User (${values.fname}) registered successfully!`,
      description: `${new Date().toLocaleDateString()}`,
    });
    form.reset();

  };
  return (
    <div className='flex flex-col items-center m-10 md:w-1/3 md:mx-auto'>
      <h1 className='font-semibold text-2xl text-center'>
        Register a new MAUI App user
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mt-10">
          <div className='flex flex-col gap-4 md:flex-row w-full'>
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-4 md:flex-row w-full'>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your full address here..."
                    className="resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-4 md:flex-row w-full'>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>Blood Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>

            )}
          />
          </div>
          <FormField
            control={form.control}
            name="dietaryPreferance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Preferance</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-4 md:flex-row w-full'>
          <FormField
            control={form.control}
            name="emergencyContactName"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>Emergency Contact</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContactRelation"
            render={({ field }) => (
              <FormItem className='md:w-1/2'>
                <FormLabel>Emergency Relation</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
