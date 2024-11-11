import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useUpdateEnergy = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerEnergy } = useUserStore();

  const updateEnergy = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/player/energy', 'POST', {energy:0}, enqueueSnackbar);

        if (res.energyLatest && res.energyMax) {
          updatePlayerEnergy(res.energyLatest, res.energyMax)
        }
        
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during update energy: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { updateEnergy }
}
