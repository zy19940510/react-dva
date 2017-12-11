import React, { Component } from 'react';
import { Row, Col } from 'antd';
import classnames from "classnames";

import {connect} from "dva";
 

class MultipleSelectCtrl extends Component {
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

    //事件监听
    changeHandeler(e, t, value) {
        if (e.target.checked) {
            var nextvalues = [
                ...value,
                t
            ];
        } else {
            var nextvalues = value.filter((item) => {
                return item != t;
            });
        }
       
        this.props.addtag(this.props.tagname, nextvalues, nextvalues.join(" 或 "));
    }

    render() {
		var cartype = [];
		var cartypeOptions = [];
		if(this.props.data){
			cartype = this.props.data;
			cartypeOptions= cartype.options
			// console.log(cartypeOptions.length)
		}
        //显示列表
        const showlist = () => {
            var ARR = [];
            for (let i = 0; i < cartypeOptions.length / 6; i++) {
                var temp = [];
                let slice_arr = cartypeOptions.slice(i * 6, i * 6 + 6);
                for (let j = 0; j < slice_arr.length; j++) {
                    temp.push(<li key={i * 6 + j}>
                        <label>
                            <input
                                type="checkbox"
                                checked={value.includes(slice_arr[j])}
                                onChange={(e) => { this.changeHandeler(e, slice_arr[j] , value) }}
                            />
                            {slice_arr[j]}
                        </label>
                    </li>)
                }
                ARR.push(<ul key={i}>{temp}</ul>)
            }
            return ARR;
        }

        //通天拿值
        //全局数据中它的值
        var _filter = this.props.filter.filter((item) => {
            return item.tagname == this.props.tagname;
        })[0];

        
        // //默认值
        var value = [];
        if (_filter) { value = _filter.value }

        

        return (
            <div className="select_ctrl_box" ref="select_ctrl_box">
                <div
                    className={classnames({ "hd": true, "open": this.state.showBd })}
                    onClick={() => { this.setState({ "showBd": !this.state.showBd }) }}
                >
                    {cartype.title}
                    {" "}: {" "}
                    {
                        value.join(" 或 ")
                    }
                </div>
                <div className="bd" style={{
                    "display": this.state.showBd ? "block" : "none",
                    "width": Math.ceil(cartypeOptions.length / 6) * 80 + "px"
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
)(MultipleSelectCtrl);