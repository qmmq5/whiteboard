"use client";

import {useQuery} from "convex/react";
import { api } from "@/convex/_generated/api";
// board-list into the page.tsx
import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { NewBoardButton } from "./new-board-button";
import { BoardCard } from "./board-card";
import * as React from 'react'

// browser has the error for dynamic route

// interface BoardListProps{
//     orgId: string;
//     query:{
//         search?:string;
//         favorites?: string;
//     };
// };


// export const BoardList = async ({
//     orgId, query,
// }:{
//     orgId: string;
//     query: Promise<{
//         search?:string;
//         favorites?:string;
//     }>
    
// })



// export const BoardList = async ({
//     orgId, query
// }:{
//     orgId: string;
//     query: Promise<{
//         search?:string;
//         favorites?:string;
//     }>
    
// })=>{
//     // const orgd = React.use(orgId)

//     // const data = useQuery(api.boards.get,{orgId,search:query.search});

//     // check the params--->boards.tsx in convex optional() is used for search and favorite
    
//     // const query_ = await query
    
//     const data = await useQuery(api.boards.get,{orgId,...query_});
//     // if (data == undefined) ---> it will not display skeleton
//     //  if (true) ---> skeleton works, check the conditions for searching
//     if (data === undefined){
//         return (
//             <div>
//             <h2 className="text-3xl">
//                 {query_.favorites ? "Favorite boards": "Team boards"}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
//             lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
//                 <NewBoardButton orgId={orgId} disabled />
//                 <BoardCard.Skeleton />
//                 <BoardCard.Skeleton />
//                 <BoardCard.Skeleton />
//                 <BoardCard.Skeleton />
//             </div>
//             </div>
//         )
//     }

//     // 3 conditions

//     if (!data?.length && query_.search ) {
//         return (
//             <div>
//                 <EmptySearch />
//                 {/* Try searching for something else */}
//             </div>
//         )
//     }

//     if (!data?.length && query_.favorites){
//         return (
//             <div>
//                 <EmptyFavorites />
//                 {/* empty favorites (boadr-list.tsx) */}
//             </div>
//         )
//     }

//     if (!data?.length){
//         return (
//             <div>
//                 <EmptyBoards />
//                 {/* empty boards (boadr-list.tsx) */}
//             </div>
//         )
//     }

//     return (
//         <div>
//             <h2 className="text-3xl">
//                 {query_.favorites ? "Favorite boards": "Team boards"}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
//             lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
//             <NewBoardButton orgId={orgId} />
//             {data?.map((board)=>(
//                 <BoardCard
//                     key={board._id}
//                     id={board._id}
//                     title={board.title}
//                     imageUrl={board.imageUrl}
//                     authorId={board.authorId}
//                     authorName={board.authorName}
//                     createdAt={board._creationTime}
//                     orgId={board.orgId}
//                     isFavorite={board.isFavorite}            />
//             ))}

//             {/* card with the parameters from the database (data schema) */}
//             </div>
//             {/* {JSON.stringify(query)} */}
//         </div>
//     )
// }


export const BoardList = ({
    orgId, query
}:{
    orgId: string;
    query: {
        search?:string;
        favorites?:string;
    }
    
})=>{
    // const orgd = React.use(orgId)

    // const data = useQuery(api.boards.get,{orgId,search:query.search});

    // check the params--->boards.tsx in convex optional() is used for search and favorite
    // const query = await query
    const data = useQuery(api.boards.get,{orgId,...query});
    // if (data == undefined) ---> it will not display skeleton
    //  if (true) ---> skeleton works, check the conditions for searching
    if (data === undefined){
        return (
            <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorite boards": "Team boards"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton orgId={orgId} disabled />
                <BoardCard.Skeleton />
                <BoardCard.Skeleton />
                <BoardCard.Skeleton />
                <BoardCard.Skeleton />
            </div>
            </div>
        )
    }

    // 3 conditions

    if (!data?.length && query.search ) {
        return (
            <div>
                <EmptySearch />
                {/* Try searching for something else */}
            </div>
        )
    }

    if (!data?.length && query.favorites){
        return (
            <div>
                <EmptyFavorites />
                {/* empty favorites (boadr-list.tsx) */}
            </div>
        )
    }

    if (!data?.length){
        return (
            <div>
                <EmptyBoards />
                {/* empty boards (boadr-list.tsx) */}
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorite boards": "Team boards"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
            <NewBoardButton orgId={orgId} />
            {data?.map((board)=>(
                <BoardCard
                    key={board._id}
                    id={board._id}
                    title={board.title}
                    imageUrl={board.imageUrl}
                    authorId={board.authorId}
                    authorName={board.authorName}
                    createdAt={board._creationTime}
                    orgId={board.orgId}
                    isFavorite={board.isFavorite}            />
            ))}

            {/* card with the parameters from the database (data schema) */}
            </div>
            {/* {JSON.stringify(query)} */}
        </div>
    )
}




// export default async function BoardList({
//     orgid,
//     query_,
// }:{
//     orgid: Promise<{orgId:string}>,
//     query_:Promise<{query:{
//         search?:string,
//         favorites?:string
//     }}>

// }){

//     const {orgId} = await orgid
//     const {query} = await query_






