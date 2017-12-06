import React from "react";
import classnames from "classnames";
import { connect } from "dva";
import Picker from "./Picker.js";
import PicNav from "./PicNav.js";
import Bigimg from "./Bigimg.js";


class App extends React.Component {
    constructor(props) {
        super();
        //拉取默认数据
        props.init(props.chexing);
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.chexing != this.props.chexing){
            nextProps.init(nextProps.chexing);
            return true;
        }
        return false;
    }

    render() {
        const {color , album , idx } = this.props.position;
        const images = this.props.images;
        
        return <div className="albumWraper">
            <div className="bigimgPart">
                <Bigimg chexing={this.props.chexing}></Bigimg>
            </div>

            <div className="rightPart">
                <div className="titlebox">
                    <h1>{this.props.chexing}</h1>
                    <h3></h3>
                </div>
               
                <div className="cl"></div>
                <Picker></Picker>
                <div className="cl"></div>
                <PicNav chexing={this.props.chexing}></PicNav>
            </div>
        </div>
    }
}

export default connect(
    ({carshow})=>({
        images: (() => {
            //如果已经init了，此时就返回当前颜色、当前图集的img数组
            if (carshow.images[carshow.position.color]) {
                return carshow.images[carshow.position.color][carshow.position.album];
            }
            return [];
        })() ,
        position: carshow.position
    })
    ,
    (dispatch)=>({
        init(chexing){
            dispatch({ "type": "carshow/init_async", chexing});
        },
        goNext(){
            dispatch({"type":"carshow/gonext"});
        }
    })
)(App);