
let mode = $state('light');
export let setMode = () => { mode === "light" ? mode = "dark" : mode = "light"; }
export let getMode = () => mode;