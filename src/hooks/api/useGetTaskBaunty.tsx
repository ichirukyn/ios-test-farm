import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { ITask } from '@/types';
import { useUserStore } from '@/providers/user';

const useGetTaskBaunty = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setDailyTasks, setSeasonTasks, updatePlayerInvoice, player  } = useUserStore();

  const getTaskBaunty = useCallback(
    async (taskId: string) => {
      try {
        const res = await apiFetch('/tasks/baunty', 'POST', { taskId }, enqueueSnackbar);

        // Filter tasks into dailyTasks and seasonTasks

        console.log('getTaskBaunty response:');
        console.log(res);

        if (res.tasks) {
          const dailyTasks = res.tasks.filter((task: ITask) => task.templateTask.isDaily);
          const seasonTasks = res.tasks.filter((task: ITask) => !task.templateTask.isDaily);
            
          setDailyTasks(dailyTasks);
          setSeasonTasks(seasonTasks);
        }

        const stats = res.playerStats
        if (stats) {
          updatePlayerInvoice(stats.balance, stats.usdt, stats.numKeys, player?.lastKeyReady || "");
        }

        onSuccess && onSuccess();
        
        //console.log(res);
      } catch (error) {
        console.error('Error updating user tasks:', error);
        enqueueSnackbar('Error updating tasks', { variant: 'error' });
      }
    },
    [apiFetch, enqueueSnackbar, setDailyTasks, setSeasonTasks] // Dependencies
  );

  return { getTaskBaunty };
};

export default useGetTaskBaunty;

