
import BauntyItem from "@/components/farm/baunty.item";
import { Chest, ClosedChest } from "@/components/farm/chest";
import { useOpenChest } from "@/hooks/api/useOpenChest";
// import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
import { useUnblockTape } from "@/hooks/api/useUnblockTape";
import useUpdateTotalBalance from "@/hooks/api/useUpdateTotalBalance";
import { useChestsStore } from "@/providers/chests";
import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { apiFetch } from "@/services/api";
import { Page } from "@/types";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Daily from "./daily";
import {ITape} from "@/types/chest.ts";

const KEY_GENERATION_INTERVAL = 4 * 60 * 60 * 1000; // 4 часа в миллисекундах


// const FarmProxy: FC = () => {
//  

//   const [isAvailable, setIsAvailable] = useState(false);

//   const { dailyQuest } = useUserStore();

//   useEffect(() => {
//       console.log(dailyQuest)
//       if (dailyQuest.claimedToday) {
//           setIsAvailable(false);
//       } else {
//           setIsAvailable(true);
//       }
//   }, [dailyQuest])

//   return <>
//     {isAvailable && <Daily />}
//     {!isAvailable &&  <Farm />}
//     {/* <Daily /> */}
//   </>;  
// }

// export default FarmProxy;

const Farm: FC = () => {

  const { setPage, setIsFooterTransparent } = useSiteStore();

    useEffect(() => {
      setPage(Page.FARM);
    }, [setPage]);

    useEffect(() => {
      setIsFooterTransparent(true);
    }, [setIsFooterTransparent]);

  const { setKeyShopOpen } = useSiteStore();  

  const { unblockTape } = useUnblockTape(apiFetch);
  const { openChest } = useOpenChest(apiFetch);
  // const { simpleBuyKeys } = useSimpleBuyKeys(apiFetch);
  const { tape, chests, items, baunty } = useChestsStore();

  const handleUnblockTape = () => {
    unblockTape(tape?.id || '');
  }

  const handleAddKey = () => {    
    //simpleBuyKeys(1);
    setKeyShopOpen(true);
  }

  const handleOpenChest = (chestId: string) => {
    openChest(tape?.id || '', chestId);
  }

  const handleGetMoreKeys = () => {
    setKeyShopOpen(true);
  }

  const navigate = useNavigate()

  const handleGetBaunty = () => {
    navigate('/baunty')
  }

  const handleRewardsInfo = () => {
    navigate('/chest-items')
  }

    return (
    <div className='w-full pb-20'>
      <div className='shop-dialog-title mt-12 uppercase px-2'>find a Great Prize!</div>
      <div className='
      mt-1.5 px-2
      shop-dialog-description
      flex flex-row 
      items-center justify-center gap-2
      btn-no-body
      ' onClick={handleRewardsInfo}>
        9 Types of Rewards Available
        <img className="w-6 h-6" src="farm/question.svg" alt="question" />
      </div>

      <div className="w-full mt-4 px-3">
        <div className="grid grid-rows-4 grid-cols-4 gap-2 text-white">

          {tape && tape?.state === "BLOCKED" && (
            Array(16).fill(0).map((_, index) => (
              <ClosedChest key={index}  />
            ))
          )}

          {tape && tape?.state === "UNBLOCKED" && (
            chests && chests.map((chest, index) => (
              <Chest 
              key={index} 
              chest={chest} 
              onOpen={handleOpenChest}
              />     
            ))
          )}

          {tape && tape?.state === "OPENED" && (
            items && items.map((item, index) => (
              <BauntyItem key={index}
              data={item}
              selected={baunty?.chestId === item?.chestId}
              />
            ))
          )}

        </div>
      </div>

      <div className="w-full flex justify-center pt-6 pb-8 px-3">

      {/* Tape blocked navigation */}
        {tape?.state === "BLOCKED" && (
          <TapeBlockedNavigation
          onAddKey={handleAddKey}
          onUnblockTape={handleUnblockTape}
          onGetMoreKeys={handleGetMoreKeys}
          ></TapeBlockedNavigation>  
      )}

      {/* Tape unblocked navigation */}
      {tape?.state === "UNBLOCKED" && (
         <div className="h-20 w-full farm-btn task-item flex flex-row gap-1 items-center justify-center">
            <div className="shop-dialog-title">CLICK ON A BOX TO OPEN IT</div>
         </div>
      )}

      {/* Tape unblocked navigation */}
      {tape?.state === "OPENED" && (
         <div
           className="max-w-60 w-full function-btn btn-no-body flex flex-row items-center justify-center uppercase"
           onClick={handleGetBaunty}
         >
           Go to reward
         </div>
      )}

      </div>
    </div>
   )
}

export default Farm

interface TapeBlockedNavigationProps {
  onAddKey: () => void;
  onUnblockTape: () => void;  
  onGetMoreKeys: () => void;
} 

const TapeBlockedNavigation: FC<TapeBlockedNavigationProps> = (props) => {

  const { player } = useUserStore();
  const { onAddKey, onUnblockTape, onGetMoreKeys } = props;

  const [remainingTime, setRemainingTime] = useState(0);

  // Рассчитываем время до следующего ключа
  useEffect(() => {
    if (player && player.lastKeyReady) {
      const nextKeyTime = new Date(player.lastKeyReady).getTime() + KEY_GENERATION_INTERVAL;
      const timeUntilNextKey = nextKeyTime - Date.now();
      setRemainingTime(timeUntilNextKey > 0 ? timeUntilNextKey : 0);
    }
  }, [player]);

  const {updateTotalBalance} = useUpdateTotalBalance(apiFetch)

  // Запуск таймера обратного отсчета
  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(timer);
          updateTotalBalance();
          //fetchNewKey(); // Получаем новый ключ после завершения обратного отсчета
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

// Преобразуем оставшееся время в часы, минуты и секунды
  const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
   <div className="w-full h-20 task-item flex flex-row gap-1 items-center justify-between">
          <div className="flex flex-col pl-2 pt-2 w-72">

            <div className="flex flex-row items-center justify-between gap-1 h-6 w-full">
              <div className="flex flex-row items-center justify-start gap-1">
                <img className="w-7 h-7" src="farm/key.webp" alt="key"/>
              </div>
              <div className="flex flex-row gap-1">
                <div className="farm-key-value">{player?.numKeys}</div>
                <div className="farm-key-title">KEYS</div>
              </div>
              <div className="farm-plus-icon btn-no-body" onClick={onAddKey}>
                <img className="w-6 h-6" src="farm/plus.svg" alt="plus"/>
              </div>
            </div>
            <div>
              <progress className="w-full progress progress-info progress-xs bg-[#A7B4BE75]" 
              value={KEY_GENERATION_INTERVAL -remainingTime} 
              max={KEY_GENERATION_INTERVAL}></progress>
            </div>
            <div className="flex flex-row items-center justify-between h-8">
              <div className="farm-key-tag">New key</div>
              <div className="farm-key-expire">{formatTime(remainingTime)}</div>
            </div>
          </div>

          {player && (player?.numKeys || 0) > 0 
          ?  <div className="function-btn btn-no-body uppercase w-full"
              onClick={onUnblockTape}
          >
            Open Box
          </div>
          : <div className="function-btn btn-no-body uppercase w-full"
          onClick={onGetMoreKeys}
          >
            Get More Keys
          </div>
          }
         
        </div>
  )
}

