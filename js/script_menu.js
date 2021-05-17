function launchMenu(){
    function openMenu(){
        $("#menuWrap").show();
        $("#options").hide();
        $("#results").css({position: "absolute", right: 0});
    }
    function closeMenu(){
        $("#menuWrap").hide();
        $("#options").show();
        $("#results").css({position: "relative"});
    }
    function hideMenu(){
        $("#menuWrap").hide();
    }
    function openExplainFunctions(){
        $("#splideWrap").show();
        $("#goPopup").hide();
        $(this).hide();
    }
    function closeExplainFunctions(){
        $(this).parent().hide();
        $("figure").show();
    }
    function openPopup(){
        $("#popupWrap").show();
    }
    function closePopup(){
        $("#popupWrap").hide();
    }
    function createSlide(){
        new Splide(".splide", {
            autoplay: true
        }).mount();
    }
    function goToSlides(){
        $("#popupWrap").hide();
        $("#menuWrap").show();
        $("#splideWrap").show();
        $("#goPopup").hide();
        $("#explainFunctions").hide();
    }
    function init(){
        hideMenu();
        createSlide();
        
        $("#openMenu").on("click", openMenu);
        $("#closeMenu").on("click", closeMenu);
        $("#explainFunctions").on("click", openExplainFunctions);
        $(".goback").on("click", closeExplainFunctions);
        $("#goPopup").on("click", openPopup);
        $("#popupClose").on("click", closePopup);
        $("#goToHelp").on("click", goToSlides);
    }

    init();
}