( function( window, define, require, undefined ) {
    'use strict';

    define( [
        'lodash',
        'jquery'
    ], function( _, $ ) {

        /**
         * Module Class
         * @class Module
         */

        /**
         * Event beforeInit
         * @type {string}
         */
        var EVENT_BEFORE_INIT = 'beforeInit';
        /**
         * Event afterInit
         * @type {string}
         */
        var EVENT_AFTER_INIT = 'afterInit';

        /**
         * Simple JavaScript Inheritance for ES 5.1
         * based on http://ejohn.org/blog/simple-javascript-inheritance/
         * (inspired by base2 and Prototype)
         * MIT Licensed.
         */
        var fnTest = /xyz/.test( function() {xyz;} ) ? /\b_super\b/ : /.*/;

        /**
         * The base Class implementation (does nothing)
         */
        function BaseClass() {}

        /**
         * Create a new Class that inherits from this class
         *
         * @constructs Module
         * @method extend
         * @memberof Module
         * @param {Object} props
         * @returns {Function}
         */
        BaseClass.extend = function( props ) {
            var _super = this.prototype;
            this.async = false;

            /**
             * Set up the prototype to inherit from the base class
             * (but without running the init constructor)
             *
             * @type {_super}
             */
            var proto = Object.create( _super );

            /**
             * Copy the properties over onto the new prototype
             */
            for ( var name in props ) {
                /**
                 * Check if we're overwriting an existing function
                 */
                proto[name] = typeof props[name] === 'function' &&
                typeof _super[name] == 'function' && fnTest.test( props[name] ) ?
                    ( function( name, fn ) {
                    return function() {
                        var tmp = this._super;

                        /**
                         * Add a new ._super() method that is the same method
                         * but on the super-class
                         */
                        this._super = _super[name];

                        /**
                         * The method only need to be bound temporarily, so we
                         * remove it when we're done executing
                         */
                        var ret = fn.apply( this, arguments );
                        this._super = tmp;

                        return ret;
                    };
                } )( name, props[name] )
                    : props[name];
            }

            var newClass = function Module() {
                this.name = arguments[2];
                this.uid = this.uid || _.uniqueId( 'local_' );

                var element = null;
                var methods = {};

                /**
                 * Assignment of the ready contructor function
                 */
                methods.ready = typeof proto.ready === 'function' ?
                    proto.hasOwnProperty( 'ready' ) ?
                    proto.ready
                    : _super.ready
                    : function() {};

                /**
                 * Assignment of the events contructor function
                 */
                methods.events = typeof proto.events === 'function' ?
                    proto.hasOwnProperty( 'events' ) ?
                    proto.events
                    : _super.events
                    : function() {};

                if ( arguments[0] instanceof $ ) {
                    element = arguments[0];
                }

                /**
                 * beforeInit Event
                 * @event beforeInit
                 * @event beforeInit:namespace
                 */
                if ( !_.isNull( element ) ) {
                    element
                        .trigger( EVENT_BEFORE_INIT + '.^', [ element ] )
                        .trigger( EVENT_AFTER_INIT + '.' + this.name, [ element ] );
                }

                /**
                 * Initialization of constructor functions
                 *
                 * If a deferred object is passed by the constructor functions return
                 * value the afterInit events will be fired when the deferred objects
                 * are resolved
                 */
                $.when(
                    methods.ready.apply( this, arguments ),
                    methods.events.apply( this, arguments )
                ).then( _.bind( function() {

                    /**
                     * afterInit Event
                     *
                     * @event afterInit
                     * @event afterInit:namespace
                     */
                    if ( !_.isNull( element ) ) {
                        element
                            .trigger( EVENT_AFTER_INIT + '.^', [ element ] )
                            .trigger( EVENT_AFTER_INIT + '.' + this.name, [ element ] );
                    }

                }, this ) );
            };

            /**
             * Populate our constructed prototype object
             * @type {_super}
             */
            newClass.prototype = proto;

            /**
             * Enforce the constructor to be what we expect
             * @type {Function}
             */
            proto.constructor = newClass;

            /**
             * And make this class extendable
             * @type {Function}
             */
            newClass.extend = BaseClass.extend;

            return newClass;
        };

        return BaseClass;

    } );

}( this, this.define, this.require ) );
