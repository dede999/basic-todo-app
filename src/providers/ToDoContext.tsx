import React from 'react'

export interface ITask {
  title: string
  is_complete?: boolean
}

type Task = {
  task_list: ITask[]
  add_task(): void
  remove_task(task_title: string): void
  edit_task(task: ITask): void
}

export default React.createContext<Task>({
  task_list: [],
  add_task: () => console.log(""),
  edit_task: (task: ITask) => console.log(task),
  remove_task: (task_title: string) => console.log(task_title),
})
