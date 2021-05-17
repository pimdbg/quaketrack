function launchAjax(){
    /*Functie haalt standaard data op, gebeurt een keer bij inladen site*/
    function getFile(){
        function handleXmlHttp() {
            function jumpToLocation(){
                var latitude= $(this).parent().parent().data("lat");
                var longitude= $(this).parent().parent().data("long");
    
                map.setView([longitude, latitude], 10);
            }
            function deleteLocation(){
                var giveId= $(this).parent().parent().data("id");
                    
                $(this).parent().parent().remove();
    
                pinpoint.removeLayer(giveId);
            }
            function searchLocation(){
                var value= $(this).val().toLowerCase();
                var content= $("#results ul li");
    
                for(i=0; i<content.length; i++){
                    if(content.eq(i).html().toLowerCase().indexOf(value)>-1){
                        content.eq(i).show();
                    }else{
                        content.eq(i).hide();
                    }
                }
            }

            if (this.readyState == 4 && this.status == 200) {
                file= JSON.parse(this.responseText);

                $("#mapWrap .load").remove();

                for(i=0; i<file.features.length; i++){
                    var longitude= file.features[i].geometry.coordinates[1];
                    var latitude= file.features[i].geometry.coordinates[0];
                    var magnitude= file.features[i].properties.mag;
                    var place= file.features[i].properties.place;
                    var dateStamp= new Date(file.features[i].properties.time);
                    var time= leadingZero(dateStamp.getHours()) + ":" + leadingZero(dateStamp.getMinutes()) + ":" + leadingZero(dateStamp.getSeconds());
                    var date= leadingZero(dateStamp.getDate()) + "-" + leadingZero((dateStamp.getMonth()+1)) + "-" + dateStamp.getFullYear();
                    var markerId;

                    marker= L.marker([longitude, latitude])
                        .bindPopup("Aardbeving<br> Magnitude: " + magnitude 
                        + "<br>" + "Tijd: " + time 
                        + "<br>" + "Datum: " + date 
                        + "<br>" + place)
                        .addTo(pinpoint);

                    markerId= marker._leaflet_id;
                    pinpoint.addTo(map);
                        
                    $("#results ul").append("<li>Aardbeving<br>Magnitude: " + magnitude
                        + "<br>Datum: " + date 
                        + "<br>Tijd: " + time
                        + "<br>Locatie: " + place
                        + "<br><p><span title=\"Ga Naar Locatie\"  class=\"golocation\"><i class=\"fas fa-paper-plane\"></i></span>"
                        + "<span title=\"Locatie Verwijderen\" class=\"deletelocation\"><i class=\"fas fa-trash-alt\"></i></span></p>"
                        + "</li>");
                    $("#results ul li:last-child").data("lat", latitude)
                        .data("long", longitude)
                        .data("id", markerId);
                }
            }
            $(".golocation").on("click", jumpToLocation);
            $(".deletelocation").on("click", deleteLocation);

            $("#searchResults").on("input", searchLocation);
        }
        function prep(){
            if(map.hasLayer(pinpoint)){
                pinpoint.clearLayers();
            }
            
            $("#results ul").empty();
    
            $("#mapWrap").append("<div class=\"load\"></div>")
            $("#mapWrap .load").css({
                width: 60,
                height: 60,
                position: "absolute",
                top: 30,
                right: 30,
                zIndex: 1700});
        }

        var xhttp = new XMLHttpRequest();
        var getMinMagnitude= $("#magnitudeMin").val();
        var getMaxMagnitude= $("#magnitudeMax").val();
        var getRadius= $("#locationRange").val();
        var getMinDate= $("#dateMin").val();
        var getMaxDate= $("#dateMax").val();
        var getResultControl=$("#resultControl").val();
        var giveQuery= "minmagnitude=" + getMinMagnitude 
            + "&maxmagnitude=" + getMaxMagnitude
            + "&longitude=" + locationLong
            + "&latitude=" + locationLat
            + "&maxradiuskm=" + getRadius
            + "&starttime=" + getMinDate
            + "&endtime=" + getMaxDate
            + "&limit=" + getResultControl;

        prep();

        xhttp.onreadystatechange = handleXmlHttp;
        xhttp.open("GET", givePath + "req/filehandler.php?" + giveQuery, true);
        xhttp.send();
    }
    /*Zoekt naar locaties indien deze worden opgevraagd*/
    function getLocation(){
        var xhttp = new XMLHttpRequest();
        var content= $("#locationSearch").val().replace(" ","-");

        function selectedLocation(){
            if($("#location .switch").hasClass("isoff")==false){
                var latitude= $(this).data("lat");
                var longitude= $(this).data("long");
                locationLong= longitude;
                locationLat= latitude;

                if($(".selected")){
                    $(".selected").remove();
                }

                $(this).children("table")
                    .children()
                    .children("tr:first-child")
                    .append("<td rowspan=\"2\" class=\"selected\"><i class=\"fas fa-check\"></i></td>");
            }
        }
        function ajaxRequest(){
            if (this.readyState == 4 && this.status == 200) {
                var file= JSON.parse(this.responseText);

                $("#location .load").remove();

                if(file.geonames.length>2){
                    var countTop= 3;
                }else {
                    var countTop= file.geonames.length;
                }

                for(i=0; i<countTop; i++){
                    var name= file.geonames[i].name;
                    var country= file.geonames[i].countryName;
                    var lat= file.geonames[i].lat;
                    var long= file.geonames[i].lng;

                    /*Geeft top 3 resultaten weer in de resultatenlijst*/
                    $("#location ul").append("<li><table><tr><td>" + name + "</td></tr><tr><td>" + country + "</td></tr></table></li>");
                    $("#location ul li:last-child").data("long", long);
                    $("#location ul li:last-child").data("lat", lat);
                }
            }
            /*Maakt een pinpoint aan met de coordinaten van de gekozen plek en zet deze op de map*/
            $("#location ul li").on("click", selectedLocation);
        }
        function readyUp(){
            /*Geeft indien nodig een laad-icoontje en maakt de resultatenlijst leeg*/
            $("#location ul").before("<div class=\"load\"></div>");
            $("#location ul").empty();   
        }
        
        readyUp();
        
        xhttp.onreadystatechange = ajaxRequest;
        
        xhttp.open("GET", givePath + "req/location.php?searched=" + content, true);
        xhttp.send();
    }
    function init(){
        getFile();
        
        $("#locationSend").on("click", getLocation);
        $("#send").on("click", getFile);
    }

    init();
}