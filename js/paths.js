/* global define*/
define(function() {

    'use strict';

    var config = {
        paths: {
            FAOSTAT_UI_BROWSE_BY_DOMAIN: 'faostat-ui-browse-by-domain',
            faostat_ui_browse_by_domain: '../'
        },
        shim: {
            bootstrap: {
                deps: ['jquery']
            }
        }
    };

    return config;

});