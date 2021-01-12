(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Responses = __webpack_require__(1);
exports.handler = async(event) =>{
    console.log(event);
    if(!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message:"No ID parameter is provided"});
    }
    let ID = event.pathParameters.ID;
    if(!data[ID]){
        return Responses._400({message:"Given ID doesn't have any data"});
    }
    if(data[ID]){
        return Responses._200(data[ID]);
    }
}

const data = {
    "D01":{name:"Jarif",age:10,roll:"D01",profession:"engineer"},
    "D02":{name:"Shukhon",age:20,roll:"D02",profession:"physicist"},
    "D03":{name:"Piyal",age:30,roll:"D03",profession:"web Developer"}
}

/***/ }),
/* 1 */
/***/ ((module) => {

const Responses = {
    _200(data = {}){
        return{
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Methods':'*',
                'Access-Control-Allow-Origin':'*',
            },
            statusCode:200,
            body:JSON.stringify(data)
        }
    },
    _400(data = {}){
        return{
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Methods':'*',
                'Access-Control-Allow-Origin':'*',
            },
            statusCode:400,
            body:JSON.stringify(data)
        }
    }
}

module.exports = Responses;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()

));