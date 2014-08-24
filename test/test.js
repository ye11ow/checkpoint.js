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

    describe('#next', function(){
        it('should reach next point', function(){
            checkpoint.reach(0);

            checkpoint.next();

            expect(checkpoint).to.have.property('currentIndex', 1);
        });

        it('should do nothing when reach the end point', function(){
            checkpoint.complete();

            checkpoint.next();

            expect(checkpoint).to.have.property('currentIndex', checkpoint.points.length - 1);
        });
    });

    describe('#prev', function(){
        it('should reach previous point', function(){
            checkpoint.reach(1);

            checkpoint.prev();

            expect(checkpoint).to.have.property('currentIndex', 0);
        });

        it('should do nothing when reach the start point', function(){
            checkpoint.reach(0);

            checkpoint.prev();

            expect(checkpoint).to.have.property('currentIndex', 0);
        });
    });

    describe('#complete', function(){
        it('should reach the end point', function(){
            checkpoint.reach(0);
            checkpoint.complete();

            expect(checkpoint).to.have.property('currentIndex', checkpoint.points.length - 1);
        });
    });

    describe('#init', function(){
        it('should render DOM', function(){
            expect(checkpoint).to.have.property('changed', 2);

            checkpoint.init(0);

            expect(checkpoint).to.have.property('changed', 0);
        });
    });

    describe('autoRender', function() {
        it('should not render DOM', function(){
            var dom = document.getElementById("checkpoint");
            while(dom.firstChild){
                dom.removeChild(dom.firstChild);
            }
            var autoRenderOff = checkpointJs("#checkpoint", {autoRender: false});

            autoRenderOff.setPoints([{
                id: "first",
                title: "first"
            },{
                id: "second",
                title: "second"
            }, {
                id: "third",
                title: "third"
            }]).init(0);

            expect(autoRenderOff).to.have.property('changed', 2);
        });
    })


})
