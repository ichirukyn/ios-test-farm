import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

const useUpdateTotalBalance = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerInvoice } = useUserStore();

  const updateTotalBalance = useCallback(
    async () => {
      try {
        const res = await apiFetch('/player/balance/all', 'GET', enqueueSnackbar);
        console.log(res);        
        
        updatePlayerInvoice(res.balance, res.usdt, res.numKeys, res.lastKeyReady);
       
      } catch (error) {
        console.error('Error updating user balance (invoice) ', error);
        enqueueSnackbar('Error updating user balance (invoice)', { variant: 'error' });
      } 
      return null;
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { updateTotalBalance };
};

export default useUpdateTotalBalance;