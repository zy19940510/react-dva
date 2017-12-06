import React from "react";
import { connect } from "dva";
import classnames from "classnames";

class Picker extends React.Component {
    constructor({ images, changeAlbum , position}) {
        super();
    }

    //显示图集名字（外观、内饰、细节）
    showAlbums(){
        //英文中文的对应
        var o = {
            "view" : "外观",
            "center" : "内饰",
            "detail" : "细节"
        }
        //如果init已经完毕
        var albumobj = this.props.images[this.props.position.color];
        
        if (albumobj){
            var arr = [];
            var count = 0;
            for(let k in o){
                //如果这个颜色的车有这个图集（因为有的颜色车没有“内饰”）：
                if(albumobj.hasOwnProperty(k)){
                    arr.push(
                        <li 
                            className={classnames({"cur" : k == this.props.position.album})} 
                            key={count++}
                            onClick={() => { this.props.changeAlbum(k) }}
                        >
                            {o[k]}（{albumobj[k].length}）
                        </li>
                    )
                }
            }
            return arr;
        }
        return null;
    }

    render() {
        //color草写在render里面
        //一会儿，这个数据在全局store中
        const colors = Object.keys(this.props.images);
        const curcolor = this.props.position.color;
 
        return <div className="picker">
            <ul className="album">
                {this.showAlbums()}
            </ul>
            <div className="cl"></div>
            <ul className="color">
                {
                    colors.map((item, index) => {
                        return <li
                            key={index}
                            style={{ "backgroundColor": item }}
                            className={classnames({ "cur": curcolor == item })}
                            onClick={() => { this.props.changeColor(item) }}
                        ></li>
                    })
                }
            </ul>
        </div>
    }
}

export default connect(
    ({carshow})=>({
        images : carshow.images,
        position : carshow.position
    }),
    (dispatch)=>({
        changeAlbum(album){
            dispatch({"type" : "carshow/changealbum" , album });
        },
        changeColor(color) {
            dispatch({ "type": "carshow/changecolor", color });
        }
    })
)(Picker);