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

    describe('#setPoints', function(){
        it('should set points', function(){
            var length = checkpoint.points.length;

            checkpoint.setPoints([{
                id: "first",
                title: "first"
            },{
                id: "second",
                title: "second"
            }, {
                id: "third",
                title: "third"
            }]);

            expect(checkpoint).to.have.property('points').with.length(length + 3);
            expect(checkpoint).to.have.deep.property('points[0].title', 'first');
            expect(checkpoint).to.have.deep.property('points[1].title', 'second');
            expect(checkpoint).to.have.deep.property('points[2].title', 'third');
        });
    });

    describe('#insertPoint', function(){
        it('should insert a point to the points', function(){
            var length = checkpoint.points.length;

            checkpoint.insertPoint(0, {
                id: "inserted",
                title: "inserted"
            });

            expect(checkpoint).to.have.property('points').with.length(length + 1);
            expect(checkpoint).to.have.deep.property('points[0].title', 'inserted');
        });
    });

    describe('#point', function(){
        it('should set a point', function(){
            var length = checkpoint.points.length;

            checkpoint.point(0, {
                id: "anotherFirst",
                title: "anotherFirst"
            });

            expect(checkpoint).to.have.property('points').with.length(length);
            expect(checkpoint).to.have.deep.property('points[0].title', 'anotherFirst');
        });
        it('should get a point', function(){
            var point = checkpoint.point(0);

            expect(point).to.have.property('title', 'anotherFirst');
        });
    });

    describe('#appendPoint', function(){
        it('should append a point to the end of points', function(){
            var length = checkpoint.points.length;

            checkpoint.appendPoint({
                id: "last",
                title: "last"
            });

            expect(checkpoint).to.have.property('points').with.length(length + 1);
            expect(checkpoint).to.have.deep.property('points[' + length + '].title', 'last');
        });
    });

    describe('#removePoint', function(){
        it('should remove a specific point', function(){
            var length = checkpoint.points.length;

            checkpoint.removePoint(length - 1);

            expect(checkpoint).to.have.property('points').with.length(length - 1);
        });
    });

    describe('#reach', function(){
        it('should reach a specific point within range', function(){
            var to = Math.floor(Math.random() * checkpoint.points.length);

            checkpoint.reach(to);

            expect(checkpoint).to.have.property('currentIndex', to);
        });

        it('should not change the currentIndex when try to reach a invalid point', function(){
            var currentIndex = checkpoint.currentIndex;

            checkpoint.reach(-1);
            expect(checkpoint).to.have.property('currentIndex', currentIndex);

            checkpoint.reach(checkpoint.points.length);
            expect(checkpoint).to.have.property('currentIndex', currentIndex);
        });
    });

    describe('#complete', function(){
        it('should reach the end point', function(){
            checkpoint.reach(0);
            checkpoint.complete();

            expect(checkpoint).to.have.property('currentIndex', checkpoint.points.length - 1);
        });
    });


})
