import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IWalletState, IWalletActions } from './types'

type IWalletStore = IWalletState & IWalletActions

const createWalletStore = () =>
  createStore<IWalletStore>()((set) => ({
    isWalletInit: false,
    isTestTransaction: false,
    setIsWalletInit: (isWalletInit: boolean) => set(() => ({ isWalletInit })),
    setIsTestTransaction: (isTestTransaction: boolean) => set(() => ({ isTestTransaction })),
  }))

  type WalletStore = ReturnType<typeof createWalletStore>
  const WalletContext = createContext<WalletStore | null>(null)

  export const useWalletStore = () => {
    const api = useContext(WalletContext) as StoreApi<IWalletStore>
    return {
      isWalletInit: useStore(api, (state) => state.isWalletInit),
      isTestTransaction: useStore(api, (state) => state.isTestTransaction),
      setIsWalletInit: useStore(api, (state) => state.setIsWalletInit),
      setIsTestTransaction: useStore(api, (state) => state.setIsTestTransaction),
    }
  }

  export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
    const walletRef = useRef<WalletStore>()
    if (!walletRef.current) {
      walletRef.current = createWalletStore()
    }
    return (
      <WalletContext.Provider value={walletRef.current}>
        {children}
      </WalletContext.Provider>
    )
  }