import NavButton from "@/components/nav.button";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC } from "react";

const Navigation: FC = () => {

  const { page } = useSiteStore()

    return <div className="
    grid grid-cols-4 gap-2.5
    mx-2 
    pb-7 pt-2
    z-40">
      <NavButton selected={page === Page.AIRDROP} to={'/airdrop'} title={'Airdrop'} index={0}/>
      {/* <NavButton selected={page === Page.SHOP} to={'/shop'} title={'Shop'} index={1}/> */}
      <NavButton selected={page === Page.FARM} to={'/'} title={'Farm'} index={1}/>
      <NavButton selected={page === Page.TASKS} to={'/tasks'} title={'Tasks'} index={2}/>
      <NavButton selected={page === Page.FRIENDS} to={'/friends'} title={'Friends'} index={3}/>
    </div>
}
export default Navigation