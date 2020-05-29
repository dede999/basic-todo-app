import React from 'react'
import ToDoContext, { ITask } from '../../providers/ToDoContext';
import { Input, Checkbox, Button } from '@material-ui/core';

interface Props {
  a_task: ITask
}

interface State {
  the_task: ITask,
  original_task: string
}

export default class TaskView extends React.Component<Props, State> {
  state = {
    the_task: {
      title: "",
      is_complete: false
    },
    original_task: ""
  }
  
  componentDidMount() {
    const { title, is_complete } = this.props.a_task
    this.setState({
      the_task: {
        title: title,
        is_complete: is_complete
      },
      original_task: title
    })
  }

  render() {
    const { title, is_complete } = this.state.the_task
    const { original_task, the_task } = this.state

    return(
      <ToDoContext.Consumer>
        {({edit_task, remove_task}) => (
          <div className="task-list-item">
            <Checkbox 
              checked={is_complete} 
              onChange={(e: any) => this.setState({
                the_task: { title: title, is_complete: !is_complete }
              })} />
            <Input
              placeholder={title}
              onChange={(e: any) => this.setState({
                the_task: { title: e.target.value, is_complete: is_complete }
              })} />
            <div className="actions">
              <Button onClick={() => edit_task(the_task, original_task)}>
                Save
              </Button>
              <Button onClick={() => remove_task(title)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </ToDoContext.Consumer>
    )
  }
}