import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import About from "../pages/about";

describe('About', () => {
    it('render the about page heading', () => {
        render(<About/>)

        const heading = screen.getByRole('heading', {
            name: /About/i,
        })

        expect(heading).toBeInTheDocument()
    })
})