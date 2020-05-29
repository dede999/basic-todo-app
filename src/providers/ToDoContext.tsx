import React from 'react'

export interface ITask {
  title: string
  is_complete?: boolean
}

type Task = {
  task_list: ITask[]
  add_task(): void
  remove_task(task_title: string): void
  edit_task(task: ITask, original: string): void
}

export default React.createContext<Task>({
  task_list: [],
  add_task: () => console.log(""),
  remove_task: (task_title: string) => console.log(task_title),
  edit_task: (task: ITask, original: string) => console.log(task),
})
