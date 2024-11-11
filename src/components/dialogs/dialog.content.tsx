import { FC, PropsWithChildren } from "react";

const DialogContent:FC<PropsWithChildren> = ({ children }) => {

    return (
        <div className='
        modal-body
        h-[60%] flex w-full flex-col'>
            {children}
        </div>
    )
}
export default DialogContent