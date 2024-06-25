"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

export default function Navbar() {
    const [open,setOpen] = useState(false);
    return (
        <div className="flex items-center border-b border-slate-700 justify-between p-5">
            <Link href={"/"} className="font-semibold">MAUI Portal</Link>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger><IoMenuOutline className="h-5 w-5" /></SheetTrigger>
                <SheetContent side={"left"}>
                    <div className="flex flex-col items-center gap-y-4 mt-10">
                        <Link onClick={() => setOpen(false)} href={"/"}>Home</Link>
                        <Link onClick={() => setOpen(false)} href={"/register"}>Register</Link>
                        <Link onClick={() => setOpen(false)} href={"/users"}>Users</Link>
                        {/* <Link href={"/login"}>Login</Link> */}
                    </div>
                </SheetContent>
            </Sheet>
        </div>

    )
}
