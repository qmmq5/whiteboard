"use client";

import {toast} from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


interface NewBoardButtonProps {
    orgId:string;
    disabled?:boolean;
};

export const NewBoardButton = ({
    orgId,
    disabled,
}:NewBoardButtonProps) =>{
    const router = useRouter();
    // const create = useMutation(api.board.create);
    const {mutate,pending} = useApiMutation(api.board.create);


    const onClick = () =>{
        mutate({
            orgId,
            title:"Untitled",
        })
        .then((id)=>{
            toast.success("Board created");
            router.push(`/board/${id}`)
        })
        .catch(() => toast.error("Failed to create board"));

    }

    return (
        <button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-blue-300 rounded-lg hover:bg-blue-500 flex flex-col items-center justify-center py-6",
                (pending || disabled) && "opacity-75 hover:bg-blue-600 "
            )}
            >
            <div />
            <Plus className="h-15 w-15 text-white" />
            <p className="text-sm text-white font-light">New board</p>
            
        </button>
        
    )
}