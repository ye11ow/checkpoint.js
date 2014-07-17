/**
 * Created by ye11ow on 13-10-26.
 */

$("document").ready(function(){
    
    var checkpoint = checkpointJs("#checkpoint");

    $(".container").onepage_scroll({
        sectionContainer: "section",
        easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
                                        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 1000,
        pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
        updateURL: false,
        beforeMove: function(index) {
            if (index >= 2) {
                $(".container").animate({
                    "padding-top": "100px"
                }, 500);
                $(".header").animate({
                    "top": "-100px"
                }, 500);
            } else if (index === 1) {
                $(".container").animate({
                    "padding-top": "200px"
                }, 500);
                $(".header").animate({
                    "top": "0px"
                }, 500);
            }
            checkpoint.reach(index - 1);
        },
        afterMove: function(index) {},
        loop: false,
        keyboard: true,
        responsiveFallback: false,
        direction: "vertical"
    });
    
    checkpoint.setPoints([{
            id: "introduction",
            title: "What is?",
            description: "What is Checkpoint.js?"
        },{
            id: "examples",
            title: "Examples",
            description: "Some Examples"
        }, {
            id: "usage",
            title: "Usage",
            description: "Usage"
        }, {
            id: "download",
            title: "Download",
            description: "Download Checkpoint.js"
        }, {
            id: "history",
            title: "History",
            description: "Version History"
        }, {
            id: "thanks",
            title: "Thanks",
            description: "Thank you!"
        }]).init(0);

    $("#trick-word").hover(function(){
        $(".checkpoint-container").fadeTo('slow', 0.1).fadeTo('slow', 1.0);
    }, function(){
        $(".header").animate({
            opacity: "1"
        }, 800);
    });
    
    var statusDemo = checkpointJs("#status-demo", {namespace: "demopoint"});
    statusDemo.setPoints(
        ["Picked Up", "Preparing", "In Transit", "At Local", "Delivering", "Delivered"]
    ).init(3);

    var progressDemo = checkpointJs("#progress-demo", {namespace: "demopoint"});
    progressDemo.setPoints(
        ["0%", "25%", "50%", "75%", "100%"]
    ).init(2);

    var timelineDemo = checkpointJs("#timeline-demo", {namespace: "demopoint"});
    timelineDemo.setPoints(
        ["Jan, 2013", "Feb, 2013", "Mar, 2013", "April, 2013", "May, 2013", "June, 2013"]
    ).init(5);

});

