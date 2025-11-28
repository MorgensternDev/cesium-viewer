const STORAGE_KEY = 'eventsCesium_v3';
let _events = [];

export function loadEvents(){
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return _events = [];
    try { _events = JSON.parse(raw); } catch(e) { _events = []; }
}

export function saveEvents(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_events));
}

export function getEvents(){return _events;}

export function addEvent(ev){ _events.push(ev); saveEvents(); }
export function updateEvent(id, patch){
const idx = _events.findIndex(e=>e.id===id); if (idx<0) return false; _events[idx] = {..._events[idx], ...patch}; saveEvents(); return true; }
export function deleteEvent(id){ _events = _events.filter(e=>e.id!==id); saveEvents(); }
export function clearAll(){ _events = []; saveEvents(); }