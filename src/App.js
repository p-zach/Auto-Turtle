import React from "react"
import Canvas from "./Canvas"
import TurtleForm from "./TurtleForm"
import Header from "./Header"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            increase: false,
            connectToCenter: false
        }

        this.canvasRef = React.createRef()
    }

    handleTurtleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault()

        var target = formSubmitEvent.target
        this.setState({
            //increase: target[0].checked,
            //connectToCenter: target[1].checked
        })

        this.canvasRef.current.repeat()
    }

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