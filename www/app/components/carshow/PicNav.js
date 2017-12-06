import React from "react";
import {connect} from "dva";
import classnames from "classnames";

class PicNav extends React.Component{
    constructor(){
        super();
 
    }
 
    //组件更新之前
    componentWillUpdate(nextProps){
        //计算改变之后的page值
        var page = Math.floor(nextProps.position.idx / 6);
        
        //哪个块块加cur，其他去cur
        $(this.refs.ol).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
        //拉动火车
        $(this.refs.unit).stop(true).animate({ "left": -290 * page }, 400);
    }


    //显示ul列表，这个函数主要功能就是将this.props.imgarr一维数组映射为ul、li的二维数组
    showPanels(){
        const length = this.props.imgarr.length;
        const {color,album,idx} = this.props.position;
        const chexing = this.props.chexing;

        var ARR = [];
        var self = this;
        for (let i = 0; i < Math.ceil(length / 6); i++){
            ARR.push(
                <ul key={i}>
                    {
                        this.props.imgarr.slice(i * 6, i * 6 + 6).map((item, index) => {
                            let nexturl = `/carimages/${chexing}/${color}/${album}/${item}`;
                            //加载函数
                            
                            return <li onClick={()=>{this.props.changeIdx(i * 6 + index)}} className={classnames({"cur" : idx == i * 6 + index})}  key={index}>
                                <img src={nexturl}/>
                            </li>
                        })
                    }
                </ul>
            );
        }
        return ARR;
    }

    //组件上树之后
    componentDidMount(){
        var self = this;
        //采用事件委托的方式，给翻页条（蓝色块）添加监听
        $(this.refs.ol).delegate("li","mouseenter",function(){
            //点击那个蓝色块，哪个块块加cur，其他去cur
            $(this).addClass("cur").siblings().removeClass("cur");
            //拉动unit火车进行移动
            $(self.refs.unit).stop(true).animate({ "left": -290 * $(this).data("pagenumber")},400);
        });

        //当鼠标离开本组件的时候，回滚
        $(this.refs.picnav).bind("mouseleave",function(){
            var page = Math.floor(self.props.position.idx / 6);
            //拉动火车
            $(self.refs.unit).stop(true).animate({ "left": -290 * page }, 400);
            //点击那个蓝色块，哪个块块加cur，其他去cur
            $(self.refs.ol).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
        });
    }

   
    render(){
        const pageAmount = Math.ceil(this.props.imgarr.length / 6);
        const curPage = Math.floor(this.props.position.idx / 6);
        
        return <div className="picNav" ref="picnav">
            <div className="unit" ref="unit">
                {this.showPanels()}
            </div>
            <div className="cl"></div>
            <ol ref="ol">
                {   
                    /* 导航条 */
                    /* http://es6.ruanyifeng.com/#docs/array#数组实例的-fill */
                    pageAmount > 1
                    ?
                    new Array(pageAmount).fill("").map((item,index)=>{
                        return <li 
                            key={index} 
                            style={{ "width": 100 / pageAmount + "%" }}
                            className={classnames({ "cur": curPage == index})}
                            data-pagenumber={index}
                        ></li>
                    })
                    :
                    null
                }
            </ol>
        </div>
    }
}

export default connect(
    ({carshow : {images , position }})=>({
        imgarr : (()=>{
            //如果已经init了，此时就返回当前颜色、当前图集的img数组
            if (images[position.color]){
                return images[position.color][position.album];
            }
            return [];
        })()
        ,
        position
    }),
    (dispatch)=>({
        changeIdx(idx){
            dispatch({"type" : "carshow/changeidx" , idx})
        }
    })
)(PicNav);