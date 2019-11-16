// When the SCStoreController begins initializing the SCReduxStore in SuperCollider.
export const SC_STORE_INIT = "SUPERCOLLIDER_REDUX-SC_STORE_INIT";
// The first action dispatched from the SCReduxStore to confirm the SuperCollider store is ready.
export const SC_STORE_READY = "SUPERCOLLIDER_REDUX-SC_STORE_READY";

// When the SCLangController begins starting up sclang.
export const SC_LANG_INIT = "SUPERCOLLIDER_REDUX-SC_LANG_INIT";
// When sclang is booted.
export const SC_LANG_READY = "SUPERCOLLIDER_REDUX-SC_LANG_READY";
// When sclang has quit.
export const SC_LANG_QUIT = "SUPERCOLLIDER_REDUX-SC_LANG_QUIT";

// When the SuperCollider server has booted
export const SC_SYNTH_READY = "SUPERCOLLIDER_REDUX-SC_SYNTH_READY";
