import App from './App'
import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

describe("App.tsx", () => {
  
  afterEach(cleanup)

  it("should be able to render the component", () => {
    const { asFragment } = render(<App />)
    expect(asFragment(<App />)).toMatchSnapshot()
  })

  it("should create a task", () => {
    const { getByText, getAllByText } = render(<App />)
    const element = getByText(/create/i)
    fireEvent.click(element)
    expect(getAllByText(/delete/i)).toHaveLength(1)
  })

  
})