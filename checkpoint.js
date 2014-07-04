/* jshint unused:true, browser: true, devel: true */
/* global exports, define */

/**
 * @Author Calvin (Min) Zhang
 * @Email ye111111ow at gmail.com
 */

(function (root, factory) {
    if (typeof exports === 'object') {
        factory(exports);
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else {
        factory(root);
    }
}(this, function (exports) {

    var DEFAULT_STAGE = {
        id: "",
        title: "",
        type: "node",
        description: "",
        onPointCallback: null
    };


    /**
     * Constructor of CheckpointJs.
     *
     * @param target the DOM container of CheckpointJs. Div is preferred.
     */
    function CheckpointJs(target, options) {
        var self = this;
        
        this.checkpointJs = target;
        this.points = [];
        this.currentIndex = 0;
        this.inited = false;
        
        /* Set default options */
        this._options = {
            namespace: "checkpoint",
            direction: "right",
            theme: "default",
            debug: false
        };
        
        /* Override default options */
        if (typeof options === "object") {
            for (var attr in options) {
                this._options[attr] = options[attr];
            }
        }
        
        // Issue #1
        window.addEventListener('resize', function(){
            _resize.call(self);
        });
    }

    /**
     * Constructor of Point.
     * Point is the basic component of CheckpointJs. Each Point refers a checkpoint of CheckpointJs.
     * There are three (four) type of Point:
     *   1. start
     *   2. end
     *   3. node
     *   (4. millstone)
     *
     * @param arg the argument that used for constructing a Point.
     */
    function Point(arg) {
        /* Set default */
        for (var attr in DEFAULT_STAGE) {
            this[attr] = arg[attr];
        }

        /* 1. Use an Object to construct Point */
        if (typeof arg === "object"){
            for (var attr in arg) {
                this[attr] = arg[attr];
            }
        }
        /* 2. Use a String to construct Point */
        else if (typeof arg === "string") {
            this.title = arg;
        }
        /* 3. Wrong Constructor */
        else {
            return null;
        }
        return this;
    }

    /**
     * Initialize the CheckpointJs.
     * This function firstly cleans everything within the CheckpointJs container.
     * Then add the DOM of CheckpointJs to that container.
     *
     * @param at
     */
    function _init(at) {
        this.destroy();
        if (typeof this.checkpointJs == "object") {
            this.inited = true;
            if (typeof at != "number") {
                at = 0;
            }
            
            for ( var i = 0; i< this.points.length; i++ ) {
                if ( i === 0 ) {
                    this.points[i].type = "start";
                } else if ( i === this.points.length - 1 ) {
                    this.points[i].type = "end";
                }
                var point = this.points[i];
                var pointDom = _createDomFromPoint.call(this, point, i, at);
                this.checkpointJs.appendChild(pointDom);
            }
            this.currentIndex = at;
            _resize.call(this);
            _markPoints.call(this, this.currentIndex);
            return this;
        }
    }

    /**
     * Move to the next Point.
     */
    function _next() {
        if ( this.currentIndex < this.points.length - 1 ) {
            this.currentIndex++;
            _markPoints.call(this, this.currentIndex);
        } else {
            console.log( "[CheckpointJS] No next point." );
        }
        return this;
    }

    /**
     * Move back to the previous Point.
     */
    function _prev() {
        if ( this.currentIndex > 0 ) {
            this.currentIndex--;
            _markPoints.call(this, this.currentIndex);
        } else {
            console.log( "[CheckpointJS] No previous point." );
        }
        return this;
    }

    /**
     * Move to the latest Point. Mark all the Point as done.
     */
    function _complete() {
        this.currentIndex = this.points.length - 1;
        _markPoints.call(this, this.currentIndex);
        return this;
    }

    /**
     * Move to a specific Point
     *
     * @param index the index of Point, started from 0.
     */
    function _reach(index) {
        if (index >= 0 && index <= this.points.length - 1) {
            this.currentIndex = index;
            _markPoints.call(this, this.currentIndex);
        } else {
            console.log( "[CheckpointJS] No such point." );
        }
        return this;
    }

    /**
     * Clear all changes. Restore the status of CheckpointJs.
     */
    function _reset() {
        this.currentIndex = 0;
        _markPoints.call(this, this.currentIndex);
        return this;
    }

    /**
     * Mark all Points before the index one as done. Mark all Points after the index one as todo.
     * The callee must make sure the index is correct.
     *
     * @private
     */
    function _markPoints(index) {
        var namespace = this._options.namespace,
            pointDom = null,
            i = 0;

        if (this.inited) {
            for (i = 0;i < index;i++) {
                pointDom = this.checkpointJs.querySelector( '[data-index="' + i + '"]' );
                pointDom.setAttribute( "class", namespace + "-block " + namespace + "-done" );
            }
            for (i = index + 1;i < this.points.length;i++) {
                pointDom = this.checkpointJs.querySelector( '[data-index="' + i + '"]' );
                pointDom.setAttribute( "class", namespace + "-block " + namespace + "-default" );
            }
            pointDom = this.checkpointJs.querySelector(  '[data-index="' + index + '"]' );
            pointDom.setAttribute( "class", namespace + "-block " + namespace + "-current" );
        }
        
        /* OnPoint Callback */
        if (typeof this.points[index].onPointCallback === "function") {
            this.points[index].onPointCallback(this.points[index]);
        }
    }

    /**
     * Create the DOM for a specific Point
     *
     * @param point
     * @param index the index of this Point among all Points
     *
     * @private
     */
    function _createDomFromPoint( point, index, at ) {
        var blockTitleDom = document.createElement( "div" ),
            namespace = this._options.namespace;
                
        blockTitleDom.setAttribute( "data-role", namespace + "-block-title" );
        if ( index % 2 === 0 ) {
            blockTitleDom.setAttribute( "class", namespace + "-block-title" );
        } else {
            blockTitleDom.setAttribute( "class", namespace + "-block-title " + namespace + "-alt" );
        }
        blockTitleDom.appendChild( document.createTextNode( point.title ) );

        var blockIndicatorDom = document.createElement( "div" );
        blockIndicatorDom.setAttribute( "data-role", namespace + "-block-indicator" );
        blockIndicatorDom.setAttribute( "class", namespace + "-block-indicator" );

        var blockBodyDom = document.createElement( "div" );
        blockBodyDom.setAttribute( "class", namespace + "-block-body" );
        blockBodyDom.appendChild( blockTitleDom );
        blockBodyDom.appendChild( blockIndicatorDom );

        var blockConnectorDom = document.createElement( "div" );
        blockConnectorDom.setAttribute( "data-role", namespace + "-block-connector" );
        blockConnectorDom.setAttribute( "class", namespace + "-block-connector" );        

        var pointDom = document.createElement( "div" );
        if (typeof point.id === "string") {
            pointDom.setAttribute( "id", point.id );
        }
        pointDom.setAttribute( "class", namespace + "-block" );
        pointDom.setAttribute( "data-index", index );
        pointDom.setAttribute( "data-role", namespace + "-block" );
        pointDom.style.width = 100 / this.points.length + "%";
        
        pointDom.appendChild(blockBodyDom);

        if ( point.type != "end" ) {
            pointDom.appendChild(blockConnectorDom);
        }
        
        return pointDom;
    }
    

    /**
     * Resize checkpoint dynamically based on its width
     */
    function _resize() {
        var namespace = this._options.namespace,
            blocks = this.checkpointJs.querySelectorAll('[data-role="' + namespace + '-block"]'),
            containerWidth = this.checkpointJs.offsetWidth,
            pointCount = this.points.length,
            blockWidth = containerWidth / pointCount;
                
        for ( var i = 0; i < blocks.length - 1; i++ ) {
            var connector = blocks[i].querySelector('[data-role="' + namespace + '-block-connector"]');
                        
            connector.style["margin-left"] = blockWidth / 2 + 8 + "px";
            connector.style.width = blockWidth - 16 + "px";
        }
        

    }

    /**
     * Set Points of the CheckpointJs.
     * Should be called before CheckpointJs#init()
     *
     * @param arguments an array of Point constructor.
     */
    function _setPoints(points) {
        if (Object.prototype.toString.call( points ) === '[object Array]') {
            for(var index in points) {
                var point = points[index];
                if (typeof point === "string" || typeof point === "object") {
                    this.points.push(new Point(point));
                }
                else {
                    console.log( "[CheckpointJS] Wrong point parameters." );
                }
            }
        }
        return this;
    }

    /**
     * Set/Get a point
     *
     * @param index the index of the Point
     * @param point the argument that used for constructing the Point.
     */
    function _point(index, point) {
        if (index >= 0 && index <= this.points.length - 1) {
            if (arguments.length === 1) {
                return this.points[index];
            } else if (arguments.length === 2) {
                var point = new Point(point);
                if ( point !== null ) {
                    this.points[index] = point;
                } else {
                    console.log( "[CheckpointJS] Wrong point parameters." );
                }
            } 
        } else {
            console.log( "[CheckpointJS] Wrong index" );
        }
        
        return this;
    }
    

    /**
     * Add a Point to the Point array (before index).
     *
     * @param index the new Point will be added before this index
     * @param point
     */
    function _insertPoint(index, point) {
        if (index < 0 || index > this.points.length) {
            console.log( "[CheckpointJS] Wrong index." );
            return this;
        }

        var newPoint = new Point(point);
        if (newPoint) {
            this.points.splice(index, 0, newPoint);
            if (index <= this.currentIndex) {
                this.currentIndex++;
            }
            if (this.inited) {
                _init.call(this, this.currentIndex);
            }
        }
        
        return this;
    }

    /**
     * Append a Point to the end of Points.
     *
     * @param point
     */
    function _appendPoint(point) {
        var newPoint = new Point(point);
        if (newPoint) {
            this.points.splice(this.points.length, 0, newPoint);
        }

        return this;
    }

    /**
     * Remove a specific Point.
     * @param index the index of that Point
     */
    function _removePoint(index) {
        if (index >= 0 && index <= this.points.length - 1) {
            if (index === this.currentIndex && index === this.points.length - 1) {
                this.currentIndex--;
            }
            var point = this.points.splice(index, 1);
            point.onPointCallback = null;

            if (this.inited) {
                _init.call(this, this.currentIndex);
            }
        } else {
            console.log( "[CheckpointJS] No such point." );
        }
        return this;
    }

    /**
     * Destroy all dom elements inside CheckpointJs container.
     */
    function _destroy() {
        if (this.checkpointJs !== null) {
            var container = this.checkpointJs;
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
        this.inited = false;
        return this;
    }


    var checkpointJs = function (targetSelector, options) {
        var target = document.querySelector(targetSelector);
        if (target === null) {
            console.log( "[CheckpointJS] Wrong selector." );
            return null;
        } else {
            var checkpoint = new CheckpointJs(target, options);
            return checkpoint;
        }
    };

    /**
     * Register public functions.
     */
    CheckpointJs.prototype = {
        clone: function () {
            return new CheckpointJs(this);
        },
        
        init: _init,

        point: _point,
        setPoints: _setPoints,
        insertPoint: _insertPoint,
        appendPoint: _appendPoint,
        removePoint: _removePoint,

        next: _next,
        prev: _prev,
        reach: _reach,
        complete: _complete,
        
        reset: _reset,
        destroy: _destroy
    };

    /* Export public functions */
    exports.checkpointJs = checkpointJs;

    /* Return public functions */
    return checkpointJs;
}));