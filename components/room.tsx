"use client"

import { ReactNode } from "react";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface RoomProps{
    children:ReactNode
    roomId:string;
    fallback:NonNullable<ReactNode> | null;
};

export const Room = ({
    children,
    roomId,
    fallback,
}:RoomProps) => {
    return (

        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        

        <RoomProvider id ={roomId} initialPresence={{cursor:null,selection:[],pencilDraft:null,penColor:null}}
        initialStorage={{layers:new LiveMap<string,LiveObject<Layer>>([]),
                        layerIds:new LiveList<string>([]),
                         
                        //  it can still complie, check the error later
        }}> 
            <ClientSideSuspense fallback={fallback}>
                {()=> children}
            </ClientSideSuspense>
        </RoomProvider>
        </LiveblocksProvider>
    )
}