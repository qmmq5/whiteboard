"use client";

import {Plus} from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import{
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";



export const NewButton = () => {
    return (
        <Dialog>
            {/* <DialogTitle></DialogTitle> */}
            <DialogTrigger asChild>
                <div className="aspect-square">
                    
                        <button className="bg-slate-200 h-full w-full rounded-md
                        flex items-center justify-center
                        opacity-60 hover: opacity-100 transition">
                            {/* <Hint label="Create organization" side="right"> */}
                                <Plus className="text-white"/>
                            {/* </Hint> */}
                        </button>
                    

                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none
            max-w-[480px]">
            {/* <DialogContent className="p-0"> */}
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    )
}