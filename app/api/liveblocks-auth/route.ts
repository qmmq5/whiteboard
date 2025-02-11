import {Liveblocks} from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser";
import {api} from "@/convex/_generated/api"
import {auth, currentUser} from "@clerk/nextjs/server"
// middleware

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
)

// const key =  process.env.LIVEBLOCK_SECRET_KEY!


const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLCOK_SECRET_KEY!,
});

 // "sk_dev_H59diCcCcsiBNXwLtseHkmAdgQxjc2tZcDimm0qo_w3f_yMsKbACe8WTibS0iaws"
export async function POST(request: Request){
    const authorization = await auth();
    const user = await currentUser();

    console.log("AUTH_INFO",{
        authorization,
        user,
    })

    if (!authorization || !user){
        return new Response("Unauthoried",{status:403})
    }

    const {room} = await request.json();
    const board = await convex.query(api.board.get,{id:room});

    console.log("AUTH_INFO",{
        room,
        board,
    })

    if (board?.orgId !== authorization.orgId){
        return new Response("Unauthorized")
    }

    const userInfo = {
        name: user.firstName || "Teammate",
        picture:user.imageUrl,
    };

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    )


    if (room){
        // check token if room
        // session.allow(room,sessionStorage.FULL_ACCESS)
        //  tutorial is also session.... 
        session.allow(room,session.FULL_ACCESS)
    }

    const {status,body} = await session.authorize();
    console.log({status,body},"ALLOWED")
    return new Response(body,{status})

}


// post error 500 ---> middleware/ server
