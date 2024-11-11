
import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import { IChestItem } from '@/types/chest'
interface ReadyBauntyDialogProps {
    isOpen: boolean
    setIsOpen: (status: boolean) => void
    onReadyClick: () => void
    item?: IChestItem
  }
  
  export const ReadyBauntyDialog: FC<ReadyBauntyDialogProps> = (props) => {
    const modalRef = useRef<HTMLDialogElement>(null)
  
    const {
      isOpen,
      onReadyClick,
      item
    } = props
  
    useEffect(() => {
      if (!modalRef) return
      if (!modalRef.current) return
      const modal = modalRef.current
      isOpen ? modal.showModal() : modal.close()
    })

    const getItemVariant = (type: string) => {
      switch (type) {
        case 'USDT': return 'farm/big-usdt.png'
        case 'COINS': return 'farm/big-coin.png'
        case 'KEYS': return 'farm/big-key.png'
        default:
          return '/farm/big-keys.png'
      }
    }

    console.log(item);
  
    return (
      <dialog className='modal overflow-hidden' ref={modalRef}>
        <div className='w-full h-screen bottom-0 absolute'>
          <div className='task-modal relative mt-[120px] h-screen overflow-y-hidden'>
            {/* <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
              <img className='w-6 h-6' src="/tasks/close.svg" alt="close" />
            </div> */}
            <div className='w-full flex flex-col justify-center items-center pt-8'>
            <div className='flex items-center justify-center w-full p-4'>
              <img className='w-[200px] h-[200px] rounded-md' src={getItemVariant(item?.variant || 'KEYS')} alt="" />
            </div>
            <div className='shop-dialog-description mt-3 px-6'>
                {item?.value}
            </div>
            <div className='shop-dialog-title mt-4 uppercase'>{item?.variant}</div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-4 w-screen'>
        <div className='function-btn btn-no-body pt-6'
          onClick={onReadyClick}
        >GET REWARD!
        </div>
      </div>
    </dialog>
    )
  }
  