interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  order: number;
}

interface ProjectEntity {
  id: string;
  title: string;
  createdTime: Number;
  tasks: Task[];
}

export { ProjectEntity, Task };
