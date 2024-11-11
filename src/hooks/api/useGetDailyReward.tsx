import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useGetDailyReward = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setDailyQuest, updatePlayerBalance, updateDailyQuest } = useUserStore();

  const getDailyReward = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/daily-reward', 'POST', {energy:0}, enqueueSnackbar);
        
        console.log('res', res)
        updatePlayerBalance(res.balance)
        setDailyQuest(res.dailyReward)
        
        // set recieved to true
        updateDailyQuest(true)

        onSuccess && onSuccess()
        
      } catch (error: any) {
        enqueueSnackbar(`Error during dailyQuestInfo: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { getDailyReward }
}
