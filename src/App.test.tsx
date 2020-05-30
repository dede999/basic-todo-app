import App from './App'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

describe("App.tsx", () => {

  it("should be able to render the component", () => {
    const { asFragment } = render(<App />)
    expect(asFragment(<App />)).toMatchSnapshot()
  })

  it("should create a task and show it", () => {
    render(<App />)
    const element = screen.getByText(/create/i)
    fireEvent.click(element)
    expect(screen.getAllByText(/delete/i)).toHaveLength(1)
  })

  it ("should be able to update some task", () => {
    render(<App />)
    fireEvent.click(screen.getByText(/create/i))
    const edit = screen.getAllByText(/edit/i)[0]
   
    // start editing
    fireEvent.click(edit)
    fireEvent.change(screen.getByTestId(/editing/), {
      target: { value: "My Super Task" }
    })
    fireEvent.click(screen.getAllByText(/save/i)[0])
    // done editing
     
    expect(screen.getByText(/^My/i)).toBeTruthy
  })

  it ("should delete a task", () => {
    render(<App />)

    fireEvent.change(screen.getByTestId(/creating/), {
      target: { value: "My Super Test" }
    })
    
    fireEvent.click(screen.getByText(/create/i))
    const number_of_itens = screen.getAllByText(/edit/i).length
    console.log(number_of_itens)

    // deleting an item
    fireEvent.click(screen.getAllByText(/delete/i)[0])
    expect(screen.getAllByText(/edit/i).length).toBeLessThan(number_of_itens)
  })
})