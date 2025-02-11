"use client"

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Button } from "@/components/ui/button";
import {BringToFront,SendToBack, Trash2 } from "lucide-react";
import { Hint } from "@/components/hint";

interface SelectionToolsProps {
    camera:Camera;
    setLastUsedColor:(color:Color)=>void
}

export const SelectionTools = memo(({
    camera,
    setLastUsedColor
    }:SelectionToolsProps)=>{
        const selection = useSelf((me)=>me.presence.selection);

        const moveToFront = useMutation((
            {storage}
        )=>{
            const liveLayerIds = storage.get("layerIds")

            const indices: number[] =[];
            const arr = liveLayerIds.toImmutable();

            for (let i = 0; i<arr.length; i++){
                if(selection?.includes(arr[i])){
                    indices.push(i);
                }
            }

            for (let i= indices.length -1; i>=0;i--){
                liveLayerIds.move(indices[i],arr.length-1-(indices.length-1-i))
            }

        },[selection])


        const moveToBack = useMutation((
            {storage}
        )=>{
            const liveLayerIds = storage.get("layerIds")

            const indices: number[] =[];
            // ToImmutable--->Array
            const arr = liveLayerIds.toImmutable();

            for (let i = 0; i<arr.length; i++){
                if(selection?.includes(arr[i])){
                    indices.push(i);
                }
            }

            for (let i= 0; i< indices.length; i++){
                liveLayerIds.move(indices[i],i)
            }

        },[selection])

        const selectionBounds = useSelectionBounds();
        
        const setFill = useMutation((
            {storage},fill:Color,
        ) =>{
            const livelayers = storage.get("layers")
            setLastUsedColor(fill)

            selection?.forEach((id)=>{
                livelayers.get(id)?.set("fill",fill)
            })

        },[selection,setLastUsedColor])

        // ==================================
        const deleteLayers = useDeleteLayers();


        // ===================================

        if (!selectionBounds) {
            return null;
        }

        const x = selectionBounds.width/2 +selectionBounds.x+camera.x;
        const y = selectionBounds.y+camera.y

        console.log("x,y",x,y)
        return (
            <div className="absolute p-1.5 rounded-xl bg-white shadow-sm border flex select-none"
                style={{transform:`translate(${x}px,${y-100}px)`}}
                // style={{transform:`translateX(${x}px-50%) translateY(${y-60}px)`}}
            >
                <ColorPicker
                    onChange={setFill}
                />

                {/* <div className="flex items-center pl-0 ml-4 border-none border-neutral-200">
                 <Button>

                 <Trash2/>
                 </Button>
                </div> */}
                   <div className="flex flex-col gap-y-0.5">
                    <Hint label="Bring to front">
                        <Button
                            onClick={moveToFront}
                            variant="board"
                            size="icon"
                            >

                        <BringToFront />
                        </Button>
                    </Hint>

                    <Hint label="Send to back" side="bottom">
                        <Button
                        onClick={moveToBack}
                            variant="board"
                            size="icon"
                            >
                        
                        <SendToBack/>
                        </Button>
                    </Hint>
                </div>

                <div className="flex items-center border-none border-neutral-200">
                    <Hint label="delete">
                        <Button
                            variant="board"
                            size="icon"
                            onClick={deleteLayers}>

                        <Trash2 />
                        </Button>
                    </Hint>
                </div>
            </div>

        )

})

SelectionTools.displayName = "SelectionTools"
