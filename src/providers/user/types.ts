import { 
  IPlayer, 
  ICategory, 
  ITask, 
  IDailyQuest,
  IMinigame, 
  IReferral } from "@/types"
  export interface IUserState {
    player: IPlayer | null
    shop: ICategory[]
    dailyQuest: IDailyQuest
    minigame: IMinigame
    referrals: Map<number, IReferral[]> // Updated to Map
    referralsTotal: number
    referralsPage: number
    referralsCode: string
    claimedAll: boolean
    dailyTasks: ITask[]
    seasonTasks: ITask[]
  }
  
  export interface IUserActions {
    setPlayer: (user: IPlayer) => void
    updatePlayerBalance: (balance: number) => void 
    updatePlayerEnergy: (energyLatest: number, energyMax: number) => void
    updatePlayerIncome: (income: number) => void 
    updatePlayerInvoice: (
      balance: number, 
      usdt: number, 
      numKeys: number,
      lastKeyReady: string
    ) => void 
    setShop: (model: ICategory[]) => void
    setDailyQuest: (dailyQuest: IDailyQuest) => void
    setMinigame: (minigame: IMinigame) => void
    updateDailyQuest: (recieved: boolean) => void
    setReferrals: (numPage: number, refferals: IReferral[]) => void
    getReferrals: (numPage: number) =>  IReferral[] 
    setReferralsTotal: (total: number) => void
    setReferralsPage: (page: number) => void
    setReferralsCode: (code: string) => void
    setDailyTasks: (tasks: ITask[]) => void
    setSeasonTasks: (tasks: ITask[]) => void
    setReferralStatus: (id: string, status: boolean) => void
    setClaimedAll: (status: boolean) => void
  }