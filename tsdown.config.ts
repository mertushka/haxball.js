import { defineConfig, type UserConfig } from 'tsdown'

const config: UserConfig = defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	cjsDefault: false,
	checks: {
		legacyCjs: false,
	},
})

export default config
