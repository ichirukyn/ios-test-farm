
    export interface IWalletState {
     isWalletInit: boolean
     isTestTransaction: boolean      
    }
    
    export interface IWalletActions {
      setIsWalletInit: (isWalletInit: boolean) => void
      setIsTestTransaction: (isTestTransaction: boolean) => void
    }