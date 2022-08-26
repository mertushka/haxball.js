import "haxball-headless-browser";

interface RoomConfigObjectM extends RoomConfigObject {
    proxy?: string
    debug?: boolean
}
export declare type Headless = (RoomConfig: RoomConfigObjectM) => RoomObject;

declare const HaxballJS: Promise<Headless>
export default HaxballJS
