import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useWinMinigame = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setMinigame } = useUserStore();

  const winMinigame = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/minigame', 'POST', {win:true}, enqueueSnackbar);
        
        console.log(res)

        if (res) {
            setMinigame(res);
        }

        onSuccess && onSuccess()

      } catch (error: any) {
        enqueueSnackbar(`Error during win minigame: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { winMinigame }
}
