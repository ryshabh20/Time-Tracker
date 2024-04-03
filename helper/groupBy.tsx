export const groupBy = (data: TimeEntry[] | PopulatedTimeEntry[]) => {
  // @ts-ignore
  const result = Object.groupBy(
    data,
    (data: TimeEntry | PopulatedTimeEntry) => {
      return new Date(data.start_time).toLocaleDateString();
    }
  );
  return result;
};
