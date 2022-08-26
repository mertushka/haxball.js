import "haxball-headless-browser";

interface RoomConfigObjectM extends RoomConfigObject {
    proxy?: string
}
export declare type Headless = (RoomConfig: RoomConfigObjectM) => RoomObject;

declare const HaxballJS: Promise<Headless>
export default HaxballJS
