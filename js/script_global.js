var map;
var givePath= "http://cursist05.reacollege.eu/pim_js/project_javascript/";
var locationLong= null;
var locationLat= null;
var pinpoint= L.layerGroup();
var marker;

function leadingZero(number){
    var giveNumber= number.toString();
    var giveBack;
    
    if(giveNumber.length < 2){
        giveBack= 0 + giveNumber;
    }else{
        giveBack= giveNumber;
    }

    return(giveBack);
}