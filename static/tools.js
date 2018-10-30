'use strict';
var Q=(val)=>{
    let key=val.substring(0,1);
    if (key==='#'){
        return document.getElementById(val.substring(1));
    }
}

var E=(val)=>{return document.createElement(val)}

var timeFormat =(sec)=>{
    let res='';
    if (sec<10){
        res='00:0'+sec;
    }else if (sec<60) {
        res='00:'+sec;
    }else{
        let m=(sec/60).toFixed(0);
        let sm='';
        let s=sec%60;
        let ss='';
        if (m < 10){
            sm='0'+m;
        }else{
            sm=''+m;
        }
        if (s < 10){
            ss='0'+s;
        }else{
            ss=''+s;
        }
        res=''+sm+':'+ss;
    }
    return res;
}