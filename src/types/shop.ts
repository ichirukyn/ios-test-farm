/* Model/Market type */
import { RankType } from "./player"


export interface IItem {
    itemId : number
    itemLevel: number
    valuePerSecond: number
    blocked: boolean
    dependency: number
}

export interface IShopCardDependency {
    id: string, 
    itemId: string, 
    dependsOnId: string
    level: number
    name: string
}

export interface IShopCard {
   id: string
   categoryId: string
   name: string
   description: string
   imageUrl: string
   price: number
   income: number
   level?: number
   rank: RankType 
   dependencies: IShopCardDependency[]
}

export interface ICategory {
    categoryName: string
    available: IShopCard[]
    unavailable: IShopCard[]
    purchased: IShopCard[]
}