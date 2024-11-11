import { CloseSVG } from "@/assets/svg"
import { FC, SyntheticEvent } from "react"

interface ICloseBlockProps {
    handleCancel: () => void
}
  
const CloseModalBtn: FC<ICloseBlockProps> = (props) => {
  
    const { handleCancel } = props
    function onCancel(e: SyntheticEvent): void {
        e.preventDefault()
        handleCancel()
      }
    
  
    return (
    <div className='h-[40%] 
    bg-glass 
    flex items-center justify-center 
    pb-4'>
      <div onClick={onCancel} className='btn btn-ghost' >
        <CloseSVG />
      </div>
  </div>
  )
}
export default CloseModalBtn