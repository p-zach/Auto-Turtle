import React from "react"

/**
 * Renders and updates the HTML canvas.
 */
class Canvas extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            points: [{ x: 250, y: 250 }]
        }

        this.canvasRef = React.createRef()
    }

    /**
     * Handles mouse clicks on the canvas.
     * @param {React.MouseEvent} e 
     */
    handleMouseDown(e) {
        let m = e.nativeEvent
        const points = this.state.points
        this.drawLine(points[points.length - 1].x, points[points.length - 1].y, m.offsetX, m.offsetY)
        this.addPoint(m.offsetX, m.offsetY)
    }

    /**
     * Adds the specified point to the state's point list.
     * @param {Number} x - The X coordinate of the point to be added.
     * @param {Number} y - The Y coordinate of the point to be added.
     */
    addPoint(x, y) {
        const pts = this.state.points
        this.setState({
            points: [...pts, { x: x, y: y }]
        })
    }

    /**
     * Draws a line between two points.
     * @param {Number} ix - The starting X coordinate for the line.
     * @param {Number} iy - The starting Y coordinate for the line.
     * @param {Number} x - The ending X coordinate for the line.
     * @param {Number} y - The ending Y coordinate for the line.
     */
    drawLine(ix, iy, x, y) {
        const context = this.getContext()
        context.fillStyle = "#000000"
        context.beginPath()
        context.moveTo(ix, iy)
        context.lineTo(x, y)
        context.stroke()
    }
    
    /**
     * Radially repeats the drawn pattern 6 times.
     * @param {Boolean} increasing - Whether the pattern should increase in size as it is copied.
     * @param {boolean} startFromEnd - Whether the pattern should begin from the end of the initial drawing.
     */
    repeat(increasing, startFromEnd) {
        const rots = 6
        let points = this.state.points
        const initLength = points.length
        let scalar = 1

        // return if the number of points is too high
        if (initLength > 200)
            return

        // Repeat 5 times:
        for (var r = 1; r < rots; r++)
        {
            // find the angle in degrees of this copy
            let angle = r / rots * 360
            // copy all of the points
            for (var i = 0; i < initLength; i++)
            {
                // get the origin point for rotation
                let center = startFromEnd ? points[initLength - 1] : points[0]
                // rotate the original drawn point around the origin by the calculated amount
                let newPoint = this.rotateCenter(points[i], center, angle)
                // scale the point if increase was checked
                if (increasing)
                    newPoint = this.scaleCenter(newPoint, center, scalar)
                if (i > 0)
                {
                    // draw a line connecting this point with the previous
                    this.drawLine(points[points.length - 1].x, points[points.length - 1].y, newPoint.x, newPoint.y)
                }
                // add the new point to the local point list
                points.push({ x: newPoint.x, y: newPoint.y })
            }
            // increase the scalar for next copy
            scalar += .5
        }
        // set the state after done since setState is async
        this.setState({
            points: points
        })
    }

    /**
     * Rotates the specified point around an origin by the specified amount.
     * @param {Object} point - The point to rotate.
     * @param {Object} center - The origin point around which the specified point should be rotated.
     * @param {Number} degrees - The number of degrees to rotate the point by.
     * @returns The rotated point.
     */
    rotateCenter(point, center, degrees) {
        // translates point so it's relative to 0,0
        const aboutOrigin = { x: point.x - center.x, y: point.y - center.y }
        // rotates the translated point around 0,0
        const rotated = this.rotateOrigin(aboutOrigin, degrees)
        // returns the 0,0-rotated point plus the original offset
        return { x: rotated.x + center.x, y: rotated.y + center.y } 
    }

    /**
     * Rotates the specified point around 0,0.
     * @param {Object} point - The point to rotate around the origin.
     * @param {Number} degrees - The number of degrees to rotate the point by.
     * @returns The rotated point.
     */
    rotateOrigin(point, degrees) {
        const rads = degrees * Math.PI / 180
        const sin = Math.sin(rads)
        const cos = Math.cos(rads)
        // point rotation about origin: (xcos(a) - ysin(a), xsin(a) + ycos(a))
        return { x: point.x * cos - point.y * sin, y: point.x * sin + point.y * cos }
    }

    /**
     * Scales the specified point from an origin by the specified amount.
     * @param {Object} point - The point to scale.
     * @param {Object} center - The origin point around which the specified point should be scaled.
     * @param {Number} scalar - The factor to scale the point by.
     * @returns The scaled point.
     */
    scaleCenter(point, center, scalar) {
        // translates point so it's relative to 0,0
        const aboutOrigin = { x: point.x - center.x, y: point.y - center.y }
        // scales the translated point from 0,0
        const scaled = this.scaleOrigin(aboutOrigin, scalar)
        // returns the 0,0-scaled point plus the original offset
        return { x: scaled.x + center.y, y: scaled.y + center.y }
    }

    /**
     * Scales the specified point from 0,0.
     * @param {Object} point - The point to scale from the origin.
     * @param {Number} scalar - The factor to scale the point by.
     * @returns The scaled point.
     */
    scaleOrigin(point, scalar) {
        return { x: point.x * scalar, y: point.y * scalar }
    }

    /**
     * Clears the canvas.
     */
    clear() {
        // clears the point list
        this.setState({
            points: [{ x: 250, y: 250 }]
        })
        // wipes the canvas
        this.getContext().clearRect(0, 0, 500, 500)
    }

    /**
     * @returns The canvas's context object.
     */
    getContext() {
        return this.canvasRef.current.getContext("2d")
    }

    render() {
        return (
            <canvas ref={this.canvasRef} width="500" height="500" 
                onMouseDown={e => this.handleMouseDown(e)}
            />
        )
    }
}

export default Canvas