/* 
 * 这个文件能够自动生成5000条数据（并且删除之前的数据），存储到数据库中！！
 * 只需要node mock.js即可！！
 * 考拉 2017年12月4日10:22:11
 */


var fs = require("fs");
var _ = require("underscore");
var mock = require("mockjs");
var mongoose = require("mongoose");
//使用Schema
var Car = require("./models/Car");

var Random = mock.Random;

//链接数据库
mongoose.connect("mongodb://localhost/carsystem");


 
var carbrandsandseries = {
    "奇瑞": {
        "pinyin": "q",
        "country": "中国",
        "series": [
            {
                "series_name": "艾瑞泽",
                "type": "紧凑型轿车",
                "seat": 5,
                "colors" : {
                    "blue": "1024x0_1_q87_autohomecar__wKgH1Fg2xzuAU30KAAe38HwP3TA680.jpg",
                    "brown": "1024x0_1_q87_autohomecar__wKgFW1br6ZGATUgdAAjKuwGz8MM655.jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgFW1bMLYaAXhzgAAZ1Q6TtV80632.jpg",
                    "orange": "1024x0_1_q87_autohomecar__wKgH5VlQ0R2ACV94AAi-KsaocXs390.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKjBwFlI5oGALk8pAAnV1TylIYc706.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH0llWGauAPjjRAAgM1h2buv0244.jpg"
                },
                "directory": "AiRuize"
            }
        ]
    },
    "奥迪": {
        "pinyin": "a",
        "country": "德国",
        "series": [
            {
                "series_name": "A3",
                "type": "豪华轿车",
                "seat": 5,
                "colors" : {
                    "green": "1024x0_1_q87_autohomecar__wKgFW1kTN5CATWdjAAbf14rrsS4853.jpg",
                    "orange": "1024x0_1_q87_autohomecar__wKgHy1kAA1OAWoJPAAjVdNuUIFg722.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH0lj-w7aAKfuDAAY63i-YfBQ123.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH5FkxLziARXeFAAqDQ2azoi0704.jpg"   
                },
                "directory": "Audi_A3"
            }
        ]
    },
    "别克": {
        "pinyin": "b",
        "country": "美国",
        "series": [
            {
                "series_name": "威朗",
                "type": "商务车",
                "seat": 7,
                "colors" : {
                    "blue": "1024x0_1_q87_autohomecar__wKgH2VaBLE-APqCLAAmyAl5SEQc320.jpg",
                    "brown" : "1024x0_1_q87_autohomecar__wKjBy1j55sCAMmc3AAh-lJSzVKQ772.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKgH11ZtUJ2AUnB_AAhDClgXmKE827.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFWFf8vAyAY2J0AAsG8fyGdZ0869.jpg"
                },
                "directory": "Buick_verano"
            }
        ]
    },
    "吉利": {
        "pinyin": "J",
        "country": "中国",
        "series": [
            {
                "series_name": "远景",
                "type": "紧凑型轿车",
                "seat": 5,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKjBxlglq2GASkeWAAXldqX4O3Y638.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH0lj4SmuAUij5AAw_PmxBg1c240.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjBwlgoJqCACGPcAAvqyPoku-U870.jpg"
                },
                "directory": "geely_yuanjing"
            },
            {
                "series_name": "帝豪GL",
                "type": "紧凑型轿车",
                "seat": 5,
                "colors": {
                    "gold": "1024x0_1_q87_autohomecar__wKjBwVeEn9-AW9o2AAz-avleNks563.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjBzlfP_EaAeAmLAAfTxiCbp1M465.jpg"
                },
                "directory": "geely_dihaoGL"
            }
        ]
    }
};

//5000条
var arr = [];

for(var i = 0 ; i < 5000 ; i++){
    let brand = _.sample(Object.keys(carbrandsandseries), 1)[0];
    let serie = _.sample(carbrandsandseries[brand].series , 1)[0];
    let color = _.sample(Object.keys(serie.colors),1)[0];
    let colorChineseEnglish = {
        "white" : "白色",
        "orange" : "橙色",
        "yellow" : "黄色",
        "black" : "黑色",
        "red" : "红色",
        "silver" : "银色",
        "green" : "绿色",
        "blue" : "蓝色",
        "brown" : "棕色",
        "gold" : "金色"
    };


    arr.push({
        "id" : 100000 + i ,
        "brand": brand,
        "series_name": serie.series_name,
        "type": serie.type,
        "seat": serie.seat,
        "color": colorChineseEnglish[color] || "其他颜色",
        "colorEnglish" : color ,
        "image": serie.colors[color] ,
        "directory": serie.directory,
        "engine" : _.sample(["1.0","1.2T","1.6T","1.8","2.0","3.0","4.0"],1)[0],
        "paifang" : _.sample(["国一","国二","国三","国四","国五"],1)[0],
        "biansuxiang" : _.sample(["手动","自动"],1)[0],
        "price" : _.random(0.2,200),
        "km" : _.random(0,200),
        "goumaidate": new Date(_.random(2012, 2017), _.random(0, 11), _.random(1, 30)),
        "saler": Random.cname(),
        "detail": Random.cparagraph()
    });
}

Car.remove({},function(err,data){
    console.log("【删除了" + data.result.n + "条数据】");
    Car.insertMany(arr , function(err , data){
        console.log("【添加了" + data.length + "条数据】");
    })
});