import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useWalletStore } from '@/providers/wallet';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useRegisterWallet = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setIsWalletInit } = useWalletStore();

  const registerWallet = useCallback(
    async (wallet: any) => {
   
      try {
        const res = await apiFetch('/wallet/register', 'POST', {wallet}, enqueueSnackbar);

        setIsWalletInit(res.walletStatus)
        
      } catch (error: any) {
        console.error('Error during register wallet', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during register wallet: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { registerWallet }
}
