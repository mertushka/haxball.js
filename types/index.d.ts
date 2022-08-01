import "haxball-headless-browser";

export declare type Headless = (RoomConfig: RoomConfigObject) => RoomObject;

declare const HaxballJS: Promise<Headless>
export default HaxballJS
