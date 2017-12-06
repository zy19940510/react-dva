import React from "react";
import { connect } from "dva";
import classnames from "classnames";

class Bigimg extends React.Component {
    constructor({ images, changeAlbum , position}) {
        super();
    }

    //当组件得到新的参数（因为action进行了换图的时候）
    componentWillReceiveProps(nextProps){
        //让图片消失，去掉src
        $(this.refs.bigimg).attr("src", "");
        //得到新的参数（从全局store）的图片地址
        const imgarr = nextProps.imgarr;
        const { color, album, idx } = nextProps.position;
        const chexing = nextProps.chexing;

        const nexturl = `/carimages/${chexing}/${color}/${album}/${imgarr[idx]}`;
        const images = nextProps.images;

        //创建一个img对象，让它成为即将展示的这个图片的src
        var $image = $("<img src='" + nexturl + "' />");

        
        //DOM加载了
        var self = this;
        $image.bind("load" , function(){
            $(self.refs.bigimg).attr("src" , nexturl);
        })
    }

   
    render() {
        return <div className="bigimgwrap">
            <div className="inner">
                <img className="bigimg" ref="bigimg" alt="" />
                <div className="leftBtn" onClick={this.props.lastPic}></div>
                <div className="rightBtn" onClick={this.props.goNext}></div>
            </div>
        </div>
    }
}

export default connect(
    ({ carshow: { images, position, chexing}})=>({
        imgarr : (() => {
            //如果已经init了，此时就返回当前颜色、当前图集的img数组
            if (images[position.color]) {
                return images[position.color][position.album];
            }
            return [];
        })(),
        position  ,
        images
    }),
    (dispatch)=>({
        goNext(){
            dispatch({"type":"carshow/gonext"});
        },
        lastPic(){
            dispatch({ "type":"carshow/lastPic"});
        }
    })
)(Bigimg);