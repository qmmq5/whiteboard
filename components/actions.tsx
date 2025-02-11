"use client";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import { Link2, Pencil, Trash2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/use-rename-model";



interface ActionsProps {
    children:React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:string;
    title:string;
}

export const Actions =({
    children,
    side,
    sideOffset,
    id,
    title,

}:ActionsProps) =>{

    const {onOpen} = useRenameModel();
    // const {onOpen} = RenameModel();

    // const onOpen_test = ()=>{

    // }
    console.log([id,title])
    // console.log(onOpen(id,title))

    const {mutate,pending} = useApiMutation(api.board.remove);


    const onCopyLink = () =>{
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(()=>toast.success("Link copied"))
        .catch(()=>toast.error("Failed to copy link"))
    }

    const onDelete = () => {

        mutate({id})
        .then(()=>toast.success("board deleted"))
        .catch(()=>toast.error("failed to delete board"));
    }
    return (
        <DropdownMenu>
        {/* <div className="absolute z-50 top-1 right-1 text-blue-300">
            Actions!
        </div> */}
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) =>e.stopPropagation()}
            side ={side}
            sideOffset={sideOffset}
            className="w-60">

        
        <DropdownMenuItem
            onClick={onCopyLink}
            className="p-3 cursor-pointer">
                <Link2 className="h-4 w-4 mr-2"/>
                Copy board link
            </DropdownMenuItem>

        {/* text box  */}

        <DropdownMenuItem
            onClick={()=>onOpen(id,title)}
            className="p-3 cursor-pointer">
                <Pencil className="h-4 w-4 mr-2"/>
                Rename
            </DropdownMenuItem>

        {/* <RenameModelTest
            onOpen={}
            
        > */}

        {/* </RenameModelTest> */}
        {/* <RenameModel2>
            <Button 
                variant="ghost"
                className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                    <Pencil className="h-4 w-4 mr-2"/>
                    Rename
                </Button>
        </RenameModel2> */}
        

        <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its content."
                    disabled={pending}
                    onConfirm={onDelete}>
                
            {/* it will flash to quit after click the item */}
        {/* <DropdownMenuItem
            onClick={onDelete}
            className="p-3 cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2"/>
                Delete
            </DropdownMenuItem> */}

            <Button 
                variant="ghost"
                className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                </Button>
            
            </ConfirmModal>

        </DropdownMenuContent>
            {/* {children} */}
        </DropdownMenu>
    )
}