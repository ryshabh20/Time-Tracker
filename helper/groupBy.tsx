interface Entry {
  _id: string;
  user_id: string;
  start_time: string;
  task: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  duration: number;
  end_time: string;
}
interface TimeEntry {
  _id: string;
  user_id: string;
  start_time: string;
  task: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  duration: number;
  end_time: string;
}

export const groupBy = (data: TimeEntry[]) => {
  // @ts-ignore
  const result = Object.groupBy(data, (data: Entry) => {
    return new Date(data.start_time).toLocaleDateString();
  });
  return result;
};
