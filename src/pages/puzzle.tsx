import { FC, useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/providers/user';
import PuzzleMinigame from '@/components/puzzle.minigame';
import { useLoseMinigame } from '@/hooks/api/useLoseMinigame';
import { apiFetch } from '@/services/api';
import { useWinMinigame } from '@/hooks/api/useWinMinigame';
import CountdownTimer from '@/components/countdown.timer';
import { useUpdateMinigame } from '@/hooks/api/useUpdateMinigame';

const Puzzle: React.FC = () => {
  
  const onLoseMinigame = () => {
    navigate('/')
  }

  const onWinMinigame = () => {
    navigate('/')
  }

  const [showTooltip, setShowTooltip] = useState(false);

  // Проверяем localStorage при загрузке компонента
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem("hasSeenTooltip");
    
    // Если пользователь не видел подсказку, показываем её
    if (!hasSeenTooltip) {
      setShowTooltip(true);
    }
  }, []);

   // Функция для скрытия подсказки и обновления localStorage
   const handleCloseTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem("hasSeenTooltip", "true");
  };

  const { minigame } = useUserStore()
  const { loseMinigame } = useLoseMinigame(apiFetch, onLoseMinigame)
  const { winMinigame } = useWinMinigame(apiFetch, onWinMinigame) 

  const { updateMinigame } = useUpdateMinigame(apiFetch)
      
  useEffect(() => {
    updateMinigame()
  }, [])

  const [isBlocked, setIsBlocked] = useState(minigame.isBlocked)
  const [remainingTime, setRemainingTime] = useState(minigame.remainingTime)

  useEffect(() => {
    //setIsBlocked(false)
    setIsBlocked(minigame.isBlocked)
    setRemainingTime(minigame.remainingTime)
  }, [minigame])

  const navigate = useNavigate()
  
  const handleWin = () => {
    winMinigame()
  }

  const handleLose = () => {
    loseMinigame(); //console
  }

  const onCancel = () => {
    setShowTooltip(false)
  }

  if (showTooltip) {
    return <div>
      <div className='w-screen h-[95%] bottom-0 left-[-3px] absolute z-50'>   
        
        <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
          <img className='w-6 h-6' src="/shop/close.png" alt="close" />
        </div>

        <div className='absolute bottom-4 w-screen pl-6'>
          <div className='function-btn btn-no-body pt-6'
            onClick={handleCloseTooltip}
            >Понятно
          </div>
        </div>

        <div className='w-full h-full daily-quest-modal'>
          <div className='flex flex-row items-center justify-center mt-16'>
            <img className='w-[180px] h-[254px]' src="/minigame/teacher.png" alt="" />
            <img className='w-[160px] h-[160px]' src="/minigame/fifteen.png" alt="" />
          </div>
          <div className='w-screen minigame-title mt-4 px-4'>Собери картинку перемещая их внутри игрового поля и <span>получи награду</span>.</div>
        </div>

      </div>
    </div>

  } else {
    return <>{ isBlocked 
      ? <MinigameBanner remainingTime={remainingTime} /> 
      : <PuzzleMinigame onWin={handleWin} onLose={handleLose} minigame={minigame}/>
    }</>
  }

  
    
  };
  
  export default Puzzle;
  interface ICountdownTimerProps {
    remainingTime: number
  }

  const MinigameBanner: FC<ICountdownTimerProps> = (props) => {
    const { remainingTime } = props

    const navigate  = useNavigate()

    const handleBack = () => {
      navigate('/')
    }

    return <div className='mt-12 h-full w-screen top-0 absolute z-50 bg-black'>
      <CountdownTimer remainingTime={remainingTime} />
      <div className='minigame-title mt-24'>Вернитесь позже</div>
      
      <div className='absolute bottom-16 w-screen pl-6'>
           <div className='function-btn btn-no-body pt-6'
             onClick={handleBack}
             >Понятно
           </div>
         </div>  
    </div>
  }