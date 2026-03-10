interface HaxballJSConfig {
	proxy?: string;
	debug?: boolean;
	webrtc?: {
		RTCPeerConnection: typeof globalThis.RTCPeerConnection;
		RTCIceCandidate: typeof globalThis.RTCIceCandidate;
		RTCSessionDescription: typeof globalThis.RTCSessionDescription;
	};
}
declare function HaxballJS(config?: HaxballJSConfig): Promise<typeof HBInit>;
export { HaxballJS as default };
