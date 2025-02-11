"use client";

import { useEffect, useState } from "react";

import { RenameModel } from "@/components/modal/rename-modal";

export const ModelProvider = () => {
    // server side
    const [isMounted, setIsMounted] = useState(false); 


    // client side rendering
    useEffect(() => {
        setIsMounted(true);
    },[])

    if (!isMounted){
        return null;
    }

    return (
        <>
        <RenameModel/>
        {/* <RenameModel/> */}

        </>
    )
}