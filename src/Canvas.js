import React from "react"

class Canvas extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            points: [{ x: 250, y: 250 }]
        }

        this.canvasRef = React.createRef()
    }

    render() {
        return (
            <canvas ref={this.canvasRef} width="500" height="500" 
                onMouseDown={e => this.handleMouseDown(e)}
            />
        )
    }

    handleMouseDown(e) {
        let m = e.nativeEvent
        const points = this.state.points
        this.drawLine(points[points.length - 1].x, points[points.length - 1].y, m.offsetX, m.offsetY)
        this.addPoint(m.offsetX, m.offsetY)
    }

    addPoint(x, y) {
        const pts = this.state.points
        this.setState({
            points: [...pts, { x: x, y: y }]
        })
    }

    drawLine(ix, iy, x, y) {
        const context = this.getContext()
        context.fillStyle = "#000000"
        context.beginPath()
        context.moveTo(ix, iy)
        context.lineTo(x, y)
        context.stroke()
    }
    
    repeat() {
        const rots = 6
        let points = this.state.points
        const initLength = points.length

        // return if the number of points is too high
        if (initLength > 100)
            return

        for (var r = 1; r < rots; r++)
        {
            let angle = r / rots * 360
            for (var i = 0; i < initLength; i++)
            {
                const newPoint = this.rotateCenter(points[i], points[0], angle)
                if (i > 0)
                {
                    this.drawLine(points[points.length - 1].x, points[points.length - 1].y, newPoint.x, newPoint.y)
                }
                points.push({ x: newPoint.x, y: newPoint.y })
            }
        }
        this.setState({
            points: points
        })
    }

    rotateCenter(point, center, degrees) {
        const aboutOrigin = { x: point.x - center.x, y: point.y - center.y }
        const rotated = this.rotateOrigin(aboutOrigin, degrees)
        return { x: rotated.x + center.x, y: rotated.y + center.y } 
    }

    rotateOrigin(point, degrees) {
        const rads = degrees * Math.PI / 180
        const sin = Math.sin(rads)
        const cos = Math.cos(rads)
        // point rotation about origin
        return { x: point.x * cos - point.y * sin, y: point.x * sin + point.y * cos }
    }

    clear() {
        this.setState({
            points: [{ x: 250, y: 250 }]
        })
        this.getContext().clearRect(0, 0, 500, 500)
    }

    componentDidMount() {
        //const context = this.getContext()
        //context.fillStyle = "#EEEEEE"
        //context.fillRect(0, 0, 500, 500)
    }

    getContext() {
        return this.canvasRef.current.getContext("2d")
    }
}

export default Canvas