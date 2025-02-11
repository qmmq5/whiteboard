// "use client"

// use client ---> the server error disappeared from the terminal, but the web browser still has the error

// boardPage can write in async function, browser issues will be solved


// import { useParams } from 'next/navigation';
import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";

// interface BoardIdPageProps {
//     params: {
//         boardId:string;
//     };
// };


// const BoardIdPage= ({params,}: BoardIdPageProps) => {

//     // return <Loading />
    
//     console.log("boardId",params.boardId)

//     return (
        
//         // <div>
//         //     Board Id page
//         // </div>
        
//         <Room roomId={params.boardId} fallback={<div>Loading...</div>}>

//         <Canvas boardId ={params.boardId} />
//         </Room>
//     )
// }

// export default BoardIdPage;

// export default async function BoardPage({ params }: BoardIdPageProps) {
//     // Await params before using them
//     const boardId = await params.boardId;
    
//     return (
//         <Room roomId={boardId} fallback={<div>Loading...</div>}>
//             <Canvas boardId={boardId} />
//         </Room>
//     );
// }



export default async function BoardPage({ params,}: {
    params: Promise<{boardId: string}>
 }) {

    
    const {boardId} = await params
    return (
        // <Room roomId={boardId} fallback={<div>Loading...</div>}>
        <Room roomId={boardId} fallback={<Loading />}>
            <Canvas boardId={boardId} />
        </Room>
    );
}