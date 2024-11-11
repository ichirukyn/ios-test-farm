import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import CloseModalBtn from '../button/close-modal.btn'
import DialogContent from './dialog.content'
import { getRoleByLevel } from '@/local'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  level: number
  income: number
  bestUsers: {name: string, photoUrl: string, income: number}[]
}

const RatingDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    level,
    income,
    bestUsers
  } = props

  function onCancel(): void {
    setIsOpen(false)
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
            <CloseModalBtn handleCancel={onCancel}/>
          <DialogContent>
            <div className='flex flex-col items-center justify-center w-full mt-2'>
                <div className='text-xl font-bold'>Ваш уровень: {getRoleByLevel(level)}</div>
                <div className='text-3xl font-bold'>Ваш доход составляет: {income}</div>
            </div>
            <div className='spacer mt-2'></div>
            <div className='flex flex-col items-center justify-center w-full mt-4'>
                <div className='text-xl font-bold'>Лучшие игроки</div>
                <div className='flex flex-col items-center justify-center w-full'>
                    {bestUsers.map((user, index) => (
                        <div key={index} className='flex flex-row items-center justify-between w-full p-4'>
                            <div className='flex flex-row justify-center items-center gap-4'>
                                <img src={user.photoUrl} className='w-16 h-16 rounded-full' />
                                <div className='text-md font-bold'>{user.name}</div>
                            </div>
                            <div className='text-md font-bold'>{user.income}</div>
                        </div>
                    ))}
                </div>
            </div>
          </DialogContent>
        </div>
    </dialog>
  )
}
export default RatingDialog