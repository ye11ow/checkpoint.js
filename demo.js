/**
 * Created by ye11ow on 13-10-26.
 */

var checkpoint = checkpointJs("#checkpoint");
checkpoint._options.debug = true;

checkpoint.setStages(["stage1"], ["stage2"], ["stage3"], ["stage4"], ["stage5"]);
checkpoint.init();
console.log(checkpoint);
