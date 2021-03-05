export default SCStoreController;
/**
 *  @class        SCStoreController
 *
 *  @classdesc    Forward state to replica store in SuperCollider.  Also
 *  forward actions incoming from SuperCollider to the Redux store.
 **/
declare class SCStoreController {
    /**
     *  Creates an SCStoreController and sends `init` to SC, creating an
     *  OSCActionListener to receive actions dispatched from the SCReduxStore
     *  in SuperCollider and dispatch them to the store.
     *
     *  @param  {redux.Store}  store - The state store.
     *  @param  {Number}  props.actionListenerPort - The UDP port to listen for
     *  incoming actions from the SCReduxStore in SuperCollider.
     *  @param  {Function}  props.scStateSelector - A function which receives
     *  state and outputs the portion of state to be forwarded to SuperCollider
     *  on `setState`.  Written `scStateSelector` to suggest it is implemented
     *  as a `reselect` selector.
     **/
    constructor(store: any, props?: {});
    store: any;
    _apiCallIndex: number;
    actionListener: import("./OSCActionListener").default;
    scStateSelector: any;
    scapi: SCAPI;
    init(): Promise<any>;
    prevState: any;
    unsubscribe: any;
    handle_api_error(err: any): void;
    call(apiMethodName: any, args: any): Promise<any>;
    quit(): void;
}
import SCAPI from "@supercollider/scapi";
