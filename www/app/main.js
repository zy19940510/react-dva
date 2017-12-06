import React from "react";
import dva from "dva";
import roter from "./router.js";
import { createLogger } from 'redux-logger';

import carpickerModel from "./models/carpickerModel";
import carshowModel from "./models/carshowModel";
 

const app = dva({
    // onAction: createLogger()  
});

//注册model
app.model(carpickerModel);
app.model(carshowModel);

//路由
app.router(roter);

app.start("#app-container");