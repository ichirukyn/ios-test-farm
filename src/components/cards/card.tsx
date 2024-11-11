import { IShopCard } from "@/types"
import { FC, useEffect, useState } from "react"
import ShopCardPurchased from "./card.purchased"
import ShopCardAvailable from "./card.available"
import ShopCardUnavailable from "./card.unavailable"
import { useUserStore } from "@/providers/user"
import { getUpdatePrice } from "@/services/game.service"

interface IShopCardProps {
    card: IShopCard
    saled: boolean
    blocked: boolean
    handleBuy: (card: IShopCard) => void
    handleUpgrade: (card: IShopCard) => void
}

const ShopCard:FC<IShopCardProps> = (props) => {
    
    const {
        card,
        saled,
        blocked,
        handleBuy,
        handleUpgrade
     } = props

    const onBuyClick = (card: IShopCard) => {
        handleBuy(card)
    }

    const onUpgradeClick = (card: IShopCard) => {
        handleUpgrade(card)
    }

    const { player } = useUserStore()
    const [upgradePrice, setUpgradePrice] = useState(1) 
  
    useEffect(() => { 
        setUpgradePrice(getUpdatePrice(card?.price || 1, card?.level || 1))
    }, [card])

    return (
        <>{ saled 
            ?<ShopCardPurchased onCardClick={onUpgradeClick} card={card}
            available={(player?.balance || 0) >= upgradePrice}
            />
            :<>{ blocked
                ?<ShopCardUnavailable card={card} />
                :<ShopCardAvailable 
                onCardClick={onBuyClick} 
                available={(card.price <= (player?.balance || 0))} 
                card={card} />
            }
            </>
        }
        </>
            
    )
}   

export default ShopCard