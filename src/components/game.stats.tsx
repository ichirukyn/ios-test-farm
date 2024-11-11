import useUpdateTotalBalance from "@/hooks/api/useUpdateTotalBalance"
import { useUserStore } from "@/providers/user"
import { apiFetch } from "@/services/api"
import { FC, useEffect } from "react"

interface GameStatsProps {
  onBuyKeys: () => void
  onWithdraw: () => void
  onMenu: () => void
}

const GameStats:FC<GameStatsProps> = (props) => {

  const { onBuyKeys, onWithdraw, onMenu } = props

  const { player } = useUserStore()
  const balance = player?.balance || 0
  const usdt = player?.usdt || 0
  const numKeys = player?.numKeys || 0

  const { updateTotalBalance } = useUpdateTotalBalance(apiFetch)

  useEffect(() => {
    updateTotalBalance()
  }, [])

  return (
    <div className="header fixed w-screen p-4 flex flex-row z-10">
      <div className="w-[24%] flex flex-row gap-1 items-center">
        <img className="w-8 h-8" src="/stats/coin.webp" alt="coin" />
        <div className="flex flex-col items-start justify-evenly stats-item pl-1">
          <div className="stats-value">{balance > 1000 ? `${(balance/1000).toFixed(1)}K` : balance}</div>
          <div className="stats-type uppercase">coin</div>
        </div>
      </div>
      <div className="stats-spacer mx-1 my-2 opacity-60"></div>
      <div className="w-[31%] flex flex-row gap-2 items-center">
        <img className="w-8 h-8" src="/stats/usdt.webp" alt="coin" />
        <div className="flex flex-col items-start justify-evenly stats-item pl-1">
          <div className="stats-value">{(usdt/100).toFixed(2)}</div>
          <div className="stats-type uppercase">usdt</div>
        </div>
        <div className="btn-no-body" onClick={onWithdraw}>
          <img className="w-6 h-6" src="/stats/wallet.svg" alt="plus usdt" />
        </div>
      </div>
      <div className="stats-spacer mx-1 my-2 opacity-60"></div>
      <div className="w-[31%] flex flex-row gap-2 items-center">
        <img className="w-8 h-8" src="/stats/farm.webp" alt="coin" />
        <div className="flex flex-col items-start justify-evenly stats-item pl-1">
          <div className="stats-value">{numKeys}</div>
          <div className="stats-type uppercase">keys</div>
        </div>
        <div className="btn-no-body" onClick={onBuyKeys}>
          <img className="w-6 h-6" src="/stats/plus.svg" alt="plus coin" />
        </div>
      </div>
      <img className="w-8 h-8" src="/stats/menu.svg" alt="plus coin" onClick={onMenu} />
    </div>       
  )
}

export default GameStats