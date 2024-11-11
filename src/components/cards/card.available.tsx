import { getCardName } from "@/locale"
import { IShopCard } from "@/types"
import { FC, SyntheticEvent, useEffect, useState } from "react"

interface IShopCardProps {
    card: IShopCard
    onCardClick: (card: IShopCard) => void
    available: boolean
}

const ShopCardAvailable:FC<IShopCardProps> = (props) => {

    const { available, card } = props
    const handleBuy = props.onCardClick

    const onBuyClick = (e:SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        handleBuy(props.card)
    }

    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        if (!card.description || !card.description.length) {
            setDescription("Описание отсутствует")
            return
        }
        setDescription(card.description)
    }, [card.description])


   
    return (
        <div className={`shop-card relative 
            ${available 
            ? "cursor-pointer" 
            : "cursor-not-allowed shop-card-blocked"}`}
        onClick={available ? onBuyClick : undefined}
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
                    <span className="ml-3">+{card.income}</span>
                    <img className="w-[12px] h-[12px] ml-1" src="/home/coin.png" alt="" />
                </div>
            </div>
            <div className="shop-card-footer">
                <div className="shop-spacer"></div>
                {available ? (
                     <div className="w-full text-center flex flex-row items-center justify-center gap-2">
                     <img className="w-5 h-5" src="/home/coin.png" alt="price" />
                     {card.price}
                 </div>)
                 : (
                    <div className="shop-card-description">Недостаточно средств</div>
                 )}
               
            </div>
        </div>
    )
}   

export default ShopCardAvailable