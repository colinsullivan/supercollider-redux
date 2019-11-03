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
      'SUPERCOLLIDER_READY': "SUPERCOLLIDER-REDUX_SUPERCOLLIDER_READY",
      'SUPERCOLLIDER_INIT_START': "SUPERCOLLIDER-REDUX_SUPERCOLLIDER_INIT_START"
    )
  }
}
