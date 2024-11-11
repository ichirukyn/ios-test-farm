import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

const useUpdateIncome = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerBalance } = useUserStore();

  const updateIncome = useCallback(
    async () => {
      try {
        const res = await apiFetch('/player/income', 'POST', {}, enqueueSnackbar);
        console.log(res);
        
        if (res.newBalance) {
          updatePlayerBalance(res.newBalance)
        }
       
      } catch (error) {
        console.error('Error updating user income per hour, ', error);
        enqueueSnackbar('Error updating user income per hour', { variant: 'error' });
      } 
      return null;
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { updateIncome };
};

export default useUpdateIncome;