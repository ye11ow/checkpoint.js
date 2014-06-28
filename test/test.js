describe('Checkpoint', function(){

	var checkpoint = null;

	before(function(){
		checkpoint = checkpointJs("#checkpoint");
	});

	after(function(){
		if (checkpoint && typeof checkpoint.destroy === "function") {
			checkpoint.destroy();
		}
	});

	describe('#insertStage', function(){
		it('should insert a stage to the stages', function(){
			var length = checkpoint.stages.length;

			checkpoint.insertStage(0, {
				id: "first",
            	title: "first"
			});

			expect(checkpoint).to.have.property('stages').with.length(length + 1);
			expect(checkpoint).to.have.deep.property('stages[' + length + '].title', 'first');
    	});
	});


	describe('#appendStage', function(){
		it('should append a stage to the end of stages', function(){
			var length = checkpoint.stages.length;

			checkpoint.appendStage({
				id: "last",
            	title: "last"
			});

			expect(checkpoint).to.have.property('stages').with.length(length + 1);
			expect(checkpoint).to.have.deep.property('stages[' + length + '].title', 'last');
    	});
	});


})
