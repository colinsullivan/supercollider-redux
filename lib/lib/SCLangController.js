"use strict";
/**
 *  @file       SCLangController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2019 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
exports.__esModule = true;
var lang_1 = require("@supercollider/lang");
var actions_1 = require("./actions");
/**
 *  @class        SCLangController
 *
 *  @classdesc    Start sclang using @supercollider/lang, dispatch actions
 *  during init sequence, set up a dispatch to run within sclang once scsynth
 *  has started.
 **/
var SCLangController = /** @class */ (function () {
    /**
     *  Creates the SCLangController, reading the supercolliderjs config file
     *  with a call to `resolveOptions`.  Does not boot sclang.
     *
     *  @param  {redux.Store}  store - The state store.
     *  @param  {Object}  props.sclangOptions - Options for supercolliderjs
     **/
    function SCLangController(store, props) {
        if (props === void 0) { props = {}; }
        var _a = props.sclangOptions, sclangOptions = _a === void 0 ? {} : _a, _b = props.interpretOnLangBoot, interpretOnLangBoot = _b === void 0 ? "" : _b;
        this.interpretOnLangBoot = "\nAPI.mountDuplexOSC();\n" + interpretOnLangBoot + "\ns.waitForBoot({\n  SCReduxStore.getInstance().dispatch((\n    type: SCRedux.actionTypes['SC_SYNTH_READY']\n  ));\n});\n    ";
        this.store = store;
        this.options = lang_1.resolveOptions(sclangOptions);
        this.sclang = null;
    }
    SCLangController.prototype.boot = function () {
        var _this = this;
        this.store.dispatch(actions_1.scLangInit());
        return new Promise(function (res, rej) {
            return lang_1.boot(_this.options)
                .then(function (lang) {
                _this.sclang = lang;
                lang.interpret(_this.interpretOnLangBoot).then(function () {
                    _this.store.dispatch(actions_1.scLangReady());
                    res(lang);
                });
            })["catch"](rej);
        });
    };
    SCLangController.prototype.quit = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sclang
                .interpret("\nServer.freeAll();\nServer.quitAll();\n      ")
                .then(function () {
                _this.sclang
                    .quit()
                    .then(function () {
                    _this.store.dispatch(actions_1.scLangQuit());
                    resolve();
                })["catch"](reject);
            })["catch"](reject);
        });
    };
    SCLangController.prototype.getSCLang = function () {
        return this.sclang;
    };
    return SCLangController;
}());
exports["default"] = SCLangController;
