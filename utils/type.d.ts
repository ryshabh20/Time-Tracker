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

interface TimerProps {
  startTiming?: Date;
}

interface Client {
  clientname: string;
  contactnumber: string;
  country: string;
  email: string;
  status: boolean;
  _id: string;
}
