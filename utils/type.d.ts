interface Entry {
  _id: string;
  user_id: string;
  start_time: string;
  task: string;
  createdAt: string;
  updatedAt: string;
  project_id: EntryProjectDetails;
  __v: number;
  duration: number;
  end_time: string;
}
interface Duration {
  _id: string;
  totalDuration: string;
}

interface TimeEntryDetails {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    employee?: {
      _id: string;
      designation: string;
    };
  };
  project_id: {
    _id: string;
    projectname: string;
  };
  start_time: string;
  task: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  duration: number;
  end_time: string;
}
interface EntryProjectDetails {
  _id: string;
  projectname: string;
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

interface TableHeaders {
  name: string;
  sortvalue?: string;
}

interface Project {
  _id: string;
  projectname: string;
  client: string;
  clientname: string;
  technology: string;
  hoursAlloted: number | null;
  hoursConsumed: number | null;
  hoursLeft: number | null;
  description: string;
  assignedTeam: string[];
}

interface PopulatedTimeEntry {
  _id: string;
  user_id: {
    _id: string;
    name: string;
  };

  project_id: {
    _id: string;
    projectname: string;
    hoursConsumed: number;
    hoursLeft: number;
    hoursAlloted: number;
  };

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

  project_id: string;

  start_time: string;
  task: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  duration: number;
  end_time: string;
}

interface TimeTrackerEntries {
  _id: string;
  user_id: string;

  project_id: {
    _id: string;
    projectname: string;
  };

  start_time: string;
  task: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  duration: number;
  end_time: string;
}

interface Employee {
  _id: string;
  employeename: string;
  code: string;
  desingation: string;
  department: string;
  technologies: string[];
  permission: string[];
  createdBy: string;
}
