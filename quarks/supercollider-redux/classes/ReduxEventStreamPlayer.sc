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
    if (nextTime != nil, {
      // if player hasn't stopped
      nextBeatAbs = this.nextBeat + this.clock.beats;
      store.dispatch((
        type: "SUPERCOLLIDER-REDUX_SUPERCOLLIDER_EVENTSTREAMPLAYER_NEXTBEAT",
        payload: (
          id: id,
          nextBeat: nextBeatAbs
        )
      ));
    });
    ^nextTime;
  }
  // ddwMixerChannel hack
  // see: https://github.com/jamshark70/ddwMixerChannel/pull/1
	playInMixerGroup { |mixer, target, patchType, args|
		var	protoEvent;
		args ?? { args = () };
		protoEvent = this.event;
		protoEvent.proto ?? { protoEvent.proto = () };
		protoEvent.proto.putAll((
			chan: mixer,
			server: mixer.server,
			group: target.tryPerform(\nodeID) ?? { target },
			bus: mixer.inbus,
			outbus: mixer.inbus.index,
			out: mixer.inbus.index,
			i_out: mixer.inbus.index
		));
		^this.play(args[\clock], args[\doReset], args[\quant]);
	}
}
