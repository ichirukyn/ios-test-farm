
import { IChest, ITape, IChestItem, IBauntyItem } from "@/types/chest"

export interface IChestState {
    tape: ITape | null  
    chests: IChest[]    
    items: IChestItem[]
    baunty?: IBauntyItem
   }
   
export interface IChestActions {
    setTape: (tape: ITape) => void
    setChests: (chests: IChest[]) => void
    setItems: (items: IChestItem[]) => void
    setBaunty: (baunty: IBauntyItem) => void
}