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
      'SC_STORE_READY': "SUPERCOLLIDER-REDUX_SC_STORE_READY",
      'SC_STORE_INIT': "SUPERCOLLIDER-REDUX_SC_STORE_INIT"
    )
  }
}
