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
        onStageCallback: null
    };


    /**
     * Constructor of CheckpointJs.
     *
     * @param target the DOM container of CheckpointJs. Div is preferred.
     */
    function CheckpointJs(target, options) {
        var self = this;
        
        this.checkpointJs = target;
        this.stages = [];
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
     * Constructor of Stage.
     * Stage is the basic component of CheckpointJs. Each Stage refers a checkpoint of CheckpointJs.
     * There are three (four) type of Stage:
     *   1. start
     *   2. end
     *   3. node
     *   (4. millstone)
     *
     * @param arg the argument that used for constructing a Stage.
     */
    function Stage(arg) {
        /* Set default */
        for (var attr in DEFAULT_STAGE) {
            this[attr] = arg[attr];
        }

        /* 1. Use an Object to construct Stage */
        if (typeof arg === "object"){
            for (var attr in arg) {
                this[attr] = arg[attr];
            }
        }
        /* 2. Use a String to construct Stage */
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
            
            for ( var i = 0; i< this.stages.length; i++ ) {
                if ( i === 0 ) {
                    this.stages[i].type = "start";
                } else if ( i === this.stages.length - 1 ) {
                    this.stages[i].type = "end";
                }
                var stage = this.stages[i];
                var stageDom = _createDomFromStage.call(this, stage, i, at);
                this.checkpointJs.appendChild(stageDom);
            }
            this.currentIndex = at;
            _resize.call(this);
            _markStages.call(this, this.currentIndex);
            return this;
        }
    }

    /**
     * Move to the next Stage.
     */
    function _next() {
        if ( this.currentIndex < this.stages.length - 1 ) {
            this.currentIndex++;
            _markStages.call(this, this.currentIndex);
        } else {
            console.log( "[CheckpointJS] No next stage." );
        }
        return this;
    }

    /**
     * Move back to the previous Stage.
     */
    function _prev() {
        if ( this.currentIndex > 0 ) {
            this.currentIndex--;
            _markStages.call(this, this.currentIndex);
        } else {
            console.log( "[CheckpointJS] No previous stage." );
        }
        return this;
    }

    /**
     * Move to the latest Stage. Mark all the Stage as done.
     */
    function _complete() {
        this.currentIndex = this.stages.length - 1;
        _markStages.call(this, this.currentIndex);
        return this;
    }

    /**
     * Move to a specific Stage
     *
     * @param index the index of Stage, started from 0.
     */
    function _atStage(index) {
        if (index >= 0 && index <= this.stages.length - 1) {
            this.currentIndex = index;
            _markStages.call(this, this.currentIndex);
        } else {
            console.log( "[CheckpointJS] No such stage." );
        }
        return this;
    }

    /**
     * Clear all changes. Restore the status of CheckpointJs.
     */
    function _reset() {
        this.currentIndex = 0;
        _markStages.call(this, this.currentIndex);
        return this;
    }

    /**
     * Mark all Stages before the index one as done. Mark all Stages after the index one as todo.
     * The callee must make sure the  index is correct.
     *
     * @private
     */
    function _markStages(index) {
        var namespace = this._options.namespace,
            stageDom = null,
            i = 0;
        
        for (i = 0;i < index;i++) {
            stageDom = this.checkpointJs.querySelector(  '[data-index="' + i + '"]' );
            stageDom.setAttribute( "class", namespace + "-block " + namespace + "-done" );
        }
        for (i = index + 1;i < this.stages.length;i++) {
            stageDom = this.checkpointJs.querySelector(  '[data-index="' + i + '"]' );
            stageDom.setAttribute( "class", namespace + "-block " + namespace + "-default" );
        }
        stageDom = this.checkpointJs.querySelector(  '[data-index="' + index + '"]' );
        stageDom.setAttribute( "class", namespace + "-block " + namespace + "-current" );

        /* OnStage Callback */
        if (typeof this.stages[index].onStageCallback === "function") {
            this.stages[index].onStageCallback(this.stages[index]);
        }
    }

    /**
     * Create the DOM for a specific Stage
     *
     * @param stage
     * @param index the index of this Stage among all Stages
     *
     * @private
     */
    function _createDomFromStage( stage, index, at ) {
        var blockTitleDom = document.createElement( "div" ),
            namespace = this._options.namespace;
                
        blockTitleDom.setAttribute( "data-role", namespace + "-block-title" );
        if ( index % 2 === 0 ) {
            blockTitleDom.setAttribute( "class", namespace + "-block-title" );
        } else {
            blockTitleDom.setAttribute( "class", namespace + "-block-title " + namespace + "-alt" );
        }
        blockTitleDom.appendChild( document.createTextNode( stage.title ) );

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

        var stageDom = document.createElement( "div" );
        if (typeof stage.id === "string") {
            stageDom.setAttribute( "id", stage.id );
        }
        stageDom.setAttribute( "class", namespace + "-block" );
        stageDom.setAttribute( "data-index", index );
        stageDom.setAttribute( "data-role", namespace + "-block" );
        stageDom.style.width = 100 / this.stages.length + "%";
        
        stageDom.appendChild(blockBodyDom);

        if ( stage.type != "end" ) {
            stageDom.appendChild(blockConnectorDom);
        }
        
        return stageDom;
    }
    

    /**
     * Resize checkpoint dynamically based on its width
     */
    function _resize() {
        var namespace = this._options.namespace,
            blocks = this.checkpointJs.querySelectorAll('[data-role="' + namespace + '-block"]'),
            containerWidth = this.checkpointJs.offsetWidth,
            stageCount = this.stages.length,
            blockWidth = containerWidth / stageCount;
                
        for ( var i = 0; i < blocks.length - 1; i++ ) {
            var connector = blocks[i].querySelector('[data-role="' + namespace + '-block-connector"]');
                        
            connector.style["margin-left"] = blockWidth / 2 + 8 + "px";
            connector.style.width = blockWidth - 16 + "px";
        }
        

    }

    /**
     * Set Stages of the CheckpointJs.
     * Should be called before CheckpointJs#init()
     *
     * @param arguments an array of Stage constructor.
     */
    function _setStages(stages) {
        if (Object.prototype.toString.call( stages ) === '[object Array]') {
            for(var index in stages) {
                var stage = stages[index];
                if (typeof stage === "string" || typeof stage === "object") {
                    this.stages.push(new Stage(stage));
                }
                else {
                    console.log( "[CheckpointJS] Wrong stage parameters." );
                }
            }
        }
        return this;
    }

    /**
     * Replace a current Stage with the new one.
     *
     * @param index the index of the Stage
     * @param arg the argument that used for constructing the Stage.
     */
    function _setStage(index, arg) {
        if (typeof stage === "object") {
            if (index >= 0 && index <= this.stages.length - 1) {
                var stage = new Stage(arg);
                if ( stage !== null ) {
                    this.stages[index] = stage;
                } else {
                    console.log( "[CheckpointJS] Wrong stage parameters." );
                }
            } else {
                console.log( "[CheckpointJS] No such stage." );
            }
        }
        return this;
    }
    

    /**
     * Add a Stage to the Stage array (after index).
     *
     * @param index the new Stage will be added before this index
     * @param stage
     */
    function _insertStage(index, stage) {
        if (index < 0 || index > this.stages.length) {
            console.log( "[CheckpointJS] Wrong index." );
            return this;
        }
        var newStage = new Stage(stage);
        if (newStage) {
            this.stages.splice(index, 0, newStage);
        } else {
            return this;
        }
        if (index <= this.currentIndex) {
            this.currentIndex++;
        }
        if (this.inited) {
            _init.call(this, this.currentIndex);
        }
        
        return this;
    }

    /**
     * Append a Stage to the end of Stages.
     *
     * @param stage
     */
    function _appendStage(stage) {
        var newStage = new Stage(stage);
        if (newStage) {
            this.stages.splice(this.stages.length, 0, newStage);
        }

        return this;
    }

    /**
     * Remove a specific Stage.
     * @param index the index of that Stage
     */
    function _removeStage(index) {
        if (index >= 0 && index <= this.stages.length - 1) {
            this.stages.splice(index, 1);
            this.destroy();
            this.init();
        } else {
            console.log( "[CheckpointJS] No such stage." );
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
        setStages: _setStages,
        setStage: _setStage,
        insertStage: _insertStage,
        appendStage: _appendStage,
        atStage: _atStage,
        removeStage: _removeStage,
        next: _next,
        prev: _prev,
        complete: _complete,
        init: _init,
        reset: _reset,
        destroy: _destroy
    };

    /* Export public functions */
    exports.checkpointJs = checkpointJs;

    /* Return public functions */
    return checkpointJs;
}));