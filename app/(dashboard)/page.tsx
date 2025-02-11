"use client"

import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import * as React from 'react'


interface DashboardPageProps {
    searchParams:{
        search?:string | undefined;
        favorites?:string | undefined;
    }
}

 
// export default async function DashboardPage({searchParams,}:{searchParams:
//     Promise<{
//         search?:string,
//         favorite?:string,
//     }>
// }) {
//         const {organization} = useOrganization();
//         // const {searchparams} React.use(searchParams)
//         const params = await searchParams
//         return (
//             <div className="flex-1 h-[calc(100%-80px)] p-6">
//                 {/* {JSON.stringify(searchParams)} */}
//                 {!organization ? ( <EmptyOrg/>) : (
    
        
//                     <BoardList 
//                     orgId={organization.id}
//                     query={params}
//                     />
                
//                 )}
    
//             </div>
//         )
//     }
    



const DashboardPage = ({searchParams,}:DashboardPageProps) => {
    const {organization} = useOrganization();
    // const {searchparams} React.use(searchParams)
    const queryparams= React.use(searchParams)

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {/* {JSON.stringify(searchParams)} */}
            {!organization ? ( <EmptyOrg/>) : (

    
                <BoardList 
                orgId={organization.id}
                query={queryparams}
                />
            
            )}

        </div>
    )
}

export default DashboardPage;


// interface SearchParams {
//     search?: string;
//     favorites?: string;
// }

// interface DashboardPageProps {
//     searchParams: SearchParams;
// }

// const DashboardPage = ({ searchParams: initialParams }: DashboardPageProps) => {
//     const { organization } = useOrganization();
//     // const searchParams = useSearchParams();
//     // const [query, setQuery] = useState<SearchParams>(initialParams);
//     const {searchparams} = React.use(initialParams)

//     // useEffect(() => {
//     //     // Update query based on URL search parameters
//     //     const search = searchParams.get('search') || undefined;
//     //     const favorites = searchParams.get('favorites') || undefined;
        
//     //     setQuery({ search, favorites });
//     // }, [searchParams]);

//     return (
//         <div className="flex-1 h-[calc(100%-80px)] p-6">
//             {!organization ? (
//                 <EmptyOrg />
//             ) : (
//                 <BoardList
//                     orgId={organization.id}
//                     query={query}
//                 />
//             )}
//         </div>
//     );
// }

// export default DashboardPage;