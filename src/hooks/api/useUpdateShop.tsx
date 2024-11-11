import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useUpdateShop = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setShop } = useUserStore();

  const updateShop = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/shop/items', 'POST', {}, enqueueSnackbar);
        console.log(res)
        setShop(res)
        
      } catch (error: any) {
        enqueueSnackbar(`Error during update shop: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { updateShop }
}


// import { useCallback } from 'react';
// import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

// const useUpdateShop = (apiFetch: any, showLoading: any, hideLoading: any) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const updateShop = useCallback(
//     async () => {
//       try {
//         showLoading(); // Show loading state
//         const res = await apiFetch(
//           '/market/getMarket',
//           'GET',
//           null,
//           enqueueSnackbar
//         );
//         console.log(res);
//         if (res.status === true) {
//           // Handle successful response
//         }
//       } catch (error) {
//         console.error('Error updating user shop:', error);
//         enqueueSnackbar('Error updating shop', { variant: 'error' });
//       } finally {
//         hideLoading(); // Hide loading state
//       }
//       return null;
//     },
//     [apiFetch, enqueueSnackbar, showLoading, hideLoading] // Dependencies
//   );

//   return { updateShop };
// };

// export default useUpdateShop;