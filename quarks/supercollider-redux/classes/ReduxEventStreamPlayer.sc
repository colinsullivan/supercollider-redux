/**
 *  @file       ReduxEventStreamPlayer.sc
 *
 *	@desc       A subclass of EventStreamPlayer to dispatch events when each
 *  event of the stream is played.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

ReduxEventStreamPlayer : EventStreamPlayer {
  var <>store, <>id;

  *new {
    arg argStore, argId, stream, event;
    var instance;
    instance = super.new(stream, event);
    instance.id = argId;
    instance.store = argStore;
    ^instance;
  }
	prNext { arg inTime;
		var nextTime;
    var nextBeatAbs;
    var eventPairs;
    var action;
		var outEvent = stream.next(event.copy);
		if (outEvent.isNil) {
			streamHasEnded = stream.notNil;
			cleanup.clear;
			this.removedFromScheduler;
			^nil
		}{
			nextTime = outEvent.playAndDelta(cleanup, muteCount > 0);
			if (nextTime.isNil) { this.removedFromScheduler; ^nil };
			nextBeat = inTime + nextTime;	// inval is current logical beat

      nextBeatAbs = nextBeat + this.clock.beats;
      action = (
        type: "SUPERCOLLIDER-REDUX_SUPERCOLLIDER_EVENTSTREAMPLAYER_NEXTBEAT",
        payload: (
          id: id,
          nextBeat: nextBeatAbs
        )
      );
      outEvent.keysValuesDo({
        arg key, val;

        if (['id', 'msgFunc'].includes(key) == false, {
          action.payload[key] = val;
        });
      });
      store.dispatch(action);
			^nextTime
		};
	}
  //next {
    //arg inTime;
    //, nextTime;
    //nextTime = routine.next(inTime);
    //if (nextTime != nil, {
      //// if player hasn't stopped
      //nextBeatAbs = this.nextBeat + this.clock.beats;
    //});
    //^nextTime;
  //}
}
