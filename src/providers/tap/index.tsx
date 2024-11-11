import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { ITapsState, ITapsActions } from './types'

type ITapsStore = ITapsState & ITapsActions

const createTapsStore = () =>
  createStore<ITapsStore>()((set) => ({
    taps: 0,
    balance: 0,
    energy: 0,  
    regularBonus: 0,
    networkBonus: 0,
    regularFatique: 0,
    networkFatique: 0,
    isRegular: true,
    setTaps: (taps: number) => set(() => ({ taps })),
    setBalance: (balance: number) => set(() => ({ balance })),
    setEnergy: (energy: number) => set(() => ({ energy })),
    setRegularBonus: (bonus: number) => set(() => ({ regularBonus: bonus })),
    setNetworkBonus: (bonus: number) => set(() => ({ networkBonus: bonus })),
    setRegularFatique: (fatique: number) => set(() => ({ regularFatique: fatique })),
    setNetworkFatique: (fatique: number) => set(() => ({ networkFatique: fatique })),
    setIsRegular: (isRegular: boolean) => set(() => ({ isRegular })),
  }))

  type TapsStore = ReturnType<typeof createTapsStore>
  const TapsContext = createContext<TapsStore | null>(null)

  export const useTapsStore = () => {
    const api = useContext(TapsContext) as StoreApi<ITapsStore>
    return {
     taps: useStore(api, (state) => state.taps),
     balance: useStore(api, (state) => state.balance),
     energy: useStore(api, (state) => state.energy),
     regularBonus: useStore(api, (state) => state.regularBonus),
     networkBonus: useStore(api, (state) => state.networkBonus),
     regularFatique: useStore(api, (state) => state.regularFatique),
     networkFatique: useStore(api, (state) => state.networkFatique),
     isRegular: useStore(api, (state) => state.isRegular),
     setTaps: useStore(api, (state) => state.setTaps),
     setBalance: useStore(api, (state) => state.setBalance),
     setEnergy: useStore(api, (state) => state.setEnergy),
     setRegularBonus: useStore(api, (state) => state.setRegularBonus),
     setNetworkBonus: useStore(api, (state) => state.setNetworkBonus),
     setRegularFatique: useStore(api, (state) => state.setRegularFatique),
     setNetworkFatique: useStore(api, (state) => state.setNetworkFatique),
     setIsRegular: useStore(api, (state) => state.setIsRegular),
    }
  }

  export const TapsProvider: FC<PropsWithChildren> = ({ children }) => {
    const userTapsRef = useRef<TapsStore>()
    if (!userTapsRef.current) {
      userTapsRef.current = createTapsStore()
    }
    return (
      <TapsContext.Provider value={userTapsRef.current}>
        {children}
      </TapsContext.Provider>
    )
  }