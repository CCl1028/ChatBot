/// <reference types="vite/client" />

declare module "*.vue" {
	import { defineComponent } from "vue";
	const Component: ReturnType<typeof defineComponent>;
	export default Component;
}

declare module "vuex" {
	export * from "vuex/types/index.d.ts";
	export * from "vuex/types/helpers.d.ts";
	export * from "vuex/types/logger.d.ts";
	export * from "vuex/types/vue.d.ts";
}