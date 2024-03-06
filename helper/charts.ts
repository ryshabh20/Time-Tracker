// import TimeEntries from "@/db/models/timeEntries";

// export const chartsData = async () => {
//   const oneWeekAgo = new Date();
//   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//   const response = await TimeEntries.find({ end_time: { $gte: oneWeekAgo } });
//   const duration = await TimeEntries.aggregate([
//     {
//       $match: {
//         end_time: { $exists: true },
//       },
//     },
//     {
//       $group: {
//         _id: { $dateToString: { format: "%u,%m,%B", date: "$end_time" } },
//         totalDuration: {
//           $sum: {
//             $subtract: ["$end_time", "$start_time"],
//           },
//         },
//       },
//     },
//   ]);
//   return { response, duration };
// };
