import { useGetDailyReward } from '@/hooks/api/useGetDailyReward';
import { useUserStore } from '@/providers/user';
import { apiFetch } from '@/services/api';
import { IDailyQuest } from '@/types';
import { FC, useEffect, useState, 
} from 'react'
import { useNavigate } from 'react-router-dom';

const Daily:FC = () => {

    const { dailyQuest } = useUserStore();
    const navigate  = useNavigate();

    const [isBlocked, setIsBlocked] = useState(false);
    const onSuccess = () => {
        navigate('/');
    }

    const { getDailyReward } = useGetDailyReward(apiFetch, onSuccess)

    useEffect(() => {
        console.log(dailyQuest)
    }, [dailyQuest])

    function handleCancel(): void {
        navigate('/');
    }

    function handleConfirm(): void {
        if (isBlocked) return; 
        setIsBlocked(true);

        getDailyReward();
    }

    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        if (dailyQuest.claimedToday) {
            setIsAvailable(false);
        } else {
            setIsAvailable(true);
        }
    }, [dailyQuest])

    return (
        <div className='w-full'>

        <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">
            
            <div className="task-modal w-full h-full">
                <div className='shop-dialog-title pt-20 uppercase px-2'>Daily reward!</div>
                <div className='
                pt-3 px-2 
                shop-dialog-description 
                flex flex-row 
                items-center justify-center gap-2
                ' >
                  Get coins for daily login to the game without skipping!</div>

                  {isAvailable ? <QuestGrid quest={dailyQuest} /> 
            : <div className='daily-description mt-24'>You've already claimed your reward! Come back later!</div>}
            {isAvailable ? <div className='function-btn btn-no-body absolute bottom-4 pt-6 mx-4'
            onClick={handleConfirm}
            >Claim</div> : null}  

                <div className="absolute top-2 right-2 btn-no-body">
                    <img className="w-8 h-8" src="/farm/close.svg" alt="close" onClick={handleCancel} />
                </div>
            </div>
        </div> 

        </div>)

    //return (
        // <>
        //   <div className='w-full h-screen daily-quest-bg'>
        //   <div className='w-full h-[40%] top-0 left-0 absolute flex justify-end pr-8'>
        //     <img src="/daily/present.png" alt="present" />
        //   </div>    
        //   <div className='w-full absolute top-0 flex justify-end pr-2 pt-2 cursor-pointer' 
        //     onClick={handleCancel}>
        //     <img src="/daily/exclude.png" alt="cancel" />
        //   </div>
        // </div>
        // <div className='w-screen h-[60%] bottom-0 left-[-3px] absolute z-50'>
        //   <div className='w-full h-full daily-quest-modal'>
        //     <div className='w-full daily-title mt-5'>Ежедневная награда</div>
        //     <div className='w-full daily-description mt-4 px-16'>Получай монеты за ежедневный вход в игру без пропусков</div>
        //    
        //   </div>
        // </div>
        // </>
    //    )
};
  
export default Daily;

interface IDailyQuestGridProps {
    quest: IDailyQuest
}

const QuestGrid:FC<IDailyQuestGridProps> = (props) => {
    const { quest } = props

    return <div className='grid grid-cols-4 gap-2 mt-8 px-2'>
        {new Array(quest.maxStreak).fill(0).map((_, index) => {
            return <GridItem 
            key={index} 
            index={index}
            streack={quest.streak}
            base={quest.baseReward}
            bonus={quest.bonus}
            />
        })}
    </div>
}

interface IGridItemProps {
    index: number
    streack: number
    bonus: number
    base: number
}

const GridItem:FC<IGridItemProps> = (props) => {

    const { index, streack, bonus, base } = props

    if (index < (streack - 1) ) {
            return <div className='daily-grid-item opacity-50 w-full flex flex-col gap-2 py-4 justify-center items-center'>
        <div className='daily-grid-item-title'>День {index + 1}</div>
        <img className='w-[54px] h-[54px]' src="/home/coin.png" alt="coin" />
        <div className='daily-grid-item-price pt-1'>{base}</div>
    </div>
    } else if (index === (streack - 1)) {
            return <div className='daily-grid-item-active w-full flex flex-col gap-2 py-4 justify-center items-center'>
        <div className='daily-grid-item-title'>День {index + 1}</div>
        <img className='w-[54px] h-[54px]' src="/home/coin.png" alt="coin" />
        <div className='daily-grid-item-price pt-1'>{base + bonus}</div>
    </div>
    }  else {
        return <div className='daily-grid-item opacity-90 w-full flex flex-col gap-2 py-4 justify-center items-center'>
            <div className='daily-grid-item-title'>День {index + 1}</div>
            <img className='w-[54px] h-[54px]' src="/home/coin.png" alt="coin" />
            <div className='daily-grid-item-price pt-1'>{base + index * bonus}</div>
        </div>
    }
}