import './App.sass'
import React from 'react'
import TaskView from './components/TaskView'
import { Input, Button } from '@material-ui/core'
import ToDoContext, { ITask } from './providers/ToDoContext'

class App extends React.Component {

  state = {
    task_list: [] as ITask[],
    title: "Some task ..."
  }

  componentDidMount() {
    const tasks = localStorage.getItem("tasks")
    if(tasks) {
      this.setState({
        task_list: JSON.parse(tasks)
      })
    }
  }

  save_in_localStorage = () => {
    localStorage.setItem(
      "tasks", 
      JSON.stringify(this.state.task_list)
    )
  }
  
  add_task = () => {
    this.setState({
      task_list: [...this.state.task_list, {
        title: this.state.title,
        is_complete: false
      }],
      title: "Some Task ..."
    }, () => this.save_in_localStorage())
  }

  edit_task = (task: ITask, original: string) => {
    const index = this.state.task_list.findIndex(
      (arr_task: ITask) => original === arr_task.title
    )
    this.state.task_list.splice(index, 1, task)
    this.setState({
      task_list: this.state.task_list
    }, () => this.save_in_localStorage())
  }
  
  remove_task = (task_title: string) => {
    const new_list = this.state.task_list.filter(
      (arr_task: ITask) => task_title !== arr_task.title
    )
    this.setState({
      task_list: new_list
    }, () => {
      this.save_in_localStorage()
      window.location.reload()
    })
  }

  set_field = (e: any) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <ToDoContext.Provider 
        value={{
          task_list: this.state.task_list,
          add_task: this.add_task,
          edit_task: this.edit_task,
          remove_task: this.remove_task
        }}>
        <h1> Basic ToDo </h1>
        <div className="container">
          <ToDoContext.Consumer>
            {({ task_list, add_task }) => (
              <div className="content">
                <div className="title-box">
                  <Input
                    defaultValue={this.state.title}
                    name="title"
                    className="MuiInputBase-input title"
                    onChange={(e: any) => this.set_field(e)} />
                  <Button variant="outlined" onClick={add_task}>
                    Create
                  </Button>
                </div>
                <div className="task-list">
                  { task_list.map((task, i) =>
                    <TaskView a_task={task} key={i} />
                  ) }
                </div>
              </div>
            )}
          </ToDoContext.Consumer>
        </div>
      </ToDoContext.Provider>
    )
  }
}

export default App;
