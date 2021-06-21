export default SCLangController;
/**
 *  @class        SCLangController
 *
 *  @classdesc    Start sclang using @supercollider/lang, dispatch actions
 *  during init sequence, set up a dispatch to run within sclang once scsynth
 *  has started.
 **/
declare class SCLangController {
    /**
     *  Creates the SCLangController, reading the supercolliderjs config file
     *  with a call to `resolveOptions`.  Does not boot sclang.
     *
     *  @param  {redux.Store}  store - The state store.
     *  @param  {Object}  props.sclangOptions - Options for supercolliderjs
     **/
    constructor(store: any, props?: {});
    interpretOnLangBoot: string;
    store: any;
    options: import("@supercollider/lang/lib/options").SCLangOptions;
    sclang: import("@supercollider/lang").default;
    boot(): Promise<any>;
    quit(): Promise<any>;
    getSCLang(): import("@supercollider/lang").default;
}
