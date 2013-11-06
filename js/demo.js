/**
 * Created by ye11ow on 13-10-26.
 */

$("document").ready(function(){
    var checkpoint = checkpointJs("#checkpoint",
        {
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
        }
    ).init();

    function changeTab(stage) {
        $("#" + stage.id + "-tab").tab("show");
        $("#current-stage-description").text(stage.description);
    }

    $("body").on("click", "[data-btn='checkpointjs-next']", function(){
        checkpoint.next();
    });
    $("body").on("click", "[data-btn='checkpointjs-prev']", function(){
        checkpoint.prev();
    });

    var statusDemo = checkpointJs("#status-demo");
    statusDemo.setStages(
        ["Picked Up", "Preparing", "In Transit", "At Local", "Delivering", "Delivered"]
    ).init(2);

    var progressDemo = checkpointJs("#progress-demo");
    progressDemo.setStages(
        ["0%", "25%", "50%", "75%", "100%"]
    ).init(4);

    var timelineDemo = checkpointJs("#timeline-demo");
    timelineDemo.setStages(
        ["Jan, 2013", "Feb, 2013", "Mar, 2013", "April, 2013", "May, 2013", "June, 2013"]
    ).init(1);


    console.log(checkpoint);

    $("#trick-word").hover( function(){
        $(".large-circle").animate({
            opacity: "show"
        }, 400 );
    }, function(){
        $(".large-circle").animate({
            opacity: "hide"
        }, "slow" );
    });
    /**/


});




