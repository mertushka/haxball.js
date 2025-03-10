import 'haxball-headless-browser';

interface HaxballJSConfig {
  webrtc?: any;
}

interface RoomConfigObjectM extends RoomConfigObject {
  proxy?: string;
  debug?: boolean;
}

export type Headless = (roomConfig: RoomConfigObjectM) => RoomObject;

declare function HaxballJS(config?: HaxballJSConfig): Promise<Headless>;

export default HaxballJS;
