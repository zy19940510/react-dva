// import React, { Component } from 'react'

// import App from "../../App";
// import Bar from "./Bar.js";
// export default class Index extends Component {
//     constructor() {
//         super();

//         this.state = {
//             "r": 100,
//             "g": 200,
//             "b": 123,
//             "shuju": []
//         }

//         var self = this;
//         $.get("shuju.json", function (data) {
//             self.setState({ "shuju": data });
//             self.renderTu();
//         })
//     }

//     changeShu(k, v) {
//         this.setState({
//             [k]: parseInt(v)
//         });
//     }

//     componentDidMount() {
//         $("#myul, #myultool").sortable({
//             connectWith: ".myul"
//         }).disableSelection();

//         //图表
//         this.myChart = echarts.init(this.refs.main);
//     }

//     renderTu() {

//         this.myChart.hideLoading();

//         const data = this.state.shuju;

//         var base = -data.reduce(function (min, val) {
//             return Math.floor(Math.min(min, val.l));
//         }, Infinity);
//         this.myChart.setOption({
//             title: {
//                 text: 'Confidence Band',
//                 subtext: 'Example in MetricsGraphics.js',
//                 left: 'center'
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                     type: 'cross',
//                     animation: false,
//                     label: {
//                         backgroundColor: '#ccc',
//                         borderColor: '#aaa',
//                         borderWidth: 1,
//                         shadowBlur: 0,
//                         shadowOffsetX: 0,
//                         shadowOffsetY: 0,
//                         textStyle: {
//                             color: '#222'
//                         }
//                     }
//                 },
//                 formatter: function (params) {
//                     return params[2].name + '<br />' + params[2].value;
//                 }
//             },
//             grid: {
//                 left: '3%',
//                 right: '4%',
//                 bottom: '3%',
//                 containLabel: true
//             },
//             xAxis: {
//                 type: 'category',
//                 data: data.map(function (item) {
//                     return item.date;
//                 }),
//                 axisLabel: {
//                     formatter: function (value, idx) {
//                         var date = new Date(value);
//                         return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
//                     }
//                 },
//                 splitLine: {
//                     show: false
//                 },
//                 boundaryGap: false
//             },
//             yAxis: {
//                 axisLabel: {
//                     formatter: function (val) {
//                         return (val - base) * 100 + '%';
//                     }
//                 },
//                 axisPointer: {
//                     label: {
//                         formatter: function (params) {
//                             return ((params.value - base) * 100).toFixed(1) + '%';
//                         }
//                     }
//                 },
//                 splitNumber: 3,
//                 splitLine: {
//                     show: false
//                 }
//             },
//             series: [{
//                 name: 'L',
//                 type: 'line',
//                 data: data.map(function (item) {
//                     return item.l + base;
//                 }),
//                 lineStyle: {
//                     normal: {
//                         opacity: 0
//                     }
//                 },
//                 stack: 'confidence-band',
//                 symbol: 'none'
//             }, {
//                 name: 'U',
//                 type: 'line',
//                 data: data.map(function (item) {
//                     return item.u - item.l;
//                 }),
//                 lineStyle: {
//                     normal: {
//                         opacity: 0
//                     }
//                 },
//                 areaStyle: {
//                     normal: {
//                         color: '#ccc'
//                     }
//                 },
//                 stack: 'confidence-band',
//                 symbol: 'none'
//             }, {
//                 type: 'line',
//                 data: data.map(function (item) {
//                     return item.value + base;
//                 }),
//                 hoverAnimation: false,
//                 symbolSize: 6,
//                 itemStyle: {
//                     normal: {
//                         color: '#c23531'
//                     }
//                 },
//                 showSymbol: false
//             }]
//         });

//     }

//     render() {
//         return (
//             <App>
//                 <div>
//                     <h1>我是首页</h1>


//                     <div ref="main" style={{ "width": "300px", "height": "200px" }}></div>

//                     <br />
//                     <br />
//                     <br />
//                     <br />
//                     <br />d


//                 <ul id="myultool" className="myul">
//                         <li className="ui-state-default">嘿嘿</li>
//                         <li className="ui-state-default">呵呵</li>

//                     </ul>
//                     <div className="cl"></div>
//                     <br />
//                     <br />
//                     <ul id="myul" className="myul">
//                         <li className="ui-state-default">哈哈</li>
//                         <li className="ui-state-default">嘻嘻</li>
//                         <li className="ui-state-default">么么哒</li>
//                     </ul>



//                     <br />
//                     <br />

//                     <div className="box" style={{
//                         "width": "200px",
//                         "height": "200px",
//                         "background": `rgb(${this.state.r},${this.state.g},${this.state.b})`
//                     }}></div>
//                     <Bar k={"r"} state={this.state} max={255} min={0} change={this.changeShu.bind(this)}></Bar>
//                     <br />
//                     <Bar k={"g"} state={this.state} max={255} min={0} change={this.changeShu.bind(this)}></Bar>
//                     <br />
//                     <Bar k={"b"} state={this.state} max={255} min={0} change={this.changeShu.bind(this)}></Bar>


//                 </div>
//             </App>

//         )
//     }
// }
import React, { Component } from 'react'
import { connect } from 'dva'

export class Index extends Component {
  

  render() {
    return (
      <div>
        <h1>哈哈</h1>
      </div>
    )
  }
}



export default connect(null, null)(Index)
