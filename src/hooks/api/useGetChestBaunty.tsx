import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useGetChestBaunty = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerInvoice, player } = useUserStore();

  const getChestBaunty = useCallback(
    async (itemId: string) => {
   
      try {
        const res = await apiFetch('/chest/take/baunty', 'POST', { itemId }, enqueueSnackbar);

        updatePlayerInvoice(res.coins || 0, res.usdt || 0, res.keys || 0, player?.lastKeyReady || "");

        onSuccess && onSuccess()
        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { getChestBaunty }
}
