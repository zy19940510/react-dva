import React, { Component } from 'react'
import { Slider,  Row, Col } from 'antd';

import {connect} from "dva";

class RangeCtrl extends Component {
    constructor(props){
        super(props);
        
    }

    clickHandeler(b,t){
        this.props.addtag(this.props.tagname,[b, t], `${b}万到${t}万`);
    }

    render() {
        //全局数据中它的值
        var _filter = this.props.filter.filter((item) => {
            return item.tagname == this.props.tagname;
        })[0];
        //默认值
        var value = [0,100];
		if (_filter) {value = _filter.value }
		var examples = []
		if(this.props.data){
			examples = this.props.data.example;
		}
        return (
            <div className="range_ctrl_box">
                <div className="examples">
                    {
                       examples.map((item, index) => {
                            return <a 
                                key={index} 
                                href="javascript:void(0);" 
                                onClick={()=>{this.clickHandeler(item.b,item.t)}
                            }>
                                {item.chinese}
                            </a>
                        })
                    }
                </div>
                <div className="slider">
                   <Row>
                       <Col span={14}>
                            <Slider 
                                range 
                                value={value}
                                onChange={([b, t]) => { this.clickHandeler(b,t)}}
                            />
                       </Col>
                        <Col span={1}>
                           
                        </Col>
                        <Col span={9}>
                            {this.props.value[0]}  
                            ~
                            {this.props.value[1]}  
                        </Col>
                   </Row>
                </div>
            </div>
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        filter: carpicker.filter
    })
)(RangeCtrl);