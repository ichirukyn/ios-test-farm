import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useAllQuestsInfo = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setDailyQuest, setMinigame } = useUserStore();

  const allQuestsInfo = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/info', 'POST', {energy:0}, enqueueSnackbar);
        
        console.log(res)

        if (res.dailyReward) {
            setDailyQuest(res.dailyReward);
        }

        if (res.minigame) {
            setMinigame(res.minigame);
        }
        
      } catch (error: any) {
        enqueueSnackbar(`Error during allQuestsInfo: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { allQuestsInfo }
}
