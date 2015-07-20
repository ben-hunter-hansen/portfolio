/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.tabs.tabs-controller',[])

.controller('TabsCtrl', ['StateSignal', function(StateSignal) {
    this.focused = 0;
    this.tabs = {
        GitHub: {
            label: "GitHub",
            index: 0
        }, Facebook: {
            label: "Facebook",
            index: 1
        }, Twitter: {
            label: "Twitter",
            index: 2
        }, LinkedIn: {
            label: "LinkedIn",
            index: 3
        }
    };
    this.requestFeed = function(which) {
        this.focused = which.index;
        StateSignal.transmit('tabbed', which);
    };
}]);