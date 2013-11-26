/**
 * Created by ye11ow on 13-10-26.
 */

$("document").ready(function(){
    
    var checkpoint = checkpointJs("#checkpoint");
    
    checkpoint.setStages([{
            id: "introduction",
            title: "What is?",
            description: "What is Checkpoint.js?",
            onStageCallback: changeTab
        },{
            id: "examples",
            title: "Examples",
            description: "Some Examples",
            onStageCallback: changeTab
        }, {
            id: "usage",
            title: "Usage",
            description: "Usage",
            onStageCallback: changeTab
        }, {
            id: "download",
            title: "Download",
            description: "Download Checkpoint.js",
            onStageCallback: changeTab
        }, {
            id: "history",
            title: "History",
            description: "Version History",
            onStageCallback: changeTab
        }, {
            id: "thanks",
            title: "Thanks",
            description: "Thank you!",
            onStageCallback: changeTab
        }]).init(0);
    

    function changeTab(stage) {
        $("#current-stage-description").text(stage.description);
    }

    $("body").on("click", "[data-btn='checkpointjs-next']", function(){
        var $prevPage = $(".checkpoint-active");
        var $currentPage = $prevPage.next();
        if ($currentPage.length == 0) {
            return;
        }
        checkpoint.next();
        $("body").css("overflow-y", "hidden");
        
        $prevPage.animate({
            "margin-left": "-200%"
        }, 400, function() {
            $prevPage.removeClass("checkpoint-active");
            $("body").css("overflow-y", "auto");
        });
        $currentPage.addClass("checkpoint-active");
        $currentPage.animate({
            "margin-left": ""
        }, 400);
    });
    
    $("body").on("click", "[data-btn='checkpointjs-prev']", function(){
        var $prevPage = $(".checkpoint-active");
        var $currentPage = $prevPage.prev();
        if ($currentPage.length == 0) {
            return;
        }
        checkpoint.prev();
        $("body").css("overflow-y", "hidden");
        
        $prevPage.animate({
            "margin-left": "200%"
        }, 400, function() {
            $prevPage.removeClass("checkpoint-active");
            $("body").css("overflow-y", "auto");
        });
        $currentPage.addClass("checkpoint-active");
        $currentPage.animate({
            "margin-left": ""
        }, 400);
    });
    
    var activeIndex = $(".checkpoint-page").length;
    $(".checkpoint-page").each( function(index) {
        if ( $(this).hasClass("checkpoint-active") ) {
            activeIndex = index;
        }
        if ( index < activeIndex ) {
            $(this).css("margin-left", "-200%"); 
        } else if ( index > activeIndex ) {
            $(this).css("margin-left", "200%" ); 
        }
    });
    
    $("#trick-word").hover(function(){
        $(".checkpoint-container").fadeTo('slow', 0.1).fadeTo('slow', 1.0);
    }, function(){
        $(".header").animate({
            opacity: "1"
        }, 800);
    });
    


    var statusDemo = checkpointJs("#status-demo", {namespace: "demopoint"});
    statusDemo.setStages(
        ["Picked Up", "Preparing", "In Transit", "At Local", "Delivering", "Delivered"]
    ).init(2);

    var progressDemo = checkpointJs("#progress-demo", {namespace: "demopoint"});
    progressDemo.setStages(
        ["0%", "25%", "50%", "75%", "100%"]
    ).init(4);

    var timelineDemo = checkpointJs("#timeline-demo", {namespace: "demopoint"});
    timelineDemo.setStages(
        ["Jan, 2013", "Feb, 2013", "Mar, 2013", "April, 2013", "May, 2013", "June, 2013"]
    ).init(1);

});

