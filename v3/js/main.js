import { createViewer } from './viewer.js';
import { hookUI } from './ui.js';
import { loadEvents, getEvents } from './storage.js';

// criacao do viewer
export const viewer = createViewer();

// carrega eventos do storage
loadEvents();

//renderiza a UI e conecta handlers
hookUI(viewer);

// export para depuracao no console
window._viewer = viewer;
window._events = getEvents();