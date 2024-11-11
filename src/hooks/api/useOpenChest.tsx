import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useChestsStore } from '@/providers/chests';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useOpenChest = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setTape, setItems, setBaunty } = useChestsStore();

  const openChest = useCallback(
    async (tapeId: string, chestId: string) => {
   
      try {
        const res = await apiFetch('/chest/open', 'POST', {tapeId, chestId}, enqueueSnackbar);
        
        setTape(res.tape)
        const items = res.tape.chests.map((chest: any) => chest.item);
        setItems(items);

        const baunty = res.item;
        setBaunty(baunty);
        
      } catch (error: any) {
        console.error('Error during open chest', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during open chest: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { openChest }
}
