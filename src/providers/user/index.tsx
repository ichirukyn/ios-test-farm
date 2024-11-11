import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IUserState, IUserActions } from './types'
import { ITask, IPlayer, IDailyQuest, IMinigame, ICategory, IReferral } from '../../types'

type IUserStore = IUserState & IUserActions

const createUserStore = () =>
  createStore<IUserStore>()((set, get) => ({
    player: null,
    setPlayer: (player: IPlayer) => set(() => ({ player })),
    updatePlayerBalance: (balance: number) =>
      set((state) => {
        return ({
          player: {
            ...state.player, // Preserve the other properties of the player
            balance,
            referrerRewarded: state.player?.referrerRewarded || false 
          },
        })
      }),
    updatePlayerInvoice: (
      balance: number, 
      usdt: number, 
      numKeys: number,
      lastKeyReady: string
    ) =>
      set((state) => {
        return ({
          player: {
            ...state.player, // Preserve the other properties of the player
            balance,
            usdt,
            numKeys,
            lastKeyReady,
            referrerRewarded: state.player?.referrerRewarded || false
          },
        })
      }),
      updatePlayerEnergy: (energyLatest: number, energyMax: number) =>
        set((state) => {
          return ({
            player: {
              ...state.player, // Preserve the other properties of the player
              balance: state.player?.balance || 0,
              energyLatest,
              energyMax,
              referrerRewarded: state.player?.referrerRewarded || false
            },
          })
        }),
    updatePlayerIncome: (incomePerHour: number) =>
      set((state) => {
        return ({
          player: {
            ...state.player, // Preserve the other properties of the player
            balance: state.player?.balance || 0,
            incomePerHour,
            referrerRewarded: state.player?.referrerRewarded || false
          },
        })
      }),
    shop: [],
    dailyQuest: { 
      claimedToday: false, 
      streak: 0, 
      maxStreak: 8, 
      bonus:50,
      baseReward: 200,
      recieved: false },
    minigame: { isBlocked: false, win: false, remainingTime: 0,},
    referrals: new Map<number, IReferral[]>(),
    referralsTotal: 0,
    referralsPage: 1,
    referralsCode: '',
    dailyTasks: [],
    seasonTasks: [],
    setShop: (shop: ICategory[]) => set(() => ({ shop })),
    setDailyQuest: (dailyQuest: IDailyQuest) => set(() => ({ dailyQuest })),
    setMinigame: (minigame: IMinigame) => set(() => ({ minigame })),
    updateDailyQuest: (recieved: boolean) => {
      set((state) => {
        return ({
          dailyQuest: {
            ...state.dailyQuest, // Preserve the other properties of the player
            recieved,
          },
        })
      })
    },
    // Set referrals by page number
    setReferrals: (numPage: number, referrals: IReferral[]) =>
      set((state) => {
        const updatedReferrals = new Map(state.referrals);
        updatedReferrals.set(numPage, referrals);
        return { referrals: updatedReferrals };
      }),

    // Get referrals by page number
    getReferrals: (numPage: number) => {
      const state = get();
      return state.referrals.get(numPage) || [];
    },
    setReferralsTotal: (total: number) => set(() => ({ referralsTotal: total })),
    setReferralsPage: (page: number) => set(() => ({ referralsPage: page })),
    setReferralsCode: (code: string) => set(() => ({ referralsCode: code })),
    setDailyTasks: (tasks: ITask[]) => set(() => ({ dailyTasks:tasks })),
    setSeasonTasks: (tasks: ITask[]) => set(() => ({ seasonTasks:tasks })),

    setReferralStatus: (id: string, status: boolean) =>
      set((state) => {
        const updatedReferrals = new Map(state.referrals);
        const referrals = updatedReferrals.get(state.referralsPage) || [];
        const updatedReferralsList = referrals.map((referral) => {
          if (referral.id === id) {
            return { ...referral, referrerRewarded: status }; 
          }
          return referral;
        });
        updatedReferrals.set(state.referralsPage, updatedReferralsList);
        return { referrals: updatedReferrals };
      }),
    claimedAll: false,
    setClaimedAll: (status: boolean) => set(() => ({ claimedAll: status })),
  }))

type UserStore = ReturnType<typeof createUserStore>
const UserContext = createContext<UserStore | null>(null)

//eslint-disable-next-line react-refresh/only-export-components
export const useUserStore = () => {
  const api = useContext(UserContext) as StoreApi<IUserStore>
  return {
    player: useStore(api, (state: IUserStore) => state.player),
    setPlayer: useStore(api, (state: IUserStore) => state.setPlayer),
    updatePlayerBalance: useStore(api, (state: IUserStore) => state.updatePlayerBalance),
    updatePlayerEnergy: useStore(api, (state: IUserStore) => state.updatePlayerEnergy),
    updatePlayerIncome: useStore(api, (state: IUserStore) => state.updatePlayerIncome),
    updatePlayerInvoice: useStore(api, (state: IUserStore) => state.updatePlayerInvoice),
    shop: useStore(api, (state: IUserStore) => state.shop),
    setShop: useStore(api, (state: IUserStore) => state.setShop),
    dailyQuest: useStore(api, (state: IUserStore) => state.dailyQuest),
    minigame: useStore(api, (state: IUserStore) => state.minigame),
    updateDailyQuest: useStore(api, (state: IUserStore) => state.updateDailyQuest),
    setDailyQuest: useStore(api, (state: IUserStore) => state.setDailyQuest),
    setMinigame: useStore(api, (state: IUserStore) => state.setMinigame),
    refferals: useStore(api, (state: IUserStore) => state.referrals),
    dailyTasks: useStore(api, (state: IUserStore) => state.dailyTasks),
    seasonTasks: useStore(api, (state: IUserStore) => state.seasonTasks),    
    setRefferals: useStore(api, (state: IUserStore) => state.setReferrals),
    getRefferals: useStore(api, (state: IUserStore) => state.getReferrals),
    referralsPage: useStore(api, (state: IUserStore) => state.referralsPage),
    referralsTotal: useStore(api, (state: IUserStore) => state.referralsTotal),
    referralsCode: useStore(api, (state: IUserStore) => state.referralsCode),
    setReferralsTotal: useStore(api, (state: IUserStore) => state.setReferralsTotal),
    setReferralsPage: useStore(api, (state: IUserStore) => state.setReferralsPage),
    setReferralsCode: useStore(api, (state: IUserStore) => state.setReferralsCode),
    setDailyTasks: useStore(api, (state: IUserStore) => state.setDailyTasks),
    setSeasonTasks: useStore(api, (state: IUserStore) => state.setSeasonTasks),    

    setReferralStatus: useStore(api, (state: IUserStore) => state.setReferralStatus),
    claimedAll: useStore(api, (state: IUserStore) => state.claimedAll),
    setClaimedAll: useStore(api, (state: IUserStore) => state.setClaimedAll),
  }
}

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef<UserStore>()
  if (!userStoreRef.current) {
    userStoreRef.current = createUserStore()
  }
  return (
    <UserContext.Provider value={userStoreRef.current}>
      {children}
    </UserContext.Provider>
  )
}