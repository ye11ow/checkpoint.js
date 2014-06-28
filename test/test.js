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

    describe('#setStages', function(){
        it('should set stages', function(){
            var length = checkpoint.stages.length;

            checkpoint.setStages([{
                id: "first",
                title: "first"
            },{
                id: "second",
                title: "second"
            }, {
                id: "third",
                title: "third"
            }]);

            expect(checkpoint).to.have.property('stages').with.length(length + 3);
            expect(checkpoint).to.have.deep.property('stages[0].title', 'first');
            expect(checkpoint).to.have.deep.property('stages[1].title', 'second');
            expect(checkpoint).to.have.deep.property('stages[2].title', 'third');
        });
    });

    describe('#insertStage', function(){
        it('should insert a stage to the stages', function(){
            var length = checkpoint.stages.length;

            checkpoint.insertStage(0, {
                id: "inserted",
                title: "inserted"
            });

            expect(checkpoint).to.have.property('stages').with.length(length + 1);
            expect(checkpoint).to.have.deep.property('stages[0].title', 'inserted');
        });
    });

    describe('#stage', function(){
        it('should set a stage', function(){
            var length = checkpoint.stages.length;

            checkpoint.stage(0, {
                id: "anotherFirst",
                title: "anotherFirst"
            });

            expect(checkpoint).to.have.property('stages').with.length(length);
            expect(checkpoint).to.have.deep.property('stages[0].title', 'anotherFirst');
        });
    });

    describe('#stage', function(){
        it('should get a stage', function(){
            var stage = checkpoint.stage(0);

            expect(stage).to.have.property('title', 'anotherFirst');
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

    describe('#removeStage', function(){
        it('should remove a specific stage', function(){
            var length = checkpoint.stages.length;

            checkpoint.removeStage(length - 1);

            expect(checkpoint).to.have.property('stages').with.length(length - 1);
        });
    });


})
