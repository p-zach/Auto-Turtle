import React from "react"
import Checkbox from "./Checkbox"

const OPTIONS = ["Increase", "Start from end"]

/**
 * Renders and updates the HTML form for the turtle options.
 */
class TurtleForm extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            // transforms ["option1, option2"] to ["option1": false, "option2": false]
            checkboxes: OPTIONS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            )
        }
    }

    /**
     * Creates a checkbox for the specified label.
     * @param {String} option - The text label for the checkbox.
     * @returns The rendered checkbox.
     */
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

    /**
     * Updates the clicked checkbox.
     * @param {React.ChangeEvent} changeEvent
     */
    handleCheckboxChange(changeEvent) {
        const { name } = changeEvent.target

        // changes the state of the clicked checkbox (to checked or unchecked) while preserving the others' states
        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }))
    }

    /**
     * Creates a checkbox for each option.
     * @returns The rendered checkboxes.
     */
    createForm() {
        return OPTIONS.map(option => this.createCheckbox(option))
    }

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