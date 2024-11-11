import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

const useUpdateFriends = (apiFetch: any, showLoading: any, hideLoading: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const updateFriends = useCallback(
    async () => {
      try {
        showLoading(); // Show loading state
        const res = await apiFetch(
          '/referral/getReferrals?line=1&offset=10',
          'GET',
          null,
          enqueueSnackbar
        );
        console.log(res);
        if (res.status === true) {
          // Handle successful response
        }
      } catch (error) {
        console.error('Error updating user friends:', error);
        enqueueSnackbar('Error updating friends', { variant: 'error' });
      } finally {
        hideLoading(); // Hide loading state
      }
      return null;
    },
    [apiFetch, enqueueSnackbar, showLoading, hideLoading] // Dependencies
  );

  return { updateFriends };
};

export default useUpdateFriends;