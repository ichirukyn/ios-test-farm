import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

const useUpdateUser = (apiFetch: any, showLoading: any, hideLoading:any) => {
  const { enqueueSnackbar } = useSnackbar();

  const updateUser = useCallback(
    async (initData: any) => {
      try {
        showLoading(); // Show loading state
        const res = await apiFetch('/auth/login', 'POST', { initData }, enqueueSnackbar);
        console.log(res);
        if (res.status === true) {
          // Await other updates if needed
          // await Promise.all([updateTasks(), updateFriends(), updateShop()])
        }
      } catch (error) {
        console.error('Error updating user:', error);
        enqueueSnackbar('Error updating user', { variant: 'error' });
      } finally {
        hideLoading(); // Hide loading state
      }
      return null;
    },
    [apiFetch, enqueueSnackbar, showLoading, hideLoading] // Dependencies
  );

  return { updateUser };
};

export default useUpdateUser;