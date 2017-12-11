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
                "type": "小型车",
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
                "type": "小型车",
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
                "type": "豪华车",
                "seat": 5,
                "colors" : {
                    "blue": "1024x0_1_q87_autohomecar__wKgH2VaBLE-APqCLAAmyAl5SEQc320.jpg",
                    "brown" : "1024x0_1_q87_autohomecar__wKjBy1j55sCAMmc3AAh-lJSzVKQ772.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKgH11ZtUJ2AUnB_AAhDClgXmKE827.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFWFf8vAyAY2J0AAsG8fyGdZ0869.jpg"
                },
                "directory": "Buick_verano"
			},
			{
                "series_name": "凯越",
                "type": "豪华车",
                "seat": 5,
                "colors" : {
                    "black": "1024x0_1_q87_autohomecar__wKgFWVh0XOiAa3L1AAlaSo8wGSs036.jpg",
                    "brown" : "1024x0_1_q87_autohomecar__wKjBwFhPoBeAQo5uAAjrQlcVhj8197.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKgH11ZtUJ2AUnB_AAhDClgXmKE827.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgHzFiB1BiATUIPAAeVJRihh3U667.jpg" 
                },
                "directory": "excelleGT"
            }
        ]
	},
	"本田": {
        "pinyin": "b",
        "country": "日本",
        "series": [
            {
                "series_name": "思域",
                "type": "小型车",
                "seat": 5,
                "colors" : {
                    "blue": "1024x0_1_q87_autohomecar__wKgH1VgumrGAMcH5AALzuo8p_9o144.jpg",
                    "brown": "1024x0_1_q87_autohomecar__wKgH3FcpyCGAWiGcAAdXNAJa-p4505.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH1ViFqg6ARSZNAA_NRSwdBhU863.jpg"   
                },
                "directory": "Honda"
            }
        ]
    },
	"宝马": {
        "pinyin": "b",
        "country": "德国",
        "series": [
            {
                "series_name": "3系",
                "type": "小型车",
                "seat": 5,
                "colors" : {
                    "blue": "800x0_1_q87_autohomecar__wKgHzFgYRVGAaMn2AAbrLdg_Ww0530.jpg",
                   'red' : '800x0_1_q87_autohomecar__wKgH5VlKIG-AcobjAAdN5KTofLI513.jpg'
                },
                "directory": "bmw_330i"
            }
        ]
	},
	"长城": {
        "pinyin": "c",
        "country": "中国",
        "series": [
            {
                "series_name": "哈佛H6",
                "type": "中型SUV",
                "seat": 5,
                "colors" : {
				   'black' : '1024x0_1_q87_autohomecar__wKgH1VcODhqAKMR9AAhfRiPim1k023.jpg',
				   'glod' : '1024x0_1_q87_autohomecar__wKgH0Ff-jCmAYqYqAAbpZvSeSXY382.jpg',
				   'gray' : '1024x0_1_q87_autohomecar__wKgHz1lKn9OAcAZbAAzxJcu0qLg675.jpg',
				   'red' : '1024x0_1_q87_autohomecar__wKgHzVhOG3qAewv0AAhT19sW0EU105.jpg',
				   'white' : '1024x0_1_q87_autohomecar__wKgFWllDrdyAOmqEAAiByv5z02A903.jpg'
                },
                "directory": "chana"
			},
			{
                "series_name": "WEY",
                "type": "豪华车",
                "seat": 5,
                "colors" : {
				   'black' : '1024x0_1_q87_autohomecar__wKgFWFlLoNGAFvWXAAVi3kf-_rc106.jpg',
				   'blue' : '1024x0_1_q87_autohomecar__wKgFVFlHihSAUhzzAAcob0P8tR0654.jpg',
				   'red' : '1024x0_1_q87_autohomecar__wKjB0lkT0MCANOYiAAbOSt58I_g787.jpg',
				   'white' : '1024x0_1_q87_autohomecar__wKgH4Vknm-GAagQkAAYpCWVL5VM244.jpg'
                },
                "directory": "greatWall"
            }
        ]
	},
	"福特": {
        "pinyin": "f",
        "country": "美国",
        "series": [
            {
                "series_name": "福克斯",
                "type": "豪华车",
                "seat": 5,
                "colors" : {
                    "brown" : "1024x0_1_q87_201503061933493463686112.jpg",
                    "gray" : "1024x0_1_q87_20141120002221178-110.jpg",
					"white": "1024x0_1_q87_autohomecar__wKgH0FjLw3OAJSLqAAjSvcUPFUU142.jpg",
					'silver' : '1024x0_1_q87_20141211145209455443511.jpg'
                },
                "directory": "Ford_escort"
			},
			{
                "series_name": "蒙迪欧",
                "type": "豪华车",
                "seat": 5,
                "colors" : {
					"black": "1024x0_1_q87_201401071414078690.jpg",
					'blue' : '1024x0_1_q87_201402141030293660.jpg',
					'red' : '1024x0_1_q87_201302181713450884244.jpg',
                    "silver" : "1024x0_1_q87_201307151443344200.jpg",
                    "yellow": "1024x0_1_q87_201306171551246940.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFV1ffqtiANvwyAAeUWjqOF60958.jpg" 
                },
                "directory": "Ford_focus"
            }
        ]
	},
	"马自达": {
        "pinyin": "m",
        "country": "中国",
        "series": [
            {
                "series_name": "马自达3",
                "type": "小型车",
                "seat": 5,
                "colors" : {
                    "red": "1024x0_1_q87_autohomecar__wKgH1FitYLKAIuCLAAq063oXVRs096.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjByVh2FO6AEi6NAAzh-OqPjQo930.jpg"   
                },
                "directory": "Mazda_Axela"
            }
        ]
    },
    "吉利": {
        "pinyin": "J",
        "country": "中国",
        "series": [
            {
                "series_name": "远景",
                "type": "小型车",
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
                "type": "小型车",
                "seat": 5,
                "colors": {
                    "gold": "1024x0_1_q87_autohomecar__wKjBwVeEn9-AW9o2AAz-avleNks563.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjBzlfP_EaAeAmLAAfTxiCbp1M465.jpg"
                },
                "directory": "geely_dihaoGL"
			},
			{
                "series_name": "博越",
                "type": "中型SUV",
                "seat": 7,
                "colors": {
                    "gold": "1024x0_1_q87_autohomecar__wKjBxlaAfDuANSmWAAklXsFb9YI898.jpg",
					"white": "1024x0_1_q87_autohomecar__wKgFVVhFJkCAHKHPAAtgkNIfxNA052.jpg",
					'red' : '1024x0_1_q87_autohomecar__wKgH6FcK_TiABGc_AAfPPpe431I340.jpg',
					'brown' : '1024x0_1_q87_autohomecar__wKgFWlfRSvOAMO8AAAyy-OWJwHU300.jpg'

                },
                "directory": "geely"
            }
        ]
	},
	"日产": {
        "pinyin": "r",
        "country": "日本",
        "series": [
            {
                "series_name": "轩逸",
                "type": "小型车",
                "seat": 5,
                "colors" : {
                    "gold": "1024x0_1_q87_autohomecar__wKgH4VgZsNiAG9RIAAflide0p_I421.jpg",
					"white": "1024x0_1_q87_autohomecar__wKgFVlbJmkSAASB8AAXQGVleBlA110.jpg",
					'black' : '1024x0_1_q87_autohomecar__wKgFW1hiPMKAWaU7AAY6MtdpOp0900.jpg'
                },
                "directory": "Nissan_xuanyi"
            }
        ]
	},
	"荣威": {
        "pinyin": "r",
        "country": "中国",
        "series": [
            {
                "series_name": "RX5",
                "type": "豪华车",
                "seat": 5,
                "colors" : {
					"black": "1024x0_1_q87_autohomecar__wKgH5Fjt52yAbdGTAAkPdOKwYBc325.jpg",
					'blue' : '1024x0_1_q87_autohomecar__wKgH01eMtWCAGM_QAAehXzUhljQ911.jpg',
					'red' : '1024x0_1_q87_autohomecar__wKgH3VepoQ-AGPDnAA157mCPQNk745.jpg',
                    "brown" : "1024x0_1_q87_autohomecar__wKgHzFfZEi6ADtQhAAXBxaABakg417.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFW1fQwxuAYjN5AAYEk8egftw132.jpg" 
                },
                "directory": "Roewe"
			},
			{
                "series_name": "360",
                "type": "小型车",
                "seat": 5,
                "colors" : {
					"black": "1024x0_1_q87_autohomecar__wKgH0Fj__GSAIVcQAAs36juXzDg710.jpg",
					'cyan' : '1024x0_1_q87_autohomecar__wKgH4FijtjaAEqKQAARbminLZUw993.jpg',
					'red' : '1024x0_1_q87_autohomecar__wKgFV1kkemmAOFs_AAZePoCq85s948.jpg',
                    "silver" : "1024x0_1_q87_autohomecar__wKgH3VihHg-ADEF-AAm_K8-RrWY569.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH0FkILcyAc8p7AAeeIC3RosY269.jpg" 
                },
                "directory": "Roewei6"
            }
        ]
    },
	"江淮": {
        "pinyin": "j",
        "country": "中国",
        "series": [
            {
                "series_name": "瑞风s7",
                "type": "中型SUV",
                "seat": 7,
                "colors" : {
                    "brown": "1024x0_1_q87_autohomecar__wKgFVFlQ1h-ADjQHAA4u9FFQWFg348.jpg",
					"white": "1024x0_1_q87_autohomecar__wKgH21k2l4iAO41ZAAm8Btl55yY760.jpg"
                },
                "directory": "Refine"
            }
        ]
	},
	"大众": {
        "pinyin": "d",
        "country": "中国",
        "series": [
            {
                "series_name": "速腾",
                "type": "小型车",
                "seat": 5,
                "colors" : {
					'black' : '1024x0_1_q87_autohomecar__wKgFVVf7OwWAW9IfAAHgorzGgQY347.jpg',
                    "red": "1024x0_1_q87_autohomecar__wKgH3lcoY6yAPL-_AAy8frPXjII527.jpg",
					"white": "1024x0_1_q87_autohomecar__wKjBwVhKof6AJ8ntAAjF71XMxng099.jpg"
                },
                "directory": "volkswagen_suteng"
			},
			{
                "series_name": "高尔夫",
                "type": "小型车",
                "seat": 5,
                "colors" : {
					'gold' : '1024x0_1_q87_autohomecar__wKgFU1i30duADzG3AAeeK68-hPQ394.jpg',
                    "red": "1024x0_1_q87_autohomecar__wKgH1VYp9vOAIp4SAAfv7yIczMg524.jpg",
					"white": "1024x0_1_q87_autohomecar__wKjB0FicOr2AaOu_AAj9I2UhAyU535.jpg"
                },
                "directory": "VolksWagenwerk_golf"
			},
			{
                "series_name": "帕萨特",
                "type": "小型车",
                "seat": 5,
                "colors" : {
					'gold' : '1024x0_1_q87_201212171018082150.jpg',
                    "red": "1024x0_1_q87_autohomecar__wKgH1FkS25WAKfFSAAc7LO_wUyk751.jpg",
					"white": "1024x0_1_q87_autohomecar__wKgFU1br65CADOXVAAQ3J_xHGx8363.jpg",
					'black' : '1024x0_1_q87_autohomecar__wKgH0Viud3mAGUI7AAqI3XAO0TI699.jpg',
					'silver' : '1024x0_1_q87_20141201184544330488510.jpg',
					'blue' : '1024x0_1_q87_201208101759222564178.jpg'
                },
                "directory": "VolksWagenwerk_Lavida"
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
        "engine" : _.sample(["1.3","1.5T","1.6T","1.8","2.0","3.0","4.0"],1)[0],
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