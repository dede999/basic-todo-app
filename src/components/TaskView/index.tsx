import './index.sass'
import React from 'react'
import ToDoContext, { ITask } from '../../providers/ToDoContext';
import { Input, Checkbox, Button } from '@material-ui/core';

interface Props {
  a_task: ITask
}

interface State {
  the_task: ITask,
  original_task: string,
  edition_mode: boolean
}

export default class TaskView extends React.Component<Props, State> {
  state = {
    the_task: {
      title: "",
      is_complete: false
    },
    original_task: "",
    edition_mode: false
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

  complete_class = (): string => {
    const { is_complete } = this.state.the_task
    return is_complete ? 'complete' : 'incomplete'
  }

  render() {
    const { title, is_complete } = this.state.the_task
    const { original_task, the_task, edition_mode } = this.state

    return(
      <ToDoContext.Consumer>
        {({edit_task, remove_task}) => (
          <div className={`task-list-item ${this.complete_class()}`}>
            <div className="main">
              { edition_mode 
                ? <>
                    <Checkbox 
                      checked={is_complete}
                      color="primary"
                      onChange={() => this.setState({
                        the_task: { title: title, is_complete: !is_complete }
                      })} 
                    />
                    <Input
                      placeholder={title}
                      inputProps={{ "data-testid": "editing" }}
                      onChange={(e: any) => this.setState({
                        the_task: { title: e.target.value, is_complete: is_complete }
                      })} 
                    />
                  </>
                : 
                <>
                  <span className="title"> { title } </span>
                </>
              }
            </div>
            <div className="actions">
            { edition_mode
              ? 
              <Button variant="outlined" 
                onClick={() => {
                  edit_task(the_task, original_task)
                  this.setState({ edition_mode: false })
              }}>
                Save
              </Button>
              :
              <Button variant="outlined" 
                onClick={() => this.setState({
                  edition_mode: true
              })}>
                Edit
              </Button>              
            }
              <Button variant="outlined" 
                onClick={() => remove_task(title)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </ToDoContext.Consumer>
    )
  }
}