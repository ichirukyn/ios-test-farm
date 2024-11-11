import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import { ITask } from '@/types'
import {TasksProgress} from "@/components/tasks/tasks.progress.tsx";

interface PendingTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onNavigateClick: () => void
  task: ITask
}

function getTaskSrc(type: string): string {
    let src
    switch (type) {
        case 'DAILY_BAUNTY':
          src = 'tasks/log-in.webp'
          break
        case 'DAILY_MINIGAME':
          src = 'tasks/daily-quest.webp'
          break
        case 'INVITE_COUNT':
          src = 'tasks/telegram.webp'
          break
        case 'SUBSCRIPE_CHANNEL':
          src = 'tasks/telegram.webp'
          break
        case 'DAILY_GAMEPLAY_ACTION':
          src = 'tasks/key.webp'
          break
        case 'BYBIT_DEPOSIT':
        case 'BYBIT_KYC':
        case 'BYBIT_REGISTRATION':
          src = 'tasks/bybit.webp'
          break;
        case 'SHARE_STORY':
          src = 'tasks/story.png'
          break;
        case 'DAILY_TON_CHECKIN':
        case 'CONNECT_WALLET':
        case 'MAKE_TEST_TRANSACTION':
          src = 'tasks/ton.webp'
          break;    
        default:
          src = 'tasks/telegram.webp'
    }
    return src
}

export const PendingTaskDialog: FC<PendingTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onNavigateClick,
    task
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
        <div className='task-modal-close cursor-pointer' onClick={onCancel}>
          <img className='w-8 h-8' src="/tasks/close.svg" alt="close"/>
        </div>
        <div className='task-modal relative h-screen overflow-y-hidden'>
          <div className='w-full flex flex-col justify-center items-center pt-8 pb-8'>
            <div className='flex items-center justify-center w-full p-4'>
              <img className='w-[200px] h-[200px] rounded-md' src={getTaskSrc(task.templateTask.type)} alt=""/>
            </div>
            <div className='shop-dialog-title mt-4 uppercase'>{task.templateTask.title}</div>
            <div className='shop-dialog-description mt-3 px-6'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, architecto voluptas repudiandae earum
              quae, exercitationem veritatis totam soluta sed praesentium cumque atque quis perspiciatis enim. Qui natus
              nostrum facilis ratione.
            </div>
            <div className="task-baunty flex flex-row items-center justify-center gap-3 mt-4">
              <img className="w-8 h-8" src="/tasks/coin.webp" alt="coin"/>
              <span>+{task.templateTask.baunty}</span>
            </div>
          </div>


          <div className=' w-screen'>
            <div className="mb-4 px-3">
              { !task?.progress && task?.status !== 'InProgress' && (
                <div className="w-full">
                  <TasksProgress value={task?.progress || 1} maxValue={task?.maxProgress || 1}/>
                </div>
              ) }
            </div>

            <div
              className='function-btn btn-no-body flex items-center justify-center pt-6'
              onClick={onNavigateClick}
            >
              DO IT!
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

interface ReadyTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onReadyClick: () => void
  task: ITask
}

export const ReadyTaskDialog: FC<ReadyTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onReadyClick,
    task
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
        <div className='task-modal relative mt-[120px] h-screen overflow-y-hidden'>
          <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
            <img className='w-6 h-6' src="/tasks/close.svg" alt="close" />
          </div>
          <div className='w-full flex flex-col justify-center items-center pt-8'>
          <div className='flex items-center justify-center w-full p-4'>
            <img className='w-[200px] h-[200px] rounded-md' src={getTaskSrc(task.templateTask.type)} alt="" />
          </div>
          <div className='shop-dialog-title mt-4 uppercase'>{task.templateTask.title}</div>
          <div className='shop-dialog-description mt-3 px-6'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, architecto voluptas repudiandae earum quae, exercitationem veritatis totam soluta sed praesentium cumque atque quis perspiciatis enim. Qui natus nostrum facilis ratione.
          </div>
          <div className="task-baunty flex flex-row items-center justify-center gap-3 mt-4">
            <img className="w-8 h-8" src="/tasks/coin.webp" alt="coin" />
            <span>+{task.templateTask.baunty}</span>
          </div>
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
