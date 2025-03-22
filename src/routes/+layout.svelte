<script>
	let { children } = $props();
    import '$lib/styles/theme.scss';
</script>

<div class="page dark-mode">
    
    <div class="content">
        {@render children()}
    </div>
</div>
