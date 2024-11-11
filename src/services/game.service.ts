import { RankType } from "@/types";

export const getRankNameByRank = (rank: RankType) => {
    switch (rank) {
        case RankType.SHEETER:
            return 'Листовщик';
        case RankType.INSTALLER:
            return 'Монтажник';
        case RankType.DEALER:
            return 'Дилер';
        case RankType.MANUFACTURER:
            return 'Производитель';
        default:
            return 'Листовщик';
    }
}

export function getUpdatePrice(price: number, level: number) {
    return price / 10 * level
}

export function getIncome(income: number, level: number) {
    return income + (income * 0.1 * (level - 1))
}

export function getNextIncome(income: number, level: number) {
    return income + (income / 10 * level)
}