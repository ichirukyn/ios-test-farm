
export interface IDailyQuest {
    baseReward: number,
    bonus: number, 
    claimedToday: boolean,
    maxStreak : number,
    streak : number
    recieved?: boolean
}

export interface IMinigame {
    isBlocked: boolean,
    remainingTime: number,
    win: boolean
    baunty?: number
} 
