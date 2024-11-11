import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { ITask } from '@/types';
import { useUserStore } from '@/providers/user';

const useUpdateTasksStatus = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setDailyTasks, setSeasonTasks } = useUserStore();

  const updateTasksStatus = useCallback(
    async () => {
      try {
        const res = await apiFetch('/tasks/check', 'POST', {}, enqueueSnackbar);

        const dailyTasks = res.filter((task: ITask) => task.templateTask.isDaily);
        const seasonTasks = res.filter((task: ITask) => !task.templateTask.isDaily);

        setDailyTasks(dailyTasks);
        setSeasonTasks(seasonTasks);
        
        //console.log(res);
      } catch (error) {
        console.error('Error updating user tasks status:', error);
        enqueueSnackbar('Error updating tasks', { variant: 'error' });
      }
    },
    [apiFetch, enqueueSnackbar, setDailyTasks, setSeasonTasks] // Dependencies
  );

  return { updateTasksStatus };
};

export default useUpdateTasksStatus;


// const useUpdateTasks = (apiFetch: any, showLoading: any, hideLoading: any) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const updateTasks = useCallback(
//     async () => {
//       try {
//         showLoading(); // Show loading state
//         const res = await apiFetch('/mission/getMissions', 'GET', null, enqueueSnackbar);
//         console.log(res);
//         if (res.status === true) {
//           console.log('Tasks from server received');
//           //const missions = res.data.missions;
//           //setAllTasks(missions);
//         }
//       } catch (error) {
//         console.error('Error updating user tasks:', error);
//         enqueueSnackbar('Error updating tasks', { variant: 'error' });
//       } finally {
//         hideLoading(); // Hide loading state
//       }
//       return null;
//     },
//     [apiFetch, enqueueSnackbar, showLoading, hideLoading] // Dependencies
//   );

//   return { updateTasks };
// };

// export default useUpdateTasks;