/* global define, Backbone*/
define([
        'jquery',
        'require',
        'handlebars',
        'underscore',
        'text!faostat_ui_browse_by_domain/html/templates.hbs',
        'i18n!faostat_ui_browse_by_domain/nls/translate',
        'faostat_commons',
        'FAOSTAT_UI_TREE',
        'bootstrap',
        'sweetAlert',
        'amplify'],
    function ($, Require, Handlebars, _, templates, translate, FAOSTATCommons, TREE) {

    'use strict';

    function BROWSE_BY_DOMAIN() {

        this.CONFIG = {
            lang: 'en',
            lang_faostat: 'E',
            placeholder_id: 'faostat_ui_browse_by_domain',
            prefix: 'faostat_ui_browse_by_domain_',

            url_wds_crud: null,

            // default code
            code: 'QC'
        };
    }

    BROWSE_BY_DOMAIN.prototype.init = function(config) {

        //console.log("BROWSE_BY_DOMAIN");

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        console.log(this.CONFIG.url_wds_crud);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang !== null ? this.CONFIG.lang : 'en';

        /* Store FAOSTAT language. */
        this.CONFIG.lang_faostat = FAOSTATCommons.iso2faostat(this.CONFIG.lang);

        /* getting placeholder */
        var $placeholder = $(this.CONFIG.placeholder_id).length > 0? $(this.CONFIG.placeholder_id): $("#" + this.CONFIG.placeholder_id);

        /* render */
        this.render($placeholder);
    };

    BROWSE_BY_DOMAIN.prototype.render = function($placeholder) {
        var source = $(templates).filter('#structure').html();
        var template = Handlebars.compile(source);
        var d = {
            title: translate.title
        };
        var html = template(d);

        /* rendering template **/
        $placeholder.html(html);

        /* render tree */
        this.renderTree(this.CONFIG.code);
    };

    BROWSE_BY_DOMAIN.prototype.renderTree = function(code) {
        /* Initiate tree. */
        this.tree = new TREE();
        this.tree.init({
            lang: this.CONFIG.lang,
            code: this.CONFIG.code,
            placeholder_id: '[data-role="content-tree"]',
            callback: {
                onClick: _.bind(this.updateView, this)
            }
        });
        this.subscribe();
    };


    BROWSE_BY_DOMAIN.prototype.renderView = function(id) {
        /* get view */
        Require(['text!faostat_ui_browse_by_domain/views/' + id + ".json"], function (json) {
            var view = $.parseJSON(json);
            //console.log(view);
        });
    };

    BROWSE_BY_DOMAIN.prototype.updateView = function(data) {
        var id = data.id;
        Backbone.history.navigate('/' + this.CONFIG.lang + '/browse/domain/' + id, {trigger: false});
        this.renderView(id);
    };

    BROWSE_BY_DOMAIN.prototype.subscribe = function() {

    };

    BROWSE_BY_DOMAIN.prototype.unsubscribe = function() {
        //console.log("unsubscribe");

        // destroy tree
        this.tree.destroy();
    };

    BROWSE_BY_DOMAIN.prototype.destroy = function(id) {
        //console.log("destroy!!");
        this.unsubscribe();
    };

    return BROWSE_BY_DOMAIN;
});