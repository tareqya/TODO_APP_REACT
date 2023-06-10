interface NavTab {
  key: string;
  path: string;
  title: string;
}

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  order: number;
}

interface ProjectEntity {
  id: string;
  title: string;
  tasks: Task[];
  createdTime: Number;
}

export { NavTab, Task, ProjectEntity };
