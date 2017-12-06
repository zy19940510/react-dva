export default {
    "namespace" : "carshow" , 
    "state" : {
        "images" : {} ,
        "position" : {
            "album" : "view" , 
            "color" : "" ,
            "idx" : 0
        }
    },
    "reducers" : {
        //初始化
        init(state, {results}) {
            return {
                ...state , 
                "images": results ,
                "position" : {
                    ...state.position ,
                    "color": state.position.color || Object.keys(results)[0] ,
                    "idx" : 0
                }
            }
        },
        changeColor(state, {color}){
            return {
                ...state ,
                "position" : {
                    ...state.position ,
                    color
                }
            }
        },
        //更改相册，从外观变为内饰什么的
        changealbum(state , {album}){
            return {
                ...state ,
                "position" : {
                    ...state.position , 
                    album,
                    "idx" : 0   //换图集idx要归0
                }
            }
        },
        //更改颜色
        changecolor(state, { color }) {
            return {
                ...state,
                "position": {
                    ...state.position,
                    color ,
                    "album" : "view",    //换颜色的时候外观归0
                    "idx" : 0
                }
            }
        } ,
        //更改idx
        changeidx(state, { idx }) {
            return {
                ...state,
                "position": {
                    ...state.position,
                    idx
                }
            }
        },
        //下一张
        gonext(state , action){
            //图集列表对象
            var albums = state.images[state.position.color];
            //当前图集序号，原则上大顺序必须是外观、内饰、细节。
            //但是有的车没有内饰或者没有细节，此时可以用filter过滤。
            var arr = ["view" , "center" , "detail"].filter((item)=>{
                return albums.hasOwnProperty(item);
            });
            //当前图集的序号
            var albumIdx = arr.indexOf(state.position.album);
            //当前颜色序号
            var colorIdx = Object.keys(state.images).indexOf(state.position.color);
            //颜色总数
            var colorAmount = Object.keys(state.images).length;

            if (state.position.idx < albums[state.position.album].length - 1){
                //还没有到本图集的末尾
                return {
                    ...state,
                    "position": {
                        ...state.position,
                        idx: state.position.idx + 1
                    }
                }
            } else if (albumIdx < arr.length - 1){
                //到本图集的末尾了，但是没有到总图集的末尾
                return {
                    ...state,
                    "position": {
                        ...state.position,
                        "album": arr[albumIdx + 1],
                        idx: 0
                    }
                }
            } else if (colorIdx < colorAmount - 1){
                //到本图集的末尾了，也到总图集的末尾了，但是每到颜色的末尾
                return {
                    ...state,
                    "position": {
                        ...state.position,
                        "color": Object.keys(state.images)[colorIdx + 1],
                        "album": "view",
                        idx: 0
                    }
                }
            }else {
                alert("已经到最后了！");
                return state;
            }
                
        },
        lastPic(state) {
            var album = state.position.album;
            var color = state.position.color;
            var albumkey = Object.keys(state.images[color]);
            var albumArr = ["view", "center", "detail"].filter((item) => {
                return albumkey.indexOf(item) != -1;
            })
            const colorArr = Object.keys(state.images);
            if (state.position.idx > 0) {
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: state.position.idx - 1
                    }
                }
            } else if (albumArr.indexOf(album) > 0) {
                album = albumArr[albumArr.indexOf(album) - 1];
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: state.images[color][album].length - 1,
                        album
                    }
                }
            } else if (colorArr.indexOf(color) > 0) {
                color = colorArr[colorArr.indexOf(color) - 1];
                albumkey = Object.keys(state.images[color]);
                albumArr = ["view", "center", "detail"].filter((item) => {
                    return albumkey.indexOf(item) != -1;
                })
                album = albumArr[albumArr.length - 1];
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: state.images[color][album].length - 1,
                        album,
                        color
                    }
                }
            } else {
                alert("已经是第一张！");
                return state;
            }

        }
    },
    "effects" : {
        *init_async({ chexing }, { call, put}) {
            const { results } = yield fetch("/carimages/" + chexing).then(data=>data.json());
            yield put({ "type": "init", results});
        }
    }
}