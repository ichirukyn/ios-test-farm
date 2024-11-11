import ShopCard from "@/components/cards/card";
import BuyCardDialog from "@/components/dialogs/buy-card.dialog";
import UpgradeCardDialog from "@/components/dialogs/upgrade-card.dialog";
import { useBuyCard } from "@/hooks/api/useBuyCard";
//import { useUpdateShop } from "@/hooks/api/useUpdateShop";
import { useUpgradeCard } from "@/hooks/api/useUpgradeCard";
//import useTapper from "@/hooks/useTapper";

import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { apiFetch } from "@/services/api";
import { ICategory, IShopCard, Page } from "@/types";
import React from "react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Shop: FC = () => {
  const { setPage } = useSiteStore();

  useEffect(() => {
    setPage(Page.SHOP);
  }, [setPage]);

  const { player, shop } = useUserStore();
  const navigate = useNavigate();
  //const { updateShop } = useUpdateShop(apiFetch);

  // Состояния для управления диалогами и текущей карточкой
  const [dialogState, setDialogState] = useState({
    isBuyDialogOpen: false,
    isUpgradeDialogOpen: false,
  });

  const [currentCard, setCurrentCard] = useState<IShopCard | null>(null);
  const [category, setCategory] = useState<ICategory>(shop[0]);
  const [tabIndex, setTabIndex] = useState(0);

  const onUpgradeSuccess = () => {
    setDialogState((prevState) => ({ ...prevState, isUpgradeDialogOpen: false }));
    navigate("/");
    //updateShop();
    //window.location.reload();
    //window.location.href="/shop"
  }

  const onBuySuccess = () => {
    setDialogState((prevState) => ({ ...prevState, isBuyDialogOpen: false }));
    navigate("/");
    //updateShop();
    //window.location.reload();
    //window.location.href="/shop"
  }

  const { buyCard } = useBuyCard(apiFetch, onBuySuccess);
  const { upgradeCard } = useUpgradeCard(apiFetch, onUpgradeSuccess);

  // Мемоизация функций для предотвращения лишних перерисовок
  const handleBuy = useCallback((card: IShopCard) => {
    setCurrentCard(card);
    setDialogState((prevState) => ({ ...prevState, isBuyDialogOpen: true }));
  }, []);

  const handleUpgrade = useCallback((card: IShopCard) => {
    setCurrentCard(card);
    setDialogState((prevState) => ({ ...prevState, isUpgradeDialogOpen: true }));
  }, []);

  const onBuyClick = useCallback(() => {
    setDialogState((prevState) => ({ ...prevState, isBuyDialogOpen: false }));
    if (currentCard) buyCard(currentCard.id);
  }, [buyCard, currentCard]);

  const onUpgradeClick = useCallback(() => {
    setDialogState((prevState) => ({ ...prevState, isUpgradeDialogOpen: false }));
    if (currentCard) upgradeCard(currentCard.id);
  }, [upgradeCard, currentCard]);

  const handleTabClick = useCallback((index: number) => {
    setTabIndex(index);
    setCategory(shop[index]);
  }, [shop]);

  // Мемоизация для уменьшения количества ререндеров
  const renderedShopCards = useMemo(() => (
    <>
      {category.purchased.map((card, index) => (
        <ShopCard
          key={index}
          card={card}
          handleBuy={handleBuy}
          handleUpgrade={handleUpgrade}
          saled={true}
          blocked={false}
        />
      ))}
      {category.available.map((card, index) => (
        <ShopCard
          key={index}
          card={card}
          handleBuy={handleBuy}
          handleUpgrade={handleUpgrade}
          saled={false}
          blocked={false}
        />
      ))}
      {category.unavailable.map((card, index) => (
        <ShopCard
          key={index}
          card={card}
          handleBuy={handleBuy}
          handleUpgrade={handleUpgrade}
          saled={false}
          blocked={true}
        />
      ))}
    </>
  ), [category, handleBuy, handleUpgrade]);

  return (
    <div className="h-screen">
      <div>
        <div className="w-full flex flex-row items-center justify-center gap-2 pt-8">
          <img className="w-10 h-10" src="/home/coin.png" alt="balance" />
          <span className="balance-label">{player?.balance}</span>
        </div>
        <p className="w-full text-center pt-1 text-sm text-white opacity-40">Промоутер</p>
      </div>
      <Tabs tabIndex={tabIndex} handleTabClick={handleTabClick} shop={shop} />
      <div className="grid grid-cols-2 gap-2 px-2 pt-5 w-full">
        {renderedShopCards}
      </div>
      <BuyCardDialog
        isOpen={dialogState.isBuyDialogOpen}
        setIsOpen={(isOpen) => setDialogState((prevState) => ({ ...prevState, isBuyDialogOpen: isOpen }))}
        card={currentCard}
        onBuyClick={onBuyClick}
      />
      <UpgradeCardDialog
        isOpen={dialogState.isUpgradeDialogOpen}
        setIsOpen={(isOpen) => setDialogState((prevState) => ({ ...prevState, isUpgradeDialogOpen: isOpen }))}
        card={currentCard}
        onUpgradeClick={onUpgradeClick}
      />
    </div>
  );
};

export default Shop;

// Компонент Tabs вынесен для улучшения читаемости и гибкости
const Tabs: FC<{ tabIndex: number, handleTabClick: (index: number) => void, shop: ICategory[] }> = React.memo(({ tabIndex, handleTabClick, shop }) => {
  
  const getNameByCategoryName = (categoryName: string) => {
    let name = "Не ясно"
    switch (categoryName) {
      case "MIND":
        name = "Ум"
        break
      case "PHYSICAL EDUCATION":
        name = "Физуха"
        break
      case "CLOTHES":
        name = "Одежда"
        break
    }
    return name
  }
  
  return (
    <div className="mt-2 px-4 shop-tabs mx-10 flex flex-row gap-2 items-center justify-center">
        {shop.map((category, index) => (
          <div
            key={index}
            className={`
              shop-tab 
              ${tabIndex === index
                ? "shop-tab-active"
                : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {getNameByCategoryName(category.categoryName)}
          </div>
        ))}
    </div>
  );
});
