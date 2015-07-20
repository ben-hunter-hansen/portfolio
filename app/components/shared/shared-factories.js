/**
 * Created by ben on 7/20/15.
 */
'use strict';

angular.module('myApp.shared.shared-factories',[])

.factory('StateSignal', ['$rootScope',function($rootScope) {
    return {
        listen: function(event,callback) {
            $rootScope.$on(event, function(event,args) {
                callback(args.message);
            });
        },
        transmit: function(event,args) {
            $rootScope.$emit(event, {message: args})
        }
    }
}]);