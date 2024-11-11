export * from './shop'
export * from './player'
export * from './task'
export * from './quest'

export enum Page {
    FARM = 'farm',
    FRIENDS = 'friends',
    TASKS = 'tasks',
    SHOP = 'shop',
    AIRDROP = 'airdrop',
}

export interface ITelegramUser {
    playerId: number
    token: string
    fullname?: string
}


