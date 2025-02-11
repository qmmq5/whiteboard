"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,

} from "@/components/ui/dialog";

// customized hook 
import {useRenameModel} from "@/store/use-rename-model"
import { useApiMutation } from "@/hooks/use-api-mutation";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {toast} from "sonner";
import { api } from "@/convex/_generated/api";
import { Button } from "../ui/button";


export const RenameModel = () => {
    const {
        isOpen,
        onClose,
        initialValues,
        
    } = useRenameModel();

    // boolean value is changing, but the initial values are not
    console.log(["model",initialValues])
    // console.log(isOpen)
    
    
    const [title, setTitle] = useState(initialValues.title);
    const {mutate,pending} = useApiMutation(api.board.update);
    useEffect(()=>{
        // it can still compile ---> check this later
        setTitle(initialValues.title); 
    },[initialValues.title])

    const onSumbit: FormEventHandler<HTMLFormElement> = (
        e,
    ) =>{
        e.preventDefault();

        mutate({
            id:initialValues.id,
            title,
        })
        .then(()=>{
            toast.success("Board renamed")
            onClose();
        })
        .catch(()=> toast.error("Failed to rename board"));
    };

    return (


        <Dialog open ={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>

                <form onSubmit={onSumbit} className="space-y-4">
                    <Input 
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Board title"
                    />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button disabled={pending} type="submit">
                        Save
                    </Button>
                </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
} ;