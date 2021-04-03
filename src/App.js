import React from "react"
import Canvas from "./Canvas"
import TurtleForm from "./TurtleForm"
import Header from "./Header"

/**
 * Contains and handles interactions between the form and canvas.
 */
class App extends React.Component {
    constructor(props) {
        super(props)

        // get the reference to the canvas
        this.canvasRef = React.createRef()
    }

    /**
     * Makes the canvas repeat the drawn pattern according to the options checked in the form.
     * @param {React.FormEvent} formSubmitEvent
     */
    handleTurtleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault()

        var target = formSubmitEvent.target
        this.canvasRef.current.repeat(target[0].checked, target[1].checked)
    }

    /**
     * Clears the canvas.
     * @param {React.FormEvent} formSubmitEvent 
     */
    handleResetFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault()

        this.canvasRef.current.clear()
    }

    render() {
        console.log(this.state)
        return (
            <div class="container">
                <Header />
                <hr></hr>
                <Canvas ref={this.canvasRef} />
                <TurtleForm 
                    onTurtleSubmit={e => this.handleTurtleFormSubmit(e)}
                    onResetSubmit={e => this.handleResetFormSubmit(e)} />
            </div>
        )
    }
}

export default App