<script lang="ts">
	import Textarea from "$lib/components/Textarea.svelte";
	import { Button, Dropzone, Icon, Input, Popover } from "$lib/index.js";
	import { onMount } from "svelte";

	const listOfElemetns = $state(["test1", "test2", "test3"]);
</script>

<!-- 
<i class="icon">home</i>
<i class="icon">favorite</i>  
<i class="icon">search</i>

<i class="icon-filled">home</i>
<i class="icon-filled">favorite</i>  
<i class="icon-filled">search</i> -->

<div
	style="display: flex; align-items: center; justify-content: center; width: 100vw; height: 100vh;"
>
	<Popover>
		{#snippet popoverTrigger(openPopover)}
			<div style="width: 10rem; height: 10rem; left: 600px; position: relative;">
				<Button onclick={openPopover}>open popover</Button>
			</div>
		{/snippet}
		{#snippet title()}
			test
		{/snippet}
		conent
	</Popover>
</div>

<Icon iconName="swap_horiz"></Icon>

<Dropzone
	identifier="Zone1"
	group={2}
	callback={(e) => {
		console.log(e);
	}}
>
	<div class="custom-style">
		<div class="mock-elem">
			<h2>Test1</h2>
		</div>
		<div class="mock-elem">
			<h2>Test2</h2>
		</div>
	</div>
</Dropzone>
<Dropzone
	identifier="Zone2"
	group={2}
	callback={(e) => {
		console.log(e);
	}}
>
	<div class="custom-style"></div>
</Dropzone>
<Dropzone
	identifier="Zone3"
	group={3}
	callback={(e) => {
		console.log(e);
	}}
>
	<div class="custom-style">
		{#each listOfElemetns as el}
			<div class="mock-elem">
				<h2>{el}</h2>
			</div>
		{/each}
	</div>
</Dropzone>

<Button onclick={() => listOfElemetns.push("addedtest")}>Add thingy</Button>

<style>
	.custom-style {
		min-height: 60px;
		background-color: var(--foreground-color);
		margin: 10px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
	}
	.mock-elem {
		padding: 5px;
		background-color: blueviolet;
	}
</style>
