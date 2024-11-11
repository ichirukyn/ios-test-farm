import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { useWalletStore } from '@/providers/wallet';

const useUpdateWalletStatus = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setIsWalletInit, setIsTestTransaction } = useWalletStore()

  const updateWalletStatus = useCallback(
    async () => {
      try {
        const res = await apiFetch('/wallet/status', 'GET', enqueueSnackbar);
        
        //console.log(res);
        
        setIsWalletInit(res.walletStatus)
        setIsTestTransaction(res.transactionStatus)
       
      } catch (error) {
        console.error('Error updating wallet status, ', error);
        enqueueSnackbar('Error updating wallet status', { variant: 'error' });
      } 
      return null;
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { updateWalletStatus };
};

export default useUpdateWalletStatus;