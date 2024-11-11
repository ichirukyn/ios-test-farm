

import BauntyItem from "@/components/farm/baunty.item";
import { useGetChestBaunty } from "@/hooks/api/useGetChestBaunty";
import useUpdateChests from "@/hooks/api/useUpdateChests";
import { useChestsStore } from "@/providers/chests";
import { apiFetch } from "@/services/api";
//import { apiFetch } from "@/services/api";
import {FC, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {IChestItem} from "@/types/chest.ts";
import {BauntyColor} from "@/const/baunty.color.tsx";
import {useSiteStore} from "@/providers/store";


function getItemVariant(type: string) {
  switch (type) {
    case 'USDT': return 'farm/big-usdt.png'
    case 'COINS': return 'farm/big-coin.png'
    case 'KEYS': return 'farm/big-key.png'
    default:
      return '/farm/big-keys.png'
  }
}

const Baunty: FC = () => {
  const { setIsFooterTransparent } = useSiteStore()

  useEffect(() => {
    setIsFooterTransparent(true);
  }, [setIsFooterTransparent]);

  const { baunty } = useChestsStore();

  const navigate = useNavigate()

  const onSuccessUpdateChests = () => {
    navigate('/')
  }

  const { updateChests } = useUpdateChests(apiFetch, onSuccessUpdateChests)

  const onSuccessBaunty = () => {
    console.log('onSuccessBaunty')
    updateChests()
  }

  const {getChestBaunty} = useGetChestBaunty(apiFetch, onSuccessBaunty)

  const handleClaimClick = () => {  
    //console.log('handleClaimClick')
    getChestBaunty(baunty?.id || '')
  }

    return (
    <div className='w-full'>

      <div className='shop-dialog-title mt-8 uppercase px-2'>find a Great Prize!</div>
      <div className='mt-3 shop-dialog-description px-2'>
        9 Types of Rewards Available
      </div>

      <div className='farm-reward flex flex-col justify-center items-center pt-8 gap-4'>
        <div className='flex items-center justify-center w-full p-4 farm-reward-icon'>
          <div
            className="farm-reward-icon-blur"
            style={{background: BauntyColor[baunty?.type || "COMMON"]}}
          >
          </div>
          <img src={getItemVariant(baunty?.variant || 'KEYS')} alt=""/>
        </div>

        <div className="farm-reward-info flex flex-col items-center gap-2.5">
          {/* TODO: Добавить Проценты. Убрать моки. Ввести typeTitle (EPIC => uniq)*/}
          <div className="farm-reward-type">{baunty?.type || 'epic 0.4%'}</div>
          <div className='farm-reward-title'>{baunty?.value || '500'}</div>
          <div className='farm-reward-variant'>{baunty?.variant || 'coin'}</div>
        </div>

        <div className="h-20 max-w-60 w-full function-btn btn-no-body flex items-center justify-center mx-2 mt-6"
             onClick={handleClaimClick}
        >
          CLAIM
        </div>
      </div>
    </div>
    )
}
export default Baunty
