import App from './App'
import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

const setup = (label: string) => {
  const utils = render(<App />)
  const input = utils.getByLabelText(label)
  return {
    input,
    ...utils,
  }
}

describe("App.tsx", () => {
  
  afterEach(cleanup)

  it("should be able to render the component", () => {
    const { asFragment } = render(<App />)
    expect(asFragment(<App />)).toMatchSnapshot()
  })

  it("should create a task and show it", () => {
    const { getByText, getAllByText } = render(<App />)
    const element = getByText(/create/i)
    fireEvent.click(element)
    expect(getAllByText(/delete/i)).toHaveLength(1)
  })

  it ("should be able to update some task", () => {
    const { getByText, getAllByText, getByTestId } = render(<App />)
    fireEvent.click(getByText(/create/i))
    const edit = getAllByText(/edit/i)[0]
   
    // start editing
    fireEvent.click(edit)
    fireEvent.change(getByTestId(/editing/), {
      target: { value: "My Super Task" }
    })
    fireEvent.click(getAllByText(/save/i)[0])
    // done editing
     
    expect(getByText(/^My/i)).toBeTruthy
  })

  it ("should delete a task", () => {
    const { getByText, getAllByText, getByTestId } = render(<App />)

    fireEvent.change(getByTestId(/creating/), {
      target: { value: "My Super Test" }
    })
    fireEvent.click(getByText(/create/i))
    const number_of_itens = getAllByText(/edit/i).length
    console.log(number_of_itens)

    // deleting an item
    fireEvent.click(getAllByText(/delete/i)[0])
    expect(getAllByText(/edit/i).length).toBeLessThan(number_of_itens)
  })
})