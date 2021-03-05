export default SCReduxController;
/**
 *  @class        SCReduxController
 *
 *  @classdesc    A top-level interface for launching SuperCollider and setting
 *  up the SCReduxStore.
 *
 *  @param  {Object}  props - See SCLangController and SCStoreController for
 *  the possible options.
 **/
declare class SCReduxController {
    constructor(store: any, props: any);
    sclangController: SCLangController;
    scStoreController: SCStoreController;
    /**
     *  Start SuperCollider, initialize the replica state store, and set up a
     *  channels for sending state and receiving actions.
     *
     *  @return {Promise} - Resolves when sclang has booted and store is ready.
     **/
    boot(): Promise<any>;
    /**
     *  A helper method to get the `@supercolliderjs/lang` `SCLang` instance.
     **/
    getSCLang(): import("@supercollider/lang").default;
    /**
     *  Stop all interfaces and shutdown SuperCollider.
     *
     *  @return {Promise} - Resolves when everything has shutdown.
     **/
    quit(): Promise<any>;
}
import SCLangController from "./SCLangController";
import SCStoreController from "./SCStoreController";
