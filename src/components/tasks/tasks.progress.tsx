import {FC, useEffect, useState} from "react";

interface ITasksProgress {
  value: number;
  maxValue: number;
}

export const TasksProgress: FC<ITasksProgress> = ({value, maxValue}) => {
  const [width, setWidth] = useState(0)

  const updateProgress = () => {
    setWidth((value / maxValue) * 100);
  }

  const formatNumber = (count: number): string => {
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(0) + 'к';
    return count.toString();
  };

  useEffect(updateProgress, [value, maxValue]);

  return (
    <div className="task-progress">
      <div className="task-progress-fill" style={{width: `${width}%`}}></div>
      <div className="task-progress-text">{formatNumber(value)}/{formatNumber(maxValue)}</div>
    </div>
  )
}