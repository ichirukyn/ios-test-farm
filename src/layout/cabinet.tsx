import { FC, useEffect, useState } from "react"
import Content from "./content"
import Footer from "./footer"
import Navigation from "./nav"
import Screen from "./screen"

import { Route, Routes } from "react-router-dom"

import Farm from "@/pages/farm"
import Friends from "@/pages/friends"
import Tasks from "@/pages/tasks"
//import Shop from "@/pages/shop"
//import Offer from "@/pages/offer"

import { WithLoader } from "@/components/loading"
//import Puzzle from "@/pages/puzzle"
import { useRegister } from "@/hooks/api/useRegister"
import { apiFetch } from "@/services/api"
//import ReferralProgram from "@/pages/referral-program"
import useUpdateTasks from "@/hooks/api/useUpdateTasks"
import useUpdateChests from "@/hooks/api/useUpdateChests"
//import { useUpdateShop } from "@/hooks/api/useUpdateShop"
//import useUpdateIncome from "@/hooks/api/useUpdateIncome"
import useUpdateReferrals from "@/hooks/api/useUpdateReferrals"
import Airdrop from "@/pages/airdrop"
import useUpdateWalletStatus from "@/hooks/api/useUpdateWalletStatus"
import Baunty from "@/pages/baunty"
import ChestItems from "@/pages/chest-items"
import { useUpdateDailyQuest } from "@/hooks/api/useUpdateDailyQuest"
import Daily from "@/pages/daily"
import {useSiteStore} from "@/providers/store";
//import { useAllQuestsInfo } from "@/hooks/api/useAllQuestsInfo"
//import Daily from "@/pages/daily"

const INIT_DATA = "user=%7B%22id%22%3A334222503%2C%22first_name%22%3A%22Sergey%22%2C%22last_name%22%3A%22Inozemcev%22%2C%22username%22%3A%22indiecaps%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5654309460436574381&chat_type=group&auth_date=1729368630&hash=5e036df5f4ba6d0183647909498cd013505258c1fa51cfd30dd605eaa6cd15f0"

const Cabinet:FC = () => {

  //const { allQuestsInfo } = useAllQuestsInfo(apiFetch);
  //const { updateShop } = useUpdateShop(apiFetch);
  const { updateReferrals } = useUpdateReferrals(apiFetch, 1, 10);
  const { updateWalletStatus } = useUpdateWalletStatus(apiFetch)
  const { updateTasks } = useUpdateTasks(apiFetch) 
  const { updateChests } = useUpdateChests(apiFetch)
  const { updateDailyQuest } = useUpdateDailyQuest(apiFetch)

  const { setMenuTutorialOpen } = useSiteStore()
  
  const [isLoading, setIsLoading] = useState(true);

  const loadResources = async () => {
    const apiRequests = [
      updateChests(),
      updateWalletStatus(),
      updateReferrals(),
      updateTasks(),
      updateDailyQuest(),
    ];
    await Promise.all([...apiRequests],)
  }

  const { register } = useRegister(apiFetch, loadResources);
  const [isPreflight, setIsPreflight] = useState(false);
  const initData = window?.Telegram?.WebApp?.initData || INIT_DATA;

  console.log('Cabinet initData', initData);

  useEffect(() => {
    
    // Trigger a timer that waits 2 seconds before executing the register function
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust the time in milliseconds as needed (1 second = 1000ms)
    // 
    if (!isPreflight) {
      setIsPreflight(true)
      register(initData)
    }
    //
    return () => clearTimeout(timer);
  }, [register, isPreflight, setIsPreflight, setIsLoading]);

  useEffect(() => {
    const isTutorialComplete = localStorage.getItem('tutorial_complete')
    if (!isTutorialComplete) setMenuTutorialOpen(true)
  }, []);

return (
  <WithLoader isLoading={isLoading}>
    <Screen>
      <Content>
        <Routes>
            <Route path='/' element={<Farm/>} />
            <Route path='/friends' element={<Friends/>} />
            <Route path='/tasks' element={<Tasks/>} />
            <Route path='/airdrop' element={<Airdrop/>} />
            <Route path='/baunty' element={<Baunty/>} />
            {/* <Route path='/shop' element={<Shop/>} /> */}
            <Route path='/chest-items' element={<ChestItems/>} />
            <Route path='/daily' element={<Daily/>} />
        </Routes>
      </Content>
      <Footer>
        <Navigation />
      </Footer>
    </Screen>
  </WithLoader>)
}

export default Cabinet