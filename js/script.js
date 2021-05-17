function launchOptions(){
    function setupResults(){
        function toggleMovement(){
            $("#results").toggleClass("isopened");

            if($("#results").hasClass("isopened")){
                var normalWidth= "20%";

                $("#results").show();
                $("#options").width(normalWidth).css({
                    width: normalWidth});
            }else {
                var normalWidth= $("#options").width();
                var wrapWidth= $("#resultsWrap").width();

                $("#results").hide();
                $("#options").data("normalWidth", normalWidth).css({
                    width: wrapWidth});
            }
        }
        function hideOptions(){
            $("#results").hide();
        }
        
        hideOptions();
        $("#resultsButton").on("click", toggleMovement);
    }
    function setupFilters(){        
        function setFilterMagnitude(){
            /*Magnitude-slider*/
            $("#magnitudeSlider").slider({
                min: 0,
                max: 100,
                range: true,
                values: [30, 70],
                slide: function( event, ui ) {
                    $("#magnitudeMin").val(ui.values[0]/10);
                    $("#magnitudeMax").val(ui.values[1]/10);
                }
            });
            /*Zorgt ervoor dat de slider gecorrigeerd wordt indien er andere nummers worden ingetikt*/
            $("#magnitude input").on("input", function(){
                var magMin= ($("#magnitudeMin").val())*10;
                var magMax= ($("#magnitudeMax").val())*10;

                $("#magnitudeSlider").slider({
                    values: [magMin, magMax]
                });
            });
        }
        function setFilterLocation(){
            /*Slider voor radius*/
            $("#locationSlider").slider({
                min: 1,
                max: 1500,
                value: 500,
                slide: function( event, ui ) {
                    $("#locationRange").val(ui.value);
                }
            });
            /*Regelt dat de slider update als er handmatig een waarde wordt ingevoerd*/
            $("#locationRange").on("input", function(){
                var rangeValue= $(this).val();
                
                $("#locationSlider").slider({
                    value: rangeValue
                });
            });
        }
        function setFilterDate(){
            /*Datepicker voor filter min- en maxdatum met resultaten*/
            $("#dateMin, #dateMax").datepicker({
                maxDate: 0,
                dateFormat: "dd/mm/yy"
            });

            $("#resultSlider").slider({
                min: 1,
                max: 500,
                value: 120,
                slide: function(event, ui){
                    $("#resultControl").val(ui.value)
                }
            });
        }
        function formDate(){
            var dateMin= new Date(new Date().setDate(new Date().getDate()-1));
            var dateMax= new Date();
            var formMax= leadingZero(dateMax.getDate()) + "/" + leadingZero(dateMax.getMonth()+1) + "/" + dateMax.getFullYear();
            var formMin= leadingZero(dateMin.getDate()) + "/" + leadingZero(dateMin.getMonth()+1) + "/" + dateMin.getFullYear();

            $("#dateMax").val(formMax);
            $("#dateMin").val(formMin);
        }
        function setFilterResults(){
            /*Slider voor het grootst mogelijk teruggegeven resultaten*/
            $("#resultControl").on("input", function(){
                var resultValue= $(this).val();

                $("#resultSlider").slider({
                    value: resultValue
                });
            });
        }
        function filterFunctionality(){
        $("#filters").hide();
            $("#filtersSlider").on("click", function(){
                function slide(){
                    if($("#filtersSlider i").hasClass("slideIcon")){
                        $("#filtersSlider i").removeClass("slideIcon");
                        $("#filtersSlider i").addClass("closeIcon");
                    }else if($("#filtersSlider i").hasClass("closeIcon")){
                        $("#filtersSlider i").removeClass("closeIcon");
                        $("#filtersSlider i").addClass("slideIcon");
                    }else{
                        $("#filtersSlider i").addClass("slideIcon");
                    }
                }

                $("#filters").slideToggle(700, slide);
            });
        }
        function switchButton() {
            $(this).toggleClass("isoff");
            
            var toForm= $(this).parent().parent();
    
            if($(this).hasClass("isoff")){
                if(toForm.attr("id")=="location"){
                    if($(".selected")){
                        $("#location").data("storeLat", locationLat);
                        $("#location").data("storeLong", locationLong);
                        $(".selected").hide();
                        
                        locationLat= null;
                        locationLong= null;
                    }
                }
    
                toForm.children("input").each(function(){
                    $(this).data("value",$(this).val())
                        .val("")
                        .attr("disabled","");
                });
                toForm.children("button").attr("disabled", "");
                toForm.children("[type=number]").val(0);
                toForm.children(".slider").slider("disable");
                toForm.children("ul").css({color: "lightgray"});
            }else{
                if(toForm.parent().attr("id")=="location"){
                    if($("#location").data("storeLat")){
                        locationLat= $("#location").data("storeLat");
                        locationLong= $("#location").data("storeLong");
                        $(".selected").show();
                    }
                }
                
                toForm.children("input").each(function(){
                    var giveValue= $(this).data("value");
    
                    $(this).val(giveValue)
                        .removeAttr("disabled");
                });
                toForm.children("button").removeAttr("disabled")
                toForm.children(".slider").slider("enable");
                toForm.children("ul").css({color: "white"});
            }
        }

        setFilterMagnitude();
        setFilterLocation();
        setFilterDate();
        formDate();
        setFilterResults();
        filterFunctionality();
        
        $(".switch").on("click", switchButton);
    }
    function cancelSubmit(){
        $("form").on("submit", function(e) {
            e.preventDefault();
        });
    }
    function setupMap(){
        map= L.map("map", {
            minZoom: 2
        }).setView([51.505, -0.09], 4);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
    }
    function init(){
        setupResults();
        setupFilters();
        cancelSubmit();
        setupMap();
    }

    init();
}