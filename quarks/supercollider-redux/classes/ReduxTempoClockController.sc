/**
 *  @file       ReduxTempoClockController.sc
 *
 *  @desc       A TempoClock controller that receives tempo from the Redux
 *  state tree.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

ReduxTempoClockController : Object {
  // the actual TempoClock instance
  var <>clock,
    store,
    lastState,
    defaultTempoBPM = 120.0;
  *new {
    arg params;

    ^super.new().init(params);
  }
  init {
    arg params;

    //"ReduxTempoClockController.init".postln();
    
    store = params['store'];

    lastState = (
      tempo: defaultTempoBPM
    );
    clock = TempoClock.new(
      tempo: defaultTempoBPM / 60.0
    );

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
    var tempoBPM = state.tempo;

    if (tempoBPM == nil, {
      tempoBPM = defaultTempoBPM;
    });

    if (lastState.tempo !== tempoBPM, {
      //"ReduxTempoClockController: Changing tempo abruptly...".postln();
      clock.tempo = tempoBPM / 60.0;
      lastState.tempoBPM = tempoBPM;
    });

  }
}
