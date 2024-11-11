/* HTML: <div class="loader"></div> */
//import { useLoaderStore } from "@/providers/store"
import { FC, PropsWithChildren } from "react"


const Loading:FC = () => {
    
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>
        
    )
}

interface ILoadingProps {
    isLoading: boolean
}

export default Loading

export const WithLoader:FC<PropsWithChildren<ILoadingProps>> = (props) => {
    
    const { isLoading, children } = props

    return isLoading
        ? <div className="w-screen h-screen screen">
            
           <div className="w-full h-full flex flex-col items-center justify-center pb-12">
               <div className='shop-dialog-title mt-8 uppercase px-2'>Total keys left.</div>
               <div className="flex flex-row gap-2 items-center justify-center mt-4">
                <img src="/loader/two-cols.png" alt="two-cols" />
                <img src="/loader/three-cols.png" alt="three cols 1" />
                <img src="/loader/three-cols.png" alt="three cols 2" />
               </div>
           </div>

           <div className="absolute bottom-12 w-full flex justify-center items-center">
            <span className="loader-progress"></span>
           </div>

        </div>
        : <>{children}</>
}

