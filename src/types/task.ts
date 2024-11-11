export interface ITaskTemplate {
    id: string
    title: string
    description?: string 
    type: string
    baunty?: number
    bonus?: number
    target?: number
    content: string
    navigate: string
    expiresAt?: string | Date
    createdAt: string | Date
    updatedAt?: string | Date
    isDaily: boolean
}

export interface ITask {
    id: string
    templateTaskId: string
    playerId: string
    status: string
    progress: number
    maxProgress: number
    createdAt: string | Date
    updatedAt?: string | Date
    finishedAt?: string | Date
    templateTask: ITaskTemplate
}
