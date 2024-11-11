import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user'

export const useGameplayTick = (apiFetch: any, onSuccess: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerBalance, updatePlayerEnergy } = useUserStore();

  const tick = useCallback(
    async (data: {
      energy: number,
      money: number,
    }) => {
   
      try {
        const res = await apiFetch('/player/tick', 'POST', {...data}, enqueueSnackbar);

        if (res.energyLatest && res.energyMax) {
          updatePlayerEnergy(res.energyLatest, res.energyMax)
        }

        if (res.incomeAdded) {
          /* do something with new passive income */
          //updatePlayerBalance(res.money)
        }

        if (res.balance) {
          updatePlayerBalance(res.balance)
          onSuccess(res.balance, res.energyLatest)
        }

        onSuccess(null, res.energyLatest)


      } catch (error: any) {

        enqueueSnackbar(`Error during gameplay tick: ${error}`, { variant: 'error' });
      } finally {}
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { tick, onSuccess }
}
