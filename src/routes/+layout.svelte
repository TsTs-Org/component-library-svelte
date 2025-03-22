<script>
	let { children } = $props();
    import '$lib/styles/theme.scss';
</script>

<div class="dark-mode">
    {@render children()}
</div>