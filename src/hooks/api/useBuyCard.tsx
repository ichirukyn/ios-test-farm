import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useNavigate } from 'react-router-dom';

export const useBuyCard = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  //const navigate = useNavigate()
  const { setShop, updatePlayerBalance, updatePlayerIncome } = useUserStore();

  const buyCard= useCallback(
    async (cardId: string) => {
   
      try {
        const res = await apiFetch('/shop/buy', 'POST', { cardId }, enqueueSnackbar);
        console.log(res)
        setShop(res.categories)
        updatePlayerBalance(res.balance)
        updatePlayerIncome(res.incomePerHour)  
        //navigate('/')
        onSuccess && onSuccess()

        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { buyCard }
}
