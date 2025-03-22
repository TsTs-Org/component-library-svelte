
let mode = $state('dark');
export let setMode = () => { mode === "light" ? mode = "dark" : mode = "light"; }
export let getMode = () => mode;