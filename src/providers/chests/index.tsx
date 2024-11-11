import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IChestState, IChestActions } from './types'
import { ITape, IChest, IChestItem, IBauntyItem } from '@/types/chest'

type IChestStore = IChestState & IChestActions

const createChestStore = () =>
  createStore<IChestStore>()((set) => ({
    tape: null,
    setTape: (tape: ITape) => set(() => ({ tape })),
    chests: [],
    setChests: (chests: IChest[]) => set(() => ({ chests })),
    items: [],
    setItems: (items: IChestItem[]) => set(() => ({ items })),
    setBaunty: (baunty: IBauntyItem) => set(() => ({ baunty })),
  }))

  type ChestStore = ReturnType<typeof createChestStore>
  const ChestContext = createContext<ChestStore | null>(null)

  export const useChestsStore = () => {
    const api = useContext(ChestContext) as StoreApi<IChestStore>
    return {
      tape: useStore(api, (state) => state.tape),
      setTape: useStore(api, (state) => state.setTape),
      chests: useStore(api, (state) => state.chests),
      setChests: useStore(api, (state) => state.setChests),
      items: useStore(api, (state) => state.items),
      baunty: useStore(api, (state) => state.baunty),
      setItems: useStore(api, (state) => state.setItems),
      setBaunty: useStore(api, (state) => state.setBaunty),
    }
  }

  export const ChestsProvider: FC<PropsWithChildren> = ({ children }) => {
    const chestRef = useRef<ChestStore>()
    if (!chestRef.current) {
      chestRef.current = createChestStore()
    }
    return (
      <ChestContext.Provider value={chestRef.current}>
        {children}
      </ChestContext.Provider>
    )
  }