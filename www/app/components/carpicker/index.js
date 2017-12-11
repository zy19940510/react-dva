import React from "react";
import classnames from "classnames";
import { connect } from "dva";

 

//引入我们的控件组件
import TabCtrl from "./TabCtrl.js";
import AListCtrl from "./AListCtrl.js";
import RangeCtrl from "./RangeCtrl.js";
import MultipleSelectCtrl from "./MultipleSelectCtrl.js";
import SelectCtrl from "./SelectCtrl.js";
//引入标签组件
import Tags from "./Tags.js";
//引入表格组件
import MyTable from "./MyTable.js";
import '../../styles/less_carpicker.less'

 
class CarPicker extends React.Component {
    constructor({fetchInit , fetchInit2}) {
        super();

        this.state = {
            "brand" : ""
        }
        fetchInit2();
        
        //拉取默认数据
        fetchInit();

        //控件的默认数据
        // this.state = {
        //     carbrands: {
        //         "a": ["奥迪", "奥斯顿马丁"],
        //         "b": ["别克", "本田", "宝马", "奔驰", "标致", "比亚迪", "奔腾", "宝骏"],
        //         "c": ["长安", "长城", "长安欧尚", "昌河", "成功汽车"],
        //         "d": ["大众", "东风风行", "东南", "东风风神", "道奇", "东风风光", "东风"],
        //         "J" : ["吉利","金帆","金杯","金士顿"],
        //         "q" : ["起亚","启辰","奇瑞","乔治巴顿"]
        //     },
        //     series : {
        //         "奥迪" : {
        //             "special": ["A1", "A2", "A3"],
        //             "all": {
        //                 "一汽大众": ["CC", "宝来"],
        //                 "上海大众": ["POLO"],
        //                 "大众进口": ["劈开"]
        //             }
        //         },
        //         "奇瑞": {
        //             "special": ["瑞虎", "QQ", "艾瑞泽","E3"],
        //             "all": {
        //                 "奇瑞汽车": ["A1", "A2", "QQ","艾瑞泽"],
        //                 "奇瑞新能源": ["擎天柱","大熊猫"]
        //             }
        //         },
        //         "别克": {
        //             "special": ["英朗", "凯越", "君越","verano","GL8"],
        //             "all": {
        //                 "别克总部": ["英朗", "凯越", "君越", "verano", "GL8"],
        //                 "别克进口车": ["金坷垃", "昂科威"]
        //             }
        //         },
        //         "吉利" : {
        //             "special": ["远景", "帝豪GL", "巡洋舰", "航空母舰"], 
        //             "all": {
        //                 "吉利总部": ["远景", "帝豪GL"],
        //                 "吉利分部": ["巡洋舰", "航空母舰"]
        //             }
        //         }
                    
        //     },
        //     price : {
        //         "example" : [
        //             {
        //                 "chinese" : "3万以下",
        //                 "b" : 0,
        //                 "t" : 2.99
        //             },
        //             {
        //                 "chinese": "3万到6万",
        //                 "b": 3,
        //                 "t": 5.99
        //             },
        //             {
        //                 "chinese": "6万到16万",
        //                 "b": 6,
        //                 "t": 15.99
        //             },
        //             {
        //                 "chinese": "16万到26万",
        //                 "b": 16,
        //                 "t": 25.99
        //             }
        //         ]
        //         ,
        //         "min" : 0,
        //         "max" : 100
        //     },
        //     "km" : {
        //         "example" : [
        //             {
        //                 "chinese" : "3万以下",
        //                 "b" : 0,
        //                 "t" : 30000
        //             },
        //             {
        //                 "chinese" : "6万以下",
        //                 "b" : 0,
        //                 "t" : 60000
        //             },
        //             {
        //                 "chinese" : "10万以下",
        //                 "b" : 0,
        //                 "t" : 100000
        //             }
        //         ] ,
        //         "min" : 0,
        //         "max" : 1000000
        //     },
        //     "cartype" : {
        //         "title" : "车型",
        //         "options" : ["紧凑型轿车","小型车","中型车","豪华","小型SUV","中型SUV","大型SUV","越野","面包"]
        //     },
        //     "seat": {
        //         "title" : "座位数",
        //         "options": ["2座","4座","5座","7座","7座以上"]
        //     },
        //     "color": {
        //         "title": "颜色",
        //         "options": ["白色","红色","棕色","黄色","黑色","金色","绿色","蓝色","其他颜色"]
        //     },
        //     "engine": {
        //         "title": "发动机",
        //         "options": ["1.6","1.4","1.6T","1.8T"]
        //     },
        //     "paifang": {
        //         "title": "排放",
        //         "options": ["国一","国二","国三","国四","国五",]
        //     },
        //     "biansuxiang" : {
        //         "title": "变速箱",
        //         "options": ["手动","自动"]
        //     }
        // }
    }

    //换品牌
    changebrand(brand){
        this.setState({
            brand
        })
    }

    //增加tag
    addtag(tagname,value,words) {
        this.props.addtag(tagname, value, words);
    }

    render() {
		var series = {};
		if(this.props.details[0]){
			var {carbrands,biansuxiang , cartype , color , engine , km , paifang , price , seat } = this.props.details[0];
			series = this.props.details[0].series;
		}
		console.log(series);
        return <div>
            <div className="ant-table">
                <div className="ant-table-body">
                    <table>
                        <tbody className="ant-table-tbody">
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    品牌
                                </td>
                                <td>
                                    <TabCtrl 
										data={this.props.details[0] && this.props.details[0].carbrands
										} 
                                        tagname="品牌" 
                                        addtag={this.addtag.bind(this)}
                                        changebrand={this.changebrand.bind(this)}
                                    >
									{
									this.props.details[0] &&this.props.details[0].carbrands	
									}
									</TabCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    车系
                                </td>
                                <td>
									<AListCtrl 
										data={series[this.state.brand]}
										tagname="车系" 
									 	addtag={this.addtag.bind(this)}
									>
									 </AListCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    价格
                                </td>
                                <td>
                                    <RangeCtrl data={price} tagname="价格" addtag={this.addtag.bind(this)}
									value={[0,100]}
									></RangeCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    公里数
                                </td>
                                <td>
                                    <RangeCtrl data={km} tagname="公里数" addtag={this.addtag.bind(this)}
									value={[0,1000000]}
									></RangeCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    其他
                                </td>
                                <td>
                                    <MultipleSelectCtrl 
                                        data={cartype} 
                                        tagname="车型" 
                                        addtag={this.addtag.bind(this)}
                                    ></MultipleSelectCtrl>
                                    {" "}
                                    <MultipleSelectCtrl 
                                        data={seat} 
                                        tagname="座位数"
                                        addtag={this.addtag.bind(this)}
                                     ></MultipleSelectCtrl>
                                    {" "}
                                    <SelectCtrl
                                        data={color}
                                        tagname="颜色"
                                        addtag={this.addtag.bind(this)}
                                    ></SelectCtrl>
                                    {" "}
                                    <MultipleSelectCtrl
                                        data={engine}
                                        tagname="发动机"
                                        addtag={this.addtag.bind(this)}
                                    ></MultipleSelectCtrl>
                                    {" "}
                                    <MultipleSelectCtrl
                                        data={paifang}
                                        tagname="排放"
                                        addtag={this.addtag.bind(this)}
                                    ></MultipleSelectCtrl>
                                      {" "}
                                     <SelectCtrl
                                        data={biansuxiang}
                                        tagname="变速箱"
                                        addtag={this.addtag.bind(this)}
                                    ></SelectCtrl>
                                    {" "}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
                    <br/>
                    
                    <Tags></Tags>

                    <br />
                    <br />
                </div>
            </div>

            <div className="cl"></div>

            <MyTable 
                changeXuanfu={this.props.changeXuanfu}
                changeChexing={this.props.changeChexing}
            ></MyTable>
        </div>
    }
}

export default connect(
    ({carpicker: {details}}) =>({
		details 
	}) ,
    (dispatch)=>({
        addtag(tagname,value, words){
            dispatch({ "type": "carpicker/addtag", value, tagname, words })
        },
        fetchInit(){
            dispatch({ "type": "carpicker/fetchInit"})
        },
        fetchInit2(){
            dispatch({ "type": "carpicker/fetchInit2"})
        }
    })
)(CarPicker);