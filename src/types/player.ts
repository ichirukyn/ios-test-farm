
export enum RankType {
    SHEETER = 'SHEETER',
    INSTALLER = 'INSTALLER',
    DEALER = 'DEALER',
    MANUFACTURER = 'MANUFACTURER',
}

/* User type */
export interface IPlayer {
    balance: number
    usdt?: number
    numKeys?: number 
    createdAt?: string | Date
    firstName?: string
    energyLatest?: number
    energyMax?: number
    id?: string
    invitedById?: string 
    isPremium?: boolean 
    lastLogin?: string | Date
    lastLogout?: string | Date  
    lastName?: string 
    levelId?: number 
    rank?: RankType 
    referralProfit?: number
    tgId?: number 
    username?: string
    imageUrl?: string 
    active?: boolean
    incomePerHour?: number
    lastKeyReady?: string
    referrerRewarded: boolean
}

export interface IReferral extends Omit<IPlayer, 
  'createdAt' | 
  'energyLatest' | 
  'energyMax' | 
  'isPremium' | 
  'lastLogin' | 
  'lastLogout' | 
  'levelId' | 
  'rank' | 
  'referralProfit' | 
  'imageUrl' | 
  'active' | 
  'invitedById'
  > {}