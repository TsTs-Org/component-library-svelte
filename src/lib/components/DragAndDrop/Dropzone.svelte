<!-- 
Probleme der Dropzone:  
1. Styling
	- Da children der dropzone den drag and drop listener bekommen 
        und reingedraggte elemente direkt der dropzone appended 
        werden, können wir keinen container mit eigenem style in
        die dropzone reingeben in der die objekte sind die man 
        draggable haben möchte. 
2. Sorting
	- Ein reingedraggtes element wird am ende der dropzone appended,
        dadurch ist es nicht möglich die Elemente innerhalb der dropzone
        durch drag and drop zu sortieren
3. Javascript callback
	- Keine Möglichkeit im javascript festzustellen das ein element x
        in dropzone y gezogen wurde.
        (Keine Persistenz des moves möglich)
	- Möglichkeit ein callback auf der dropzone zu definieren
        und an jedes child weiterzugeben. Bei ausführung können nur
        die html-elemente mitgegeben werden, das heißt,
        dass javascript daten aus dem html herausgezogen werden müssen
        was kacke ist. Weiter ist der callback von jedem child derselbe
        dabei 
-->

<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = {
		children?: Snippet;
        group?: Number;
    } & HTMLAttributes<any>;

	let {
		children,
        group,
		...restProps
	}: Props = $props();

    let self: HTMLDivElement;

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        const data = event.dataTransfer?.getData('text/plain');
        if (data && event.target instanceof HTMLElement) {
            const draggedElem = document.querySelector(`[data-dragging='true']`);
            if (draggedElem) {
                if(data == "undefined" || data == event.target.dataset.dropzone_group){
                    self.appendChild(draggedElem);
                } else {
                    console.warn('Invalid dropzone:', data, event.target.dataset.dropzone_group);
                }
            } else {
                console.warn('Element with data-dragging not found:');
            }
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
        const dropzone_group = e.target.parentElement.dataset.dropzone_group;
        e.dataTransfer?.setData('text/plain', dropzone_group);
        e.target.dataset.dragging = 'true';
    }
    
    function handleDragEnd(e: DragEvent) {
        e.target.dataset.dragging = 'false';
    }

    onMount(() => {
        const children = self.children;
        if(children) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                if (child.dataset.draggable !== 'false') {
                    child.draggable = true;
                    child.addEventListener('dragstart', handleDragStart);
                    child.addEventListener('dragend', handleDragEnd);
                    child.classList.add('draggable');
                }
            }
        }

    })
    
    </script>
    
    <div
        {...restProps}
        bind:this={self} 
        class="dropzone" 
        on:drop={handleDrop} 
        on:dragover={handleDragOver}
        data-dropzone_group={`${group}`}
        >
        {@render children?.()}
    </div>
    
<style lang="scss">
    .dropzone {
      width: 70%;
      margin: 2rem;
      height: 200px;
      border: 2px dashed #ccc;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 1.2em;
    }
</style>