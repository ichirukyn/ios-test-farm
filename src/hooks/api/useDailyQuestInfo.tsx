import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useUserStore } from '@/providers/user';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useDailyQuestInfo = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setDailyQuest } = useUserStore();

  const dailyQuestInfo = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/daily-reward/info', 'POST', {energy:0}, enqueueSnackbar);
        setDailyQuest(res);
        
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during dailyQuestInfo: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { dailyQuestInfo }
}
