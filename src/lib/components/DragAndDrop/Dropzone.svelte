
<script module lang="ts">
    export let dragged_item_dropzone: number | undefined;
    export let dragged_item: HTMLElement;
</script>

<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = {
        callback?: (dataset: DOMStringMap) => null;
		children?: Snippet;
        group?: Number;
        identifier: String;
    } & HTMLAttributes<any>;

	let {
        callback = () => null,
		children,
        group,
        identifier,
		...restProps
	}: Props = $props();

    let self: HTMLDivElement;

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
  
        Array.from(self.children).forEach((el, i) => {
            el.dataset._index = i;
        });
    }

    function handleDragEnter(event: DragEvent) {
        event.preventDefault();
        const items = Array.from(self.children) as HTMLElement[];
        const target = event.target.closest(".DROPZONE-draggable");
        const targetIndex = items.indexOf(target);
        const draggedItemIndex = items.indexOf(dragged_item as HTMLElement);

        if(dragged_item_dropzone == undefined ||
            event.target.dataset.dropzone_group == undefined ||
            dragged_item_dropzone == event.target.dataset.dropzone_group 
        ){
            if (draggedItemIndex < targetIndex) {
                self.insertBefore(dragged_item, target.nextSibling);
            } else {
                self.insertBefore(dragged_item, target);
            }
            dragged_item.dataset._dropzone_identifier = event.target.dataset._dropzone_identifier;
        } else {
            // console.warn('Invalid dropzone:', dragged_item_dropzone, event.target.dataset.dropzone_group);
        }
        
    }
    
    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        event.dataTransfer!.dropEffect = 'move';
    }

    // Children elements
    function handleDragStart(e: DragEvent) {
        if(e.target.dataset.draggable == 'false'){
            e.preventDefault();
            return;
        }

        const parent = e.target.parentElement;
        dragged_item_dropzone = parent.dataset.dropzone_group;
        dragged_item = e.target as HTMLElement;

        setTimeout(() => {
            e.target.classList.add('DROPZONE-dragging');
        }, 0);
    }
    
    function handleDragEnd(e: DragEvent) {
        e.target.classList.remove('DROPZONE-dragging');
        callback(e.target.dataset);
    }


    onMount(() => {
        const new_self = self.getElementsByTagName('div')[0] as HTMLDivElement;
        if(new_self !== undefined) {
            self.parentNode.insertBefore(new_self, self.nextSibling);
            self.remove();
            self = new_self;
        }

        // self.classList.add('Dropzone');
        self.addEventListener('drop', handleDrop);
        self.addEventListener('dragover', handleDragOver);
        self.addEventListener('dragenter', handleDragEnter);
        self.dataset._dropzone_identifier = `${identifier}`;
        self.dataset.dropzone_group = `${group}`;

        const children = self.children;
        if(children) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                child.dataset._index = i; 

                if (child.dataset.draggable !== 'false') {
                    child.draggable = true;
                    child.addEventListener('dragstart', handleDragStart);
                    child.addEventListener('dragend', handleDragEnd);
                    child.classList.add('DROPZONE-draggable');
                    child.dataset._dropzone_identifier = self.dataset._dropzone_identifier;
                }
            }
        }
    });
    
    </script>
    
    <div bind:this={self} >
        {@render children?.()}
    </div>

<style>

:global(.DROPZONE-draggable) {
	cursor: move;
}

:global(.DROPZONE-draggable[data-draggable="false"]) {
	cursor: not-allowed;
}

:global(.DROPZONE-dragging) {
	opacity: 0.45;
	border: 1px var(--border-color);
	border-style: dashed !important
}
</style>