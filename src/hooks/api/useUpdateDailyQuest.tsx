import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useNavigate } from 'react-router-dom';

export const useUpdateDailyQuest = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setDailyQuest } = useUserStore();

  const updateDailyQuest = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/daily-reward/info', 'POST', {}, enqueueSnackbar);

        console.log(res)

        if (res.dailyReward) {
            setDailyQuest(res.dailyReward);
        }
        
        onSuccess && onSuccess()

        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { updateDailyQuest }
}
