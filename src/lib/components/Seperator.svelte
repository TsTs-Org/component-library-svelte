<script lang="ts">
	type Props = {
		horizontal?: boolean;
		thick?: boolean;
	};

	let { horizontal = false, thick = false }: Props = $props();
</script>

<span
	class="Seperator"
	class:horizontal
	class:thick
></span>

<style lang="scss">
	.Seperator {
		display: block;
		width: 1px;
		align-self: stretch;
		background-color: var(--border-color);
		&.thick {
			width: 2px;
		}
		&.horizontal {
			width: 100%;
			height: 1px;
			&.thick {
				height: 2px;
			}
		}
	}
</style>
