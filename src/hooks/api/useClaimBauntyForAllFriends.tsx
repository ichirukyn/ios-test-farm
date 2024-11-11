import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useClaimBauntyForAllFriends = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { 
    updatePlayerInvoice,
    setClaimedAll,
    player
  } = useUserStore();

  const claimBauntyForAll = useCallback(
    async (page: number, take: number) => {
         
      try {
        const res = await apiFetch('/player/referrals/claim/all', 'POST', { page, take }, enqueueSnackbar);
        console.log(res);

        const stats = res.stats
        if (stats) {
          updatePlayerInvoice(stats.balance, stats.usdt, stats.numKeys, player?.lastKeyReady || "");
        }

        if (res.claimedAll) {
            setClaimedAll(res.claimedAll);
        }

        onSuccess && onSuccess()
  
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
        console.error('Error updating user friends:', error);
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { claimBauntyForAll  }
}