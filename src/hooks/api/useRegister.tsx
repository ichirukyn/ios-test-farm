import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import Auth from '@/services/api/auth';
import { useUserStore } from '@/providers/user';
import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useRegister = (apiFetch: any, loadResources: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setPlayer } = useUserStore();

  const register = useCallback(
    async (initData: string) => {
   
      try {

        const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe
        // Extract the 'startapp' command from initDataUnsafe
        const command = initDataUnsafe.start_param || initDataUnsafe.startapp;

        let res;

        // Example: you can handle this command by sending it to your server or using it in your app logic
        if (command) {
          console.log('Executing command:', command);
          res = await apiFetch('/auth/register-with-command', 'POST', { initData, command }, enqueueSnackbar);
          // Perform actions based on the command
          // e.g., Fetch data, navigate to specific page, etc.
        } else {
          res = await apiFetch('/auth/register', 'POST', { initData }, enqueueSnackbar);
        }


        /* Set tokens */
        if (res.accessToken) {
          Auth.accessToken = res.accessToken;
        }

        if (res.refreshToken) {
          Auth.refreshToken = res.refreshToken;
        }
        
        if (res.player) {

          const player = res.player as IPlayer;
          setPlayer(player);

          console.log(player);

          loadResources(); 
        }
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during login: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar, loadResources] // Dependencies
  )

  return { register }
}
