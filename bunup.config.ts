import { defineConfig, type BunupPlugin } from 'bunup';
import nodeify from './scripts/nodeify';

const myBunupPlugin: BunupPlugin = {
	name: 'haxball-nodeify-plugin',
	hooks: {
		onBuildStart: async (options) => {
			await nodeify().catch((error) => {
				throw new Error(`Error during nodeify process: ${error}`);
			});
		},
		onBuildDone(context) {
			// Called after build completes
		},
	},
};

export default defineConfig({
	entry: 'src/index.ts',
	//drop: ['window'],  // todo: it's not working with haxball's minified code, it can be great to offload regex replacements to bunup, need to investigate
	plugins: [myBunupPlugin],
});
