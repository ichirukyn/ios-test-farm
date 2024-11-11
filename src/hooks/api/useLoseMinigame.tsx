import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useLoseMinigame = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setMinigame } = useUserStore();

  const loseMinigame = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/minigame', 'POST', {win:false}, enqueueSnackbar);
        
        if (res) {
            setMinigame(res);
        }

        onSuccess && onSuccess()

      } catch (error: any) {
        enqueueSnackbar(`Error during lose minigame: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { loseMinigame }
}
