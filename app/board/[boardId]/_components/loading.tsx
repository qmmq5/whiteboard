"use client"

import {Loader} from "lucide-react";
import { InfoSkeleton } from "./info";
import { Participants } from "./Participants";


export const Loading = () =>{
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none
        flex items-center justify-center ">

        <Loader className="h-6 w-6 test-muted-foreground animate-spin" />
        {/* <Info.Skeleton />  */}
        {/* modify the info skeleton to export ... */}
        {/* <Info boardId={""}/> */}
        <InfoSkeleton />
        <Participants.Skeleton />
        </main>
    )
}