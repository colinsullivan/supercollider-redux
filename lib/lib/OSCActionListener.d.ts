export default OSCActionListener;
/**
 *  @class        OSCActionListener
 *
 *  @classdesc    Listen for actions on an incoming OSC port and forward
 *  to the state store.
 **/
declare class OSCActionListener {
    /**
     *  @param  {Store}  params.store - The state store
     *  @param  {String}  params.clientId - A unique string to indicate the dispatch
     *  origin.
     *  @param  {Number}  params.localPort - A number of which port to listen on
     *  for incoming actions.
     **/
    constructor(params: any);
    params: any;
    store: any;
    clientId: any;
    oscPort: any;
    quit(): void;
}
