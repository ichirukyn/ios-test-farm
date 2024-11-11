import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user'

export const useFarm = (apiFetch: any, onSuccess: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerBalance, updatePlayerEnergy } = useUserStore();

  const farm = useCallback(
    async (data: {
      energy: number,
      money: number,
    }) => {
   
      try {
        const res = await apiFetch('/player/farm', 'POST', {...data}, enqueueSnackbar);
        if (res.balance) {
          updatePlayerBalance(res.balance)
          onSuccess()
        }

        if (res.energyLatest && res.energyMax) {
          updatePlayerEnergy(res.energyLatest, res.energyMax)
        }

      } catch (error: any) {

        enqueueSnackbar(`Error during farm: ${error}`, { variant: 'error' });
      } finally {}
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { farm, onSuccess }
}
