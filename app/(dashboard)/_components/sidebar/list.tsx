"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./item";


export const List = () => {
    const {userMemberships} = useOrganizationList({
        userMemberships: {
            infinite:true,
        },
    });

    if (!userMemberships.data?.length) return null;

    return (
        <ul className="space-y-4">
            
            {userMemberships.data?.map((member)=>(
                // <p className="text-white" key={member.organization.id}>
                //  {member.organization.name}
                // </p>
                // <Item />
                
                <div className="aspect-square relative" key={member.organization.id}> 
                    {/* aspect-square relative doesn't work in item.tsx */}
                    {/* <Item key={member.organization.id} */}
                    <Item 
                    id = {member.organization.id}
                    name={member.organization.name}
                    imageUrl={member.organization.imageUrl} />

                </div>
            ))}
        </ul>
    )
}