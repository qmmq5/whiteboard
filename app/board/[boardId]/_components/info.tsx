import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Actions } from "@/components/actions";
import { Poppins } from "next/font/google";
// import { Image } from "next/image";
import Image from "next/image";
import { Hint } from "@/components/hint";
import { useRenameModel } from "@/store/use-rename-model";
import Link from "next/link";
import { Menu } from "lucide-react";



// Info.Skeleton = function InfoSkeleton() {
//     return (
//         <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
//             {/* <Skeleton className="h-full w-full bg-muted-400"/> */}
//         </div>
    
//     )
// }

interface InfoProps{
    boardId:string;
}


const font = Poppins({
    subsets:["latin"],
    weight:["600"]
})

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">

        </div>
    )
}

export const Info = ({
    boardId,
}:InfoProps)=>{
    // check convex data
    const {onOpen} =useRenameModel()
    const data = useQuery(api.board.get,{
        id:boardId as Id<"boards">
    })

    if (!data) return <InfoSkeleton />;

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            {/* Todo: information about the board */}
            <Hint label="Go to board" side="bottom" sideOffset={10}>

                <Button asChild className="bg-white px-2" variant="board">
                    <Link href="/">
                    <Image
                        // src = "/logo.svg"
                        src = "/image1.jpg"
                        alt = "Logo"
                        height ={40}
                        width = {40}
                        
                        />
                
                        <span className={cn("font-semibold text-xl ml-2 text-gray-300",font.className)}>
                            Board
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label ="edit title" side="bottom" sideOffset={10}>

            <Button variant="board" className="px-2 text-base font-normal" onClick={()=>onOpen(data._id,data.title)}>
                {data.title}
            </Button>
            </Hint>
            <TabSeparator />
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>

            </Actions>
        </div>
    )
}

// ---------------------------------
export const InfoSkeleton = () =>{
 
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"/>
    )

}


