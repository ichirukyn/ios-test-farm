import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useNavigate } from 'react-router-dom';

export const useSimpleBuyKeys = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerInvoice, player } = useUserStore();
  //const navigate = useNavigate()

  const simpleBuyKeys = useCallback(
    async (numKeys: number) => {
   
      try {
        const res = await apiFetch('/player/keys/buy', 'POST', { numKeys }, enqueueSnackbar);

        updatePlayerInvoice(player?.balance || 0, player?.usdt || 0, res.numKeys, player?.lastKeyReady || "");
        onSuccess && onSuccess()
        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { simpleBuyKeys }
}
