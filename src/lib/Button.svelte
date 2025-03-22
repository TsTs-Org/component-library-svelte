<svelte:options runes={true}/><!-- is this needed? -->

<script lang="ts">
    import { Button } from "bits-ui";
    import "../styles/button.scss";
</script>

<Button.Root>
  some content
</Button.Root>

<style lang="scss">
  :global([data-button-root]) {
    height: 3rem;
    width: 100%;
    background-color: var(--primary);
    color: var(--text-primary);
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
  }
  
  :global([data-button-root]:hover) {
    background-color: var(--primary-300);
  }
</style>