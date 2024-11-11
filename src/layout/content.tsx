import GameStats from "@/components/game.stats";
import { useBuyKeys } from "@/hooks/api/useBuyKeys";
import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
import { useSiteStore } from "@/providers/store";
//import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
import { apiFetch } from "@/services/api";
import { FC, PropsWithChildren } from "react";
import {Link} from "react-router-dom";
import ModalTutorial from "@/components/modal.tutorail.tsx";

const Content: FC <PropsWithChildren> = ({ children }) => {
  
    const { 
      keyShopOpen, 
      setKeyShopOpen,
      withdrawOpen,
      setWithdrawOpen,
      menuOpen,
      setMenuOpen,
      menuTutorialOpen,
      setMenuTutorialOpen
    } = useSiteStore()
    
    const onSimpleBuyKeysSuccess = () => {
      setKeyShopOpen(false)
    }
    const { simpleBuyKeys } = useSimpleBuyKeys(apiFetch, onSimpleBuyKeysSuccess)

    const onBuyKeysSuccess = (invoiceLink: string, numKeys: number) => {
      window.Telegram.WebApp.openInvoice(invoiceLink, (status) => {
        if (status === "paid") {
          simpleBuyKeys(numKeys)
        }
      });
    } 

    const { buyKeys } = useBuyKeys(apiFetch, onBuyKeysSuccess) 

    const handleBuyKeys = () => {
      setKeyShopOpen(true)
    }

    const handleWithdraw = () => {
      setWithdrawOpen(true)
    }

    const handleMenu = () => {
      setMenuOpen(true)
    }

    const onShopItemSelect = (value: number) => {    
      buyKeys(value)
    }
    
    return  (<>
      <GameStats onBuyKeys={handleBuyKeys} onWithdraw={handleWithdraw} onMenu={handleMenu}/>
      <main className='pt-8'>
        {children}
        {/* Shop component */}
        {keyShopOpen && (
         <ForStarsShop onShopItemSelect={onShopItemSelect} setKeyShopOpen={setKeyShopOpen} />
        )}
        {withdrawOpen && (
          <Withdraw setWithdrawOpen={setWithdrawOpen} />
        )}
        {menuOpen && (
          <Menu setMenuOpen={setMenuOpen} setMenuTutorialOpen={setMenuTutorialOpen} />
        )}
        {menuTutorialOpen && (
          <ModalTutorial isOpen={menuTutorialOpen} close={() => setMenuTutorialOpen(false)} />
        )}
      </main>
    </>)
  
}
export default Content

interface IWithdrawProps {
  setWithdrawOpen: (isOpen: boolean) => void
}

const Withdraw:FC<IWithdrawProps> = (props) => {
  const { setWithdrawOpen } = props
  
  return (
    <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">
        
    <div className="w-full h-full bg-black opacity-70"></div>
    <div className="absolute bottom-0 w-full !h-[347px] !justify-start task-modal">

      <div className="absolute top-0 right-0 btn-no-body pr-4 pt-2" onClick={() => setWithdrawOpen(false)}>
        <img src="/stars-shop/close.png" alt="" />
      </div>

        <div className='shop-dialog-title mt-16 uppercase px-2'>WITHDRAW</div>
        <div className='shop-dialog-description mt-3 px-2'>Withdrawal is available from <span className="text-green-300">10 USDT</span></div>
    </div>
  </div>
  )
}

interface IForStarsShopProps {
  onShopItemSelect: (value: number) => void
  setKeyShopOpen: (isOpen: boolean) => void
}

const ForStarsShop:FC<IForStarsShopProps> = (props) => {
  const { onShopItemSelect, setKeyShopOpen } = props
  return (
    <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">
        
    <div className="w-full h-full bg-black opacity-70"></div>
    <div className="absolute bottom-0 w-full !h-[347px] !justify-start task-modal">

      <div className="absolute top-0 right-0 btn-no-body pr-4 pt-2" onClick={() => setKeyShopOpen(false)}>
        <img src="/stars-shop/close.png" alt="" />
      </div>

      <div className='shop-dialog-title mt-16 uppercase px-2'>SHOP</div>
      <div className='shop-dialog-description mt-3 px-2'>Buy more keys for better prizes.</div>

      <div className="w-full grid grid-cols-2 grid-rows-2 px-4 gap-2 text-white">
        <StarShopItem value={1} coast={5} onSelect={onShopItemSelect} />
        <StarShopItem value={3} coast={13} onSelect={onShopItemSelect} />
        <StarShopItem value={5} coast={20} onSelect={onShopItemSelect} />
        <StarShopItem value={10} coast={38} onSelect={onShopItemSelect} />
      </div>
    </div>

  </div>
  )
}

interface IStarShopItem {
  value: number
  coast: number
  onSelect: (value: number) => void
}
const StarShopItem: FC<IStarShopItem> = (props) => {
  
  const { value, coast, onSelect } = props
  
  return (
    <div className="
    w-full shop-dialog-item
    h-16 mt-4
    flex flex-row gap-2
    btn-no-body
    " onClick={() =>onSelect(value)}>
      <div className="shop-dialog-item-icon">
        <div className="shop-dialog-item-chip">{value}</div>
        <img className="w-[62px] rounded-md" src="/stars-shop/key.webp" alt="key" />
      </div>
      <div className="flex flex-col justify-between h-full py-2">
        <div className="flex flex-row items-center gap-2">
          <img src="/stars-shop/star-icon.png" alt="star-icon" />
          {coast}
        </div>
        <div className="shop-dialog-item-buy flex items-center">
          Buy
          <img className="w-4 h-4" src="/stars-shop/chevron-right-green.svg" alt="chevron-right-green"/>
        </div>
      </div>
    </div>
  )
}

interface IMenuProps {
  setMenuOpen: (isOpen: boolean) => void
  setMenuTutorialOpen: (isOpen: boolean) => void
}

const Menu: FC<IMenuProps> = (props) => {
  const { setMenuOpen, setMenuTutorialOpen } = props

  const handleClose = () => {
    setMenuOpen(false)
  }

  const handleOpenTutorial = () => {
    setMenuOpen(false)
    setMenuTutorialOpen(true)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-menu relative w-full h-full px-5 pb-8">
        <div
          className="absolute top-0 right-0 btn-no-body pr-4 pt-2 cursor-pointer"
          onClick={handleClose}
        >
          <img className="w-8 h-8" src="/stars-shop/close.png" alt="close"/>
        </div>

        <div className="modal-menu-title pt-10">MENU</div>
        <div className="modal-menu-list flex flex-col gap-4 w-full">

          <div className="modal-menu-item py-2">Language</div>
          <div className="divider my-0"></div>

          <Link to={'/airdrop'} className="modal-menu-item py-2" onClick={handleClose}>Airdrop</Link>
          <div className="divider my-0"></div>

          <div className="modal-menu-item py-2" onClick={handleOpenTutorial}>Tutorial</div>
          <div className="divider my-0"></div>

          <Link to={'/'} className="modal-menu-item py-2" onClick={handleClose}>Our Telegram channel</Link>
        </div>
        <div className="function-btn flex items-center uppercase">Get additional keys</div>
      </div>
    </div>
  )
}