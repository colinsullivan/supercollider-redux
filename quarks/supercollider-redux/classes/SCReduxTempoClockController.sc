/**
 *  @file       SCReduxTempoClockController.sc
 *
 *  @desc       A TempoClock controller that receives tempo from the Redux
 *  state tree.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

SCReduxTempoClockController : Object {
  // the actual TempoClock instance
  var <>clock,
    store,
    lastTempoBPM;

  *new {
    arg params;

    ^super.new().init(params);
  }
  getTempoFromState {
    var state = store.getState();

    ^state.tempo;
  }
  getTempoFromBPM {
    arg tempoBPM;
    ^tempoBPM / 60.0;
  }
  setClockTempoFromState {
    var tempoBPM = this.getTempoFromState();

    clock.tempo = this.getTempoFromBPM(tempoBPM);
    lastTempoBPM = tempoBPM;
  }
  init {
    arg params;

    //"SCReduxTempoClockController.init".postln();
    store = params['store'];

    if (params['clock'].isNil(), {
      clock = TempoClock.default;
    }, {
      clock = params['clock'];
    });

    store.subscribe({
      this.handleStateChange();
    });
  }
  isReady {
    ^(clock != nil);
  }

  beats {
    ^clock.beats;
  }

  handleStateChange {
    var state = store.getState();
    var tempoBPM = this.getTempoFromState();

    if (lastTempoBPM != tempoBPM, {
      //"SCReduxTempoClockController: Changing tempo abruptly...".postln();
      this.setClockTempoFromState();
    });
  }
}
