/**
 *  @file       SCRedux.sc
 *
 *	@desc       Global constants for SCRedux library.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2019 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/


SCRedux : Object {
  *actionTypes {
    ^(
      'SC_STORE_READY': "SUPERCOLLIDER_REDUX-SC_STORE_READY",
      'SC_STORE_INIT': "SUPERCOLLIDER_REDUX-SC_STORE_INIT",
      'SC_SYNTH_READY': "SUPERCOLLIDER_REDUX-SC_SYNTH_READY"
    )
  }
}
