import { getCardName } from "@/locale"
import { getIncome, getNextIncome, getUpdatePrice } from "@/services/game.service"
import { IShopCard } from "@/types"
import { FC, SyntheticEvent, useEffect, useState } from "react"


interface IShopCardProps {
    card: IShopCard
    onCardClick: (card: IShopCard) => void
    available: boolean
}

const ShopCardPurchased:FC<IShopCardProps> = (props) => {
    
    const { available, card } = props
    const handleUpdate = props.onCardClick

    const onUpdateClick = (e:SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log(card)
        handleUpdate(props.card)
    }

    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        if (!card.description || !card.description.length) {
            setDescription("Описание отсутствует")
            return
        }
        setDescription(card.description)
    }, [card.description])

    const [upgradePrice, setUpgradePrice] = useState(1) 
    const [income, setIncome] = useState(1)
    const [upgradeIncome, setUpgradeIncome] = useState(1)

    const [maxLevel, setMaxLevel] = useState(false)
  
    useEffect(() => { 
      setUpgradePrice(getUpdatePrice(card?.price || 1, card?.level || 1))
      setIncome(getIncome(card?.income || 1, card?.level || 1))
      setUpgradeIncome(getNextIncome(card?.income || 1, card?.level || 1))
    
      if (card.level === 10) {
        setMaxLevel(true)
      }
    }, [card])
  

    return (
        <div className={`shop-card relative shop-card-purchased 
            ${available && !maxLevel
            ? "cursor-pointer" 
            : "cursor-not-allowed shop-card-blocked"}`}
        onClick={available ? onUpdateClick : undefined}
        >
            <div className="w-full flex justify-center items-center p-4">
                <img className="w-[100px] h-[100px]" 
                    src={card.imageUrl}
                    alt={card.name} />
            </div>
            <div className={`shop-card-body`}>
                <h2 className="shop-card-title">{getCardName(card.name)}</h2>
                <p className="shop-card-description mt-1">{description}</p>
                <div className="shop-card-income flex flex-row w-full items-center justify-center h-7 mt-1">
                    Прибыль в час: 
                    <span className="ml-3">+{
                        maxLevel ? upgradeIncome : income}</span>
                    <img className="w-[12px] h-[12px] ml-1" src="/home/coin.png" alt="" />
                </div>
            </div>
            <div className="shop-card-footer">
                <div className="shop-spacer"></div>
                {available && !maxLevel ? (
                     <div className="w-full text-center flex flex-row items-center justify-center gap-2">
                     <img className="w-5 h-5" src="/home/coin.png" alt="price" />
                     {upgradePrice}
                 </div>)
                 : (
                    <div className="shop-card-description">
                        {!maxLevel ? "Недостаточно средств" : "Максимальный уровень"}
                    </div>
                 )}
               
            </div>
        </div>
    )
}   

export default ShopCardPurchased