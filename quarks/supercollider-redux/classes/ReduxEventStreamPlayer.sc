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
  next {
    arg inTime;
    var nextBeatAbs, nextTime;
    nextTime = routine.next(inTime);
    nextBeatAbs = this.nextBeat + this.clock.beats;
    store.dispatch((
      type: "SUPERCOLLIDER-REDUX_SUPERCOLLIDER_EVENTSTREAMPLAYER_NEXTBEAT",
      payload: (
        id: id,
        nextBeat: nextBeatAbs
      )
    ))
    ^nextTime;
  }
}
