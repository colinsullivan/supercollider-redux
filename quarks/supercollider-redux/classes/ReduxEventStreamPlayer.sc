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
      action = (
        type: "SUPERCOLLIDER-REDUX_SUPERCOLLIDER_EVENTSTREAMPLAYER_ENDED",
        payload: (
          id: id
        )
      );
      store.dispatch(action);
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
          nextTime: nextTime,
          nextBeat: nextBeatAbs,
          outEvent: outEvent.copy()
        )
      );
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
