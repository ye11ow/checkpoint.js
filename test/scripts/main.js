require(["../../checkpoint"], function(checkpointjs) {
  var checkpoint = checkpointjs("body");

  for (var p in checkpoint) {
    console.log(p);
  }
});