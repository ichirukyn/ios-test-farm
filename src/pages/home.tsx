
import UserLevel from "@/components/user.level";
import UserMin from "@/components/user.min";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/providers/user";

import { CalendarSvg, CoinSvg, EnergySvg, GamepadSvg, GearSwg, QuestionSvg } from "@/assets/svg";

import useTapper from "@/hooks/useTapper";


const Home: FC = () => {

  const { setPage } = useSiteStore();
  const navigate = useNavigate();

  const { player } = useUserStore();

  useEffect(() => {
    setPage(Page.FARM);
  }, [setPage]);

  const handleDaily = useCallback(() => {
    navigate("/daily-quest");
  }, [navigate]);

  const handleMiniGame = useCallback(() => {
    navigate("/minigame");
  }, [navigate]);

  const handleLevelClick = useCallback(() => {
    //setIsRatingDialogOpen(true);
  }, []);

  const { 
    balance,
    energy, 
    handleTouch, 
    handleDown, 
    forceTick,
  } = useTapper();

  const [mounted, setMounted] = useState(false);

  const [fullname, setFullname] = useState<string | undefined>();

  useEffect(() => {
    setFullname(`${player?.firstName} ${player?.lastName}`);
  }, [player?.firstName, player?.lastName]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      forceTick();
    }
  }, [mounted, setMounted, forceTick]);

    return (
    <div className='w-full'>
      {/* Header */}
      <div className="flex w-full items-center justify-between h-16">
          <UserMin 
          fullname={fullname} 
          username={player?.username || ""}
          photoUrl={player?.imageUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} 
          />
          <UserLevel level={player?.levelId || 0} progress={35} onClick={handleLevelClick}/>
      </div>
      {/* Content */}
      <div className="home-bg">
        {/* Game menu */}
        <div className="flex flex-row justify-stretch w-screen px-4 pt-4 gap-2">
          <div 
          className="btn-no-body flex flex-row gap-1 home-btn daily-bg items-center justify-start pl-2 w-[120px]"
          onClick={handleDaily}
          >
            <CalendarSvg width={40} height={40} />
            Дневная 
            награда
          </div>
          <div 
          className="btn-no-body flex flex-row gap-1 home-btn minigame-bg items-center justify-start pl-2 w-[108px]"
          onClick={handleMiniGame}
          >
            <GamepadSvg width={40} height={40} />
            Мини 
            игра
          </div>
          <div className="btn-no-body flex flex-row gap-2 home-btn income-bg items-center justify-start pl-2 w-[180px]">
            <div className="flex flex-col h-full items-center justify-center pl-2">
              <div className="flex flex-row justify-stretch items-center gap-1 text-lg">
                {player?.incomePerHour}
                <QuestionSvg width={32} height={32} />
              </div>
              Прибыль в час
            </div>
            <span className="home-spacer"></span>
            <div className="flex flex-col h-full items-center justify-center pr-4">
              <GearSwg width={24} height={26} />
            </div>
          </div>
        </div>
        {/* Balance  */}
        <div className="w-screen flex flex-row items-center justify-center gap-2 pt-4 balance-label">
            <CoinSvg width={39} height={39} />
            <div>{balance}</div>
          </div>
        <div className="absolute home-gradient bottom-0"></div>  
        <div className="absolute bottom-28 px-2">
          <div className="flex flex-col items-center justify-center cursor-pointer pr-12"
           onTouchEnd={handleTouch} onMouseDown={handleDown}
          >
            <img className="w-[60%] h-[60%] sm:w-[100%] sm:h-[100%]" src="/skin/promoter.png" alt="coin" />
          </div>

          <div className="flex flex-row justify-between items-center w-screen pr-2">
            <div className="w-full h-16 flex flex-row items-center justify-between">
              <div className="flex flex-col items-start justify-center gap-1 pl-4">
                <div className="flex flex-row items-center justify-center gap-1 text-lg coin-power">
                  <img className="w-6 h-6" src="/home/coin.svg" alt="coin power" />
                  + {player?.levelId}
                </div>
                <div className="flex fler-row items-start justify-center gap-1 text-white opacity-60">
                  Прибыль за час
                  <img className="w-6 h-6" src="/home/question.svg" alt="income per hour" />                
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 pr-2">
              <EnergySvg />
              <div className="home-energy">{energy}/{player?.energyMax}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   )
}
export default Home