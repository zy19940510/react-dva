export default {
    namespace: "carpicker" , 
    state : {
        "filter" : [] , 
        "results" : [],
        "amount" : 0 ,
        "page" : 1,
        "pagesize" : 10,
        "sortby" : "id",
        "sortDirec" : 1
    },
    reducers : {
        deltag_sync(state , action){
            return {
                ...state , 
                "filter": state.filter.filter((item)=>{
                    return item.tagname != action.tagname;
                })
            }
        },
        addtag_sync(state, { tagname, value, words}){
            var isEixt = false; // 是否存在
            state.filter.forEach((item)=>{
                if(item.tagname == tagname) isEixt = true;
            });

            if (!isEixt){
                //增加
                return {
                    ...state,
                    "filter": [
                        ...state.filter,
                        {
                            value,
                            tagname,
                            words
                        }
                    ],
                    "page" : 1
                }
            }else{
                //修改
                return {
                    ...state,
                    "filter": state.filter.map(item => {
                        if (item.tagname != tagname) return item;
                        return {
                            value,
                            tagname,
                            words
                        }
                    }),
                    "page": 1
                }
            } 
        },
        changeResult_sync(state , {results , amount}){
            return {
                ...state,
                results,
                amount
            }
        },
        //改变页码
        changepage_sync(state, { page, pagesize, sortby , sortDirec}){
            return {
                ...state , 
                page : page || state.page, 
                pagesize  : pagesize || state.pagesize,
                sortby: sortby || state.sortby, 
                sortDirec: sortDirec || state.sortDirec
            }
        }
    },
    effects : {
        *addtag({tagname , value , words} , {put , select}){
            //在异步的effect中得到state，要使用select函数：
            const filter = yield select(state=>state.carpicker.filter);
            const {page,pagesize,sortby,sortDirec} = yield select(state=>state.carpicker);

            //查询对象
            var queryobj = {
                page : 1,
                pagesize,
                sortby,
                sortDirec
            }

            //遍历已经有的筛选器
            filter.forEach((item)=>{
                //根据你的action的tagname，加查询对象的键
                addQueryobjKey(item.tagname , item.value , queryobj)
            });

            //加一次本次的
            addQueryobjKey(tagname , value , queryobj);

            //将queryobj对象变为查询字符串
            var querystring = (function(){
                var arr = [];
                for(var k in queryobj){
                    arr.push(k + "=" + queryobj[k]);
                }
                return arr.join("&");
            })();

            const {results , amount} = yield fetch("/api?" + querystring).then(data=>data.json());

            //两个put
            yield put({"type" : "addtag_sync" , tagname , value , words});
            yield put({ "type": "changeResult_sync", results, amount});
        },
        //拉取默认数据
        *fetchInit(action , {put,select}){
            const { page, pagesize } = yield select(state=>state.carpicker);
            const {results , amount} = yield fetch(`/api?page=${page}&pagesize=${pagesize}`).then(data=>data.json());
            yield put({ "type": "changeResult_sync", results, amount});
        },
        *deltag(action , {put , select}){
            //在异步的effect中得到state，要使用select函数：
            const filter = yield select(state=>state.carpicker.filter);

            const { page, pagesize, sortby, sortDirec } = yield select(state => state.carpicker);

            //查询对象
            var queryobj = {
                page,
                pagesize,
                sortby,
                sortDirec
            }

            //遍历已经有的筛选器
            filter.forEach((item)=>{
                if(item.tagname != action.tagname){
                    //根据你的action的tagname，加查询对象的键
                    addQueryobjKey(item.tagname , item.value , queryobj)
                }
            });

            //将queryobj对象变为查询字符串
            var querystring = (function(){
                var arr = [];
                for(var k in queryobj){
                    arr.push(k + "=" + queryobj[k]);
                }
                return arr.join("&");
            })();

            const {results , amount} = yield fetch("/api?" + querystring).then(data=>data.json());

            //两个put
            yield put({"type" : "deltag_sync" , tagname : action.tagname});
            yield put({"type" : "changeResult_sync" , results , amount});
        },
        *changepage(action , {put , select}){
            //最终目的是：
            //1) 改变state中的page
            //2）拉取数据
            // 这里不能改变state！这里是异步的环境！
            const filter = yield select(state => state.carpicker.filter);
            
            // //查询对象
            var queryobj = {
                "page": action.page,    //得到最新的换页
                "pagesize": action.pagesize ,
                "sortby": action.field,
                "sortDirec": action.order == "ascend" ? 1 : -1
            }

            //遍历已经有的筛选器
            filter.forEach((item) => {
                if (item.tagname != action.tagname) {
                    //根据你的action的tagname，加查询对象的键
                    addQueryobjKey(item.tagname, item.value, queryobj)
                }
            });

            //将queryobj对象变为查询字符串
            var querystring = (function () {
                var arr = [];
                for (var k in queryobj) {
                    arr.push(k + "=" + queryobj[k]);
                }
                return arr.join("&");
            })();

            const { results, amount } = yield fetch("/api?" + querystring).then(data => data.json());

            //两个put
            yield put({ "type": "changepage_sync", "page": action.page ,  "pagesize" : action.pagesize});
            yield put({ "type": "changeResult_sync", results, amount });
        }
    }
}



//根据tagname弄出一个queryobj对象
function addQueryobjKey(tagname , value , queryobj){
    if(tagname == "品牌"){
        queryobj["brand"] = value;
    }

    if(tagname == "车系"){
        queryobj["series_name"] = value;
    }

    if(tagname == "价格"){
        queryobj["price"] = JSON.stringify(value);
    }

    if(tagname == "公里数"){
        queryobj["km"] = JSON.stringify(value);
    }

    if(tagname == "车型"){
        queryobj["type"] = JSON.stringify(value);
    }

    if(tagname == "座位数"){
        queryobj["seat"] = JSON.stringify(value.map(item=>{
            return parseInt(item);
        }));
    }

    if(tagname == "颜色"){
        queryobj["color"] = value;
    }

    if(tagname == "发动机"){
        queryobj["engine"] = JSON.stringify(value);
    }

    if(tagname == "排放"){
        queryobj["paifang"] = JSON.stringify(value);
    }

    if(tagname == "变速箱"){
        queryobj["biansuxiang"] = value;
    }
}