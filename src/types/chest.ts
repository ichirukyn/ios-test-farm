

export interface ITape {
    id : string
    playerId : string
    index : number
    isReserved: boolean
    state: 'BLOCKED' | 'UNBLOCKED' | 'OPENED'
    chests: IChest[]
}

export interface IChest {
    id: string
    playerId: string
    tapeId: string
}

export interface IChestItem {
    id: string
    chestId: string
    type: 'COMMON' | 'RARE' | 'EPIC'
    variant: 'USDT' | 'COINS' | 'KEYS'
    value: number
}

export interface IBauntyItem extends IChestItem {
    playerId: string
    tapeId: string
}

