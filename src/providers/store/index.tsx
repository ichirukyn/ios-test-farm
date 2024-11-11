import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IStoreState, IStoreActions } from './types'
import { Page } from '../../types'

type IStore = IStoreState & IStoreActions

const createSiteStore = () =>
  createStore<IStore>()((set) => ({
    page: Page.FARM,
    setPage: (page: Page) => set(() => ({ page })),
    isLoading: 0,
    addLoading: () => set((state) => ({ isLoading: state.isLoading + 1 })),
    removeLoading: () => set((state) => ({ isLoading: state.isLoading - 1 })),
    hideLoading: () => set(() => ({ isLoading: 0 })),
    keyShopOpen: false,
    setKeyShopOpen: (isOpen: boolean) => set(() => ({ keyShopOpen: isOpen })), 
    withdrawOpen: false,
    setWithdrawOpen: (isOpen: boolean) => set(() => ({ withdrawOpen: isOpen })),
    isFooterTransparent: false,
    setIsFooterTransparent: (isTransparent: boolean) => set(() => ({ isFooterTransparent: isTransparent })),
    menuOpen: false,
    setMenuOpen: (isOpen: boolean) => set(() => ({ menuOpen: isOpen })),
    menuTutorialOpen: false,
    setMenuTutorialOpen: (isOpen: boolean) => set(() => ({ menuTutorialOpen: isOpen })),
  }))

type Store = ReturnType<typeof createSiteStore>
const SiteContext = createContext<Store | null>(null)

//eslint-disable-next-line react-refresh/only-export-components
export const useSiteStore = () => {
  const api = useContext(SiteContext) as StoreApi<IStore>
  return {
    page: useStore(api, (state: IStore) => state.page),
    setPage: useStore(api, (state: IStore) => state.setPage),
    isLoading: useStore(api, (state: IStore) => state.isLoading),
    addLoading: useStore(api, (state: IStore) => state.addLoading),
    removeLoading: useStore(api, (state: IStore) => state.removeLoading),
    hideLoading: useStore(api, (state: IStore) => state.hideLoading),
    keyShopOpen: useStore(api, (state: IStore) => state.keyShopOpen),
    setKeyShopOpen: useStore(api, (state: IStore) => state.setKeyShopOpen),
    withdrawOpen: useStore(api, (state: IStore) => state.withdrawOpen),
    setWithdrawOpen: useStore(api, (state: IStore) => state.setWithdrawOpen),
    isFooterTransparent: useStore(api, (state: IStore) => state.isFooterTransparent),
    setIsFooterTransparent: useStore(api, (state: IStore) => state.setIsFooterTransparent),
    menuOpen: useStore(api, (state: IStore) => state.menuOpen),
    setMenuOpen: useStore(api, (state: IStore) => state.setMenuOpen),
    menuTutorialOpen: useStore(api, (state: IStore) => state.menuTutorialOpen),
    setMenuTutorialOpen: useStore(api, (state: IStore) => state.setMenuTutorialOpen),
  }
}

export const useLoaderStore = () => {
  const { addLoading, removeLoading, isLoading, hideLoading } = useSiteStore()
  //const showLoading = () => addLoading()
  //const hideLoading = () => removeLoading()
  return { addLoading, removeLoading, isLoading, hideLoading }
}

export const SiteProvider: FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef<Store>()
  if (!userStoreRef.current) {
    userStoreRef.current = createSiteStore()
  }
  return (
    <SiteContext.Provider value={userStoreRef.current}>
      {children}
    </SiteContext.Provider>
  )
}