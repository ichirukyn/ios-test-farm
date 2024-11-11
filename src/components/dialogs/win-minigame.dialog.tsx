import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import { IMinigame } from '@/types'

interface DialogProps {
  isOpen: boolean
  onWinClick: () => void
  minigame: IMinigame
  onClose: () => void
}

const WinMinigameDialog: FC<DialogProps> = (props) => {
  const { onWinClick } = props
  
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    onClose,
    isOpen,
    minigame
  } = props

  function onCancel(): void {
    onClose()
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  return (
   
    <dialog className='modal overflow-hidden' ref={modalRef}>
      <div className='w-full h-screen bottom-0 absolute'>
      <div className='shop-modal relative mt-[150%]'>
        <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
          <img className='w-6 h-6' src="/shop/close.png" alt="close" />
        </div>
        <div className='w-full flex flex-col justify-center items-center pt-8'>
         {/* контент */}
         <div className='win-minigame-title mt-2'>Ваша награда</div>
         <div className="w-screen flex flex-row items-center justify-center gap-2 pt-6 balance-label">
            <img className="w-10 h-10" src="/home/coin.png" alt="balance" />
            <div>{minigame?.baunty || 300}</div>
          </div>
       </div>
    </div>
  </div>
  <div className='absolute bottom-4 w-screen pl-6'>
        <div className='function-btn btn-no-body pt-6'
          onClick={onWinClick}
          >Забрать награду
        </div>
      </div>
</dialog>
  )
}
export default WinMinigameDialog
