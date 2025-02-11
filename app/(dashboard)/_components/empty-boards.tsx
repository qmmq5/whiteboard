"use client"

import {api} from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import {toast} from "sonner";
// import {useApiMutation} from "@/hooks/use-api-mutation"

// export const EmptyBoards = () => {
//     const {organization} = useOrganization(); 
//     // const create = useMutation();
//     // const {mutate,pending} = useApiMutation
// }

import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";

export const EmptyBoards = () =>{
    const router = useRouter();

    const {organization} = useOrganization();
    // const create = useMutation(api.board.create); testing database
    const {mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Board created");
            router.push(`/board/${id}`);
        })
        .catch(()=>toast.error("Failed to create board"));
    }
    return (
        <div className="h-full flex flex-col items-center justify-center">
            {/* <h2 className="text-2xl font-semibold mt-6">
                no favorites boards!
            </h2> */}

            <p className="text-muted-foreground textg-sm mt-2">
                start by creating a board for your organization
            </p>

            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create board
                </Button>
            </div>

            {/* <Button onClick={or} */}
        </div>
    )
}