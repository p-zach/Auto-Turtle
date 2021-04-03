import React from "react"
import Checkbox from "./Checkbox"

const OPTIONS_CHECK = []//["Increase", "Start from end"]
//const OPTIONS_NUMBER = ["Repetitions"]

class TurtleForm extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            // transforms ["option1, option2"] to ["option1": false, "option2": false]
            checkboxes: OPTIONS_CHECK.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            )
        }
    }

    createCheckbox(option) {
        return (
            <Checkbox 
                label={option}
                isSelected={this.state.checkboxes[option]}
                onCheckboxChange={e => this.handleCheckboxChange(e)}
                key={option}
            />
        )
    }

    handleCheckboxChange(changeEvent) {
        const { name } = changeEvent.target

        // changes the state of the clicked checkbox while preserving the others
        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }))
    }

    createForm() {
        return OPTIONS_CHECK.map(option => this.createCheckbox(option))
    }

    // handleFormSubmit(formSubmitEvent) {
    //     formSubmitEvent.preventDefault()

    //     // gets the names of the checkboxes
    //     Object.keys(this.state.checkboxes)
    //         // checks if they are checked
    //         .filter(checkbox => this.state.checkboxes[checkbox])
    //         // prints the checked ones
    //         .forEach(checkbox => {
    //             console.log(checkbox + " is selected")
    //         })
    // }

    render() {
        return (
            <div>
                <form onSubmit={e => this.props.onTurtleSubmit(e)}>
                    {this.createForm()}

                    <button type="submit">
                        Turtle!
                    </button>
                </form>
                <form onSubmit={e => this.props.onResetSubmit(e)}>
                    <button type="submit">
                        Reset
                    </button>
                </form>
            </div>
        )
    }
}

export default TurtleForm