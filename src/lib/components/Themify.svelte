
<script lang="ts" module>
	import { mountTheme } from "$lib/utils/themify.svelte.js";

	if (typeof window !== "undefined") {
		console.log("Mounting themify");
		mountTheme();
	}
</script>

