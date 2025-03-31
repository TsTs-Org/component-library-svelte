<script lang="ts">
	import Accordion from "$lib/components/Accordion/Accordion.svelte";
	import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Input from "$lib/components/Input.svelte";
	import Link from "$lib/components/Link.svelte";
	import NavigationBar from "$lib/components/NavigationBar.svelte";
	import Showcase from "$lib/components/Showcase.svelte";
	import Select from "$lib/components/Select/Select.svelte";
	import SelectItem from "$lib/components/Select/SelectItem.svelte";
	import ScrollContainer from "$lib/components/ScrollContainer.svelte";
	import Loader from "$lib/components/Loader.svelte";
</script>

<div class="components-page">
	<Showcase name="Loader">
		<Loader size="s" />
		<Loader />
		<Loader size="l" />
	</Showcase>

	<Showcase name="Accordion">
		<Accordion>
			<AccordionItem title="Item 1">
				<p>Content for item 1</p>
			</AccordionItem>

			<AccordionItem title="Item 2">
				<p>Content for item 2</p>
			</AccordionItem>

			<AccordionItem title="Item 3">
				<p>Content for item 3</p>
			</AccordionItem>
		</Accordion>
	</Showcase>

	<Showcase name="Scroll Container">
		<div style="height: 6rem">
			<ScrollContainer>
				{#each { length: 50 }, i}
					<p>Text {i}</p>
				{/each}
			</ScrollContainer>
		</div>
	</Showcase>
	<Showcase name="Card">
		<div style="width: 4rem; height: 4rem">
			<Card size="s">
				{#snippet title()}
					Title text
				{/snippet}
				{#snippet iconRight(size)}
					<Icon
						{size}
						iconName="x"
					></Icon>
				{/snippet}
			</Card>
		</div>
		<div style="width: 7rem; height: 6rem">
			<Card size="m">
				{#snippet title()}
					Title text
				{/snippet}
				{#snippet iconRight(size)}
					<Icon
						{size}
						iconName="x"
					></Icon>
				{/snippet}
			</Card>
		</div>
		<div style="width: 20rem; height: 10rem">
			<Card size="l">
				{#snippet iconLeft(size)}
					<Icon
						{size}
						iconName="sun"
					></Icon>
				{/snippet}
				{#snippet title()}
					Title text
				{/snippet}
				{#snippet iconRight(size)}
					<Icon
						{size}
						iconName="x"
					></Icon>
				{/snippet}
			</Card>
		</div>
	</Showcase>

	<Showcase name="Border Radius">
		<div class="mock-grid">
			<div
				class="mock-box fixed-size"
				style="border-radius: var(--border-radius-s);"
			>
				S
			</div>
			<div
				class="mock-box fixed-size"
				style="border-radius: var(--border-radius-m);"
			>
				M
			</div>
			<div
				class="mock-box fixed-size"
				style="border-radius: var(--border-radius-l);"
			>
				L
			</div>
			<div
				class="mock-box fixed-size"
				style="border-radius: var(--border-radius-xl);"
			>
				XL
			</div>
		</div>
	</Showcase>

	<Showcase name="Padding">
		<div class="mock-grid">
			<div
				class="mock-box"
				style="padding: var(--padding-s)"
			>
				S
			</div>
			<div
				class="mock-box"
				style="padding: var(--padding-m)"
			>
				M
			</div>
			<div
				class="mock-box"
				style="padding: var(--padding-l)"
			>
				L
			</div>
			<div
				class="mock-box"
				style="padding: var(--padding-xl)"
			>
				XL
			</div>
		</div>
	</Showcase>

	<Showcase name="Navigation Bar">
		<NavigationBar style="z-index: 1;">
			<div>
				<Link
					href="#"
					size="s">Home</Link
				>
				<Link
					href="#"
					size="s">Components</Link
				>
				<Link
					href="#"
					size="s">About</Link
				>
			</div>
		</NavigationBar>
	</Showcase>

	<Showcase name="Link sizes">
		<div class="mock-grid">
			<Link
				href="#"
				size="s"
				variant="colored">Link S</Link
			>
			<Link
				href="#"
				size="m"
				variant="colored">Link M</Link
			>
			<Link
				href="#"
				size="l"
				variant="colored">Link L</Link
			>
		</div>
	</Showcase>

	<Showcase name="Link variants">
		<div class="mock-grid">
			<Link
				href="#"
				variant="ghost">Ghost</Link
			>
			<Link
				href="#"
				variant="bordered">Bordered</Link
			>
			<Link
				href="#"
				variant="colored">Colored</Link
			>
		</div>
	</Showcase>

	<Showcase name="Input">
		<div class="mock-grid">
			<Input
				type="text"
				placeholder="Username"
				label="Username"
				description="The name to identify the user"
			/>
		</div>
	</Showcase>

	<Showcase name="Select">
		<div class="mock-grid">
			<Select
				placeholder="Select a fruit..."
				label="Fruits"
				description="Dropdown to select a fruit"
			>
				<SelectItem
					value="apple"
					label="Apple"
				/>
				<SelectItem
					value="banana"
					label="Banana"
				/>
				<SelectItem
					value="orange"
					label="Orange"
				/>
				<SelectItem
					value="grape"
					label="Grape"
				/>
			</Select>
		</div>
	</Showcase>

	<Showcase name="Icons">
		<div class="mock-grid">
			<Icon size="s">
				<path
					d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
				/>
			</Icon>
			<Icon size="m">
				<path
					d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
				/>
			</Icon>
			<Icon size="l">
				<path
					d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
				/>
			</Icon>
			<Icon
				size="s"
				iconName="x"
			></Icon>
		</div>
	</Showcase>

	<Showcase name="Buttons">
		<div class="mock-grid">
			<Button
				variant="primary"
				size="s">Primary</Button
			>
			<Button
				variant="bordered"
				size="m">Secondary</Button
			>
			<Button size="l">
				{#snippet icon()}
					<Icon size="l">
						<path
							d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
						/>
					</Icon>
				{/snippet}
				With Icon
			</Button>
		</div>
	</Showcase>
</div>

<style lang="scss">
	.components-page {
		height: 100vh;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
		grid-auto-rows: 20rem;
		gap: var(--padding-l);
		padding: var(--padding-l);
	}

	.mock-grid {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: var(--padding-m);
		place-items: center;
	}

	.mock-box {
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-m);
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		&.fixed-size {
			width: 5rem;
			height: 5rem;
		}
	}
</style>
