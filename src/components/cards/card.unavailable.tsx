import { getCardName } from "@/locale"
import { IShopCard } from "@/types"
import { FC, useEffect, useState } from "react"



interface IShopCardProps {
    card: IShopCard
}

const ShopCardUnavailable:FC<IShopCardProps> = (props) => {
      
    const { card } = props 

    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        if (!card.description || !card.description.length) {
            setDescription("Описание отсутствует")
            return
        }
        setDescription(card.description)
    }, [card.description])
    
      return (
        <div className={`shop-card relative cursor-not-allowed shop-card-blocked`}
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
                <div className="shop-card-description h-5 pt-1">Нужна: {
                getCardName(card.dependencies[0].name || "")}. {card.dependencies[0].level} уровень.</div>               
            </div>
        </div>       
    )
}   

export default ShopCardUnavailable
