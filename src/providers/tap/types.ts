  export interface ITapsState {
    taps: number
    balance: number
    energy: number

    regularBonus: number
    networkBonus: number

    regularFatique: number
    networkFatique: number

    isRegular: boolean
  }
  
  export interface ITapsActions {
  
    setTaps: (taps: number) => void
    setBalance: (balance: number) => void
    setEnergy: (energy: number) => void

    setRegularBonus: (bonus: number) => void
    setNetworkBonus: (bonus: number) => void

    setRegularFatique: (fatique: number) => void
    setNetworkFatique: (fatique: number) => void

    setIsRegular: (isRegular: boolean) => void
  }