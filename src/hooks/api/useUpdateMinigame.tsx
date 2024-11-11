import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useUpdateMinigame = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setMinigame } = useUserStore();

  const updateMinigame = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/minigame/info', 'POST', {energy:0}, enqueueSnackbar);
        
        console.log(res)
        setMinigame(res.minigame);
        
      } catch (error: any) {
        enqueueSnackbar(`Error during allQuestsInfo: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { updateMinigame }
}
