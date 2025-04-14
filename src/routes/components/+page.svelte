<script lang="ts">
	import Accordion from "$lib/components/Accordion/Accordion.svelte";
	import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Input from "$lib/components/Input.svelte";
	import Showcase from "$lib/components/Showcase.svelte";
	import Select from "$lib/components/Select/Select.svelte";
	import SelectItem from "$lib/components/Select/SelectItem.svelte";
	import ScrollContainer from "$lib/components/ScrollContainer.svelte";
	import Loader from "$lib/components/Loader.svelte";
	import Table from "$lib/components/Table/Table.svelte";
	import TableHeader from "$lib/components/Table/TableHeader.svelte";
	import TableRow from "$lib/components/Table/TableRow.svelte";
	import TableHead from "$lib/components/Table/TableHead.svelte";
	import TableBody from "$lib/components/Table/TableBody.svelte";
	import TableCell from "$lib/components/Table/TableCell.svelte";
	import TableFooter from "$lib/components/Table/TableFooter.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";
	import Multiselect from "$lib/components/Multiselect/Multiselect.svelte";
	import MultiselectItem from "$lib/components/Multiselect/MultiselectItem.svelte";
	import Contextmenu from "$lib/components/Contextcontainer/Contextmenu.svelte";
	import Contextcontainer from "$lib/components/Contextcontainer/Contextcontainer.svelte";
	import ContextmenuItem from "$lib/components/Contextcontainer/ContextmenuItem.svelte";
	import ThemeSettings from "$lib/blocks/ThemeSettings.svelte";
</script>

<div class="theme-settings">
	<ThemeSettings />
</div>

<div class="components-page">
	<Showcase name="Headings">
		<div class="mock-grid">
			<h1>Heading</h1>
			<h2>Heading</h2>
			<h3>Heading</h3>
			<h4>Heading</h4>
			<h5>Heading</h5>
			<p>Paragraph</p>
		</div>
	</Showcase>

	<Showcase name="Contextmenu">
		<div style="height: 10rem; width: 100%">
			<Contextcontainer>
				<Contextmenu>
					<ContextmenuItem>Test</ContextmenuItem>
					<ContextmenuItem>
						{#snippet icon()}
							<Icon
								size="s"
								iconName="eyeOpen"
							/>
						{/snippet}
						Test
					</ContextmenuItem>
					<ContextmenuItem>
						{#snippet icon()}
							<Icon
								size="s"
								iconName="eyeClosed"
							/>
						{/snippet}
						Test
					</ContextmenuItem>
				</Contextmenu>
				<div
					style="
				display: flex;
				align-items: center; 
				justify-content: center;
				border: thin solid var(--border-color);
				width: 100%;
				height: 100%; 
				border-radius: var(--border-radius-m); 
				"
				>
					<h4>Right Click Me</h4>
				</div>
			</Contextcontainer>
		</div>
	</Showcase>

	<Showcase name="Multiselect">
		<div class="mock-grid">
			<Multiselect
				placeholder="Multiselect a fruit..."
				label="Fruits"
				description="Dropdown to Multiselect a fruit"
			>
				<MultiselectItem
					value="apple"
					label="Apple"
				/>
				<MultiselectItem
					value="banana"
					label="Banana"
				/>
				<MultiselectItem
					value="orange"
					label="Orange"
				/>
				<MultiselectItem
					value="grape"
					label="Grape"
				/>
			</Multiselect>
		</div>
	</Showcase>

	<Showcase name="Checkbox">
		<div class="mock-grid">
			<Checkbox />
			<Checkbox label="Title only" />
			<Checkbox
				label="Title"
				description="Description"
			/>
		</div>
		<!-- <Checkbox /> -->
	</Showcase>

	<Showcase name="Table">
		<div class="mock-grid">
			<Table
				initial={[0, 1]}
				searchbar
				bordered
			>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Lastname</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow
						rowActions={[
							{
								title: "ActionOne",
								iconName: "eyeOpen",
								callback: (val) => {
									console.log(val);
								},
							},
						]}
					>
						<TableCell _for="name">Kevien</TableCell>
						<TableCell _for="lastname">Flieger</TableCell>
					</TableRow>
					<TableRow
						rowActions={[
							{
								title: "ActionOne",
								callback: (val) => {
									console.log(val);
								},
							},
						]}
					>
						<TableCell _for="name">Michael</TableCell>
						<TableCell _for="lastname">Kiehn</TableCell>
					</TableRow>
					<TableRow>
						<TableCell _for="name">Moritz</TableCell>
						<TableCell _for="lastname">Maier</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell _for="_none">Data</TableCell>
						<TableCell _for="_none"></TableCell>
						<TableCell _for="_none">100</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	</Showcase>

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
		<div class="mock-grid">
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
		</div>
	</Showcase>

	<Showcase name="Input">
		<div class="mock-grid">
			<Input
				type="text"
				label="With Icon"
				placeholder="username"
				description="The name to identify the user"
			>
				{#snippet icon()}
					<Icon
						iconName="sun"
						fill="inherit"
					/>
				{/snippet}
			</Input>

			<Input
				type="password"
				label="No Icon"
				placeholder="username"
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
					<Icon
						size="l"
						fill="var(--text-color-inverted)"
					>
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
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(auto-fit, min(90vw, 30rem));
		justify-content: center;
		gap: var(--padding-l);
		padding: var(--padding-l);
	}

	.mock-grid {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		width: 100%;
		gap: var(--padding-m);
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

	.theme-settings {
		margin: var(--padding-l);
		background-color: var(--foreground-color);
		border-radius: var(--border-radius-m);
		border: thin solid var(--border-color);
	}
</style>
