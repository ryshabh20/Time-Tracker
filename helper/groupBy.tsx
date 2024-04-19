"use client";
export const groupBy = (data: TimeTrackerEntries[]) => {
  // @ts-ignore
  const result = Object.groupBy(
    data,
    (data: TimeTrackerEntries | PopulatedTimeEntry) => {
      return new Date(data.start_time).toLocaleDateString();
    }
  );
  return result;
};
