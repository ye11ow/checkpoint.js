/**
 * Created by ye11ow on 13-10-26.
 */

$("document").ready(function(){
    var checkpoint = checkpointJs("#checkpoint");
    checkpoint._options.debug = true;

    /*checkpoint.setStages(
     ["What is?", "Examples", "Usage", "Download", "History", "Thanks"]
     );*/

    checkpoint.setStages(
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
    );

    function changeTab(stage) {
        console.log(stage);
        $("#" + stage.id + "-tab").tab("show");
        $("#current-stage-description").text(stage.description);
    }
    checkpoint.init();
    console.log(checkpoint);

    $("body").on("click", "[data-btn='checkpointjs-next']", function(){
        checkpoint.next();
    });
    $("body").on("click", "[data-btn='checkpointjs-prev']", function(){
        checkpoint.prev();
    });
});




