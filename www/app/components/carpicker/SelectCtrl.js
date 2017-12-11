import React, { Component } from 'react';
import { Row, Col } from 'antd';
import classnames from "classnames";

import {connect} from "dva";
 

class SelectCtrl extends Component {
    constructor(props) {
        super();

        this.state = {
            "showBd": false
        }

    }

    //上树之后
    componentDidMount() {
        var self = this;
        //点击页面其他空白的地方，关闭bd下拉框
        $(document).click(function (event) {
            if ($(self.refs.select_ctrl_box).find($(event.target)).length == 0) {
                self.setState({
                    "showBd": false
                });
            }
        });
    }

    clickHandeler(t) {
       
        this.props.addtag(this.props.tagname, t, t)
    }

    render() {
        //通天拿值
        //全局数据中它的值
        var _filter = this.props.filter.filter((item) => {
            return item.tagname == this.props.tagname;
        })[0];
		var color = [];
		var colorOptions = [];
		if(this.props.data){
			color = this.props.data;
			colorOptions = color.options;
		}

        // //默认值
        var value = [];
        if (_filter) { value = _filter.value }
        
        const showlist = () => {
            var ARR = [];
            for (let i = 0; i < colorOptions.length / 6; i++) {
                var temp = [];
                let slice_arr = colorOptions.slice(i * 6, i * 6 + 6);
                for (let j = 0; j < slice_arr.length; j++) {
                    temp.push(
                    <li
                        key={i * 6 + j}
                        className={classnames({ "cur": slice_arr[j] == value })}
                        onClick={() => { this.clickHandeler(slice_arr[j]) }}
                    >
                        <a href="javascript:void(0);">{slice_arr[j]}</a>
                    </li>
                    )
                }
                ARR.push(<ul key={i}>{temp}</ul>)
            }
            return ARR;
        }

        return (
            <div className="select_ctrl_box" ref="select_ctrl_box">
                <div
                    className={classnames({ "hd": true, "open": this.state.showBd })}
                    onClick={() => { this.setState({ "showBd": !this.state.showBd }) }}
                >
                    {color.title}
                </div>
                <div className="bd" style={{
                    "display": this.state.showBd ? "block" : "none",
                    "width": Math.ceil(colorOptions.length / 6) * 80 + "px"
                }}>
                    {
                        showlist()
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        filter: carpicker.filter
    })
)(SelectCtrl);