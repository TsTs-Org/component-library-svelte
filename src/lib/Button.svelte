<svelte:options runes={true}/><!-- is this needed? -->

<script lang="ts">
    import { Button } from "bits-ui";
    import "../styles/button.scss"
</script>

<Button.Root
  class="red"
>
  some content
</Button.Root>