import React from 'react'
import ToDoContext, { ITask } from '../../providers/ToDoContext';
import { Input, Checkbox, Button } from '@material-ui/core';

interface Props {
  a_task: ITask
}

interface State {
  the_task: ITask
}

export default class TaskView extends React.Component<Props, State> {
  state = {
    the_task: {
      title: "",
      is_complete: false
    }
  }
  
  componentDidMount() {
    const { title, is_complete } = this.props.a_task
    this.setState({
      the_task: {
        title: title,
        is_complete: is_complete
      }
    })
  }

  render() {
    const { title, is_complete } = this.state.the_task
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
              defaultValue={title}
              onChange={(e: any) => this.setState({
                the_task: { title: e.target.value, is_complete: is_complete }
              })} />
            <div className="actions">
              <Button onClick={() => edit_task(this.state.the_task)}>
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