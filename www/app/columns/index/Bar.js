import React, { Component } from 'react'
 

export default class Bar extends Component {
    constructor() {
        super();

         
    }
    componentDidMount() {
        var self = this;
        //定义宽度
        $(this.refs.bar).find("p").draggable({
            "containment": "parent",
            "drag": function (event, ui) {
                var left = ui.position.left * self.props.max / 500;
                self.props.change(self.props.k , left);
            }
        });
    }
    render() {
        const {r,g,b} = this.props.state;
        if(this.props.k == "r"){
            var bg = `-webkit-linear-gradient(left,rgb(0,${g},${b}),rgb(255,${g},${b}))`
        } else if (this.props.k == "g") {
            var bg = `-webkit-linear-gradient(left,rgb(${r},0,${b}),rgb(${r},255,${b}))`
        } else if (this.props.k == "b") {
            var bg = `-webkit-linear-gradient(left,rgb(${r},${g},0),rgb(${r},${g},255))`
        }

        return (
            <div>
                <div className="bar" ref="bar" style={{"background" : bg}}>
                    <p></p>
                </div>
            </div>

        )
    }
}
