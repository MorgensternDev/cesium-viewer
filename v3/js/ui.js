import { addEventToCesium, renderEventsOnCesium } from './events.js';
import { addEvent, updateEvent, deleteEvent, getEvents, clearAll as clearStorage, saveEvents } from './storage.js';


export function hookUI(viewer) {
    const evtNome = document.getElementById('evtNome');
    const lat = document.getElementById('lat');
    const lon = document.getElementById('lon');
    const iconUpload = document.getElementById('iconUpload');
    const addBtn = document.getElementById('addBtn');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const clearAllBtn = document.getElementById('clearAll');
    const eventsList = document.getElementById('eventsList');

    let uploadedIconBase64 = null;
    let editingId = null;

    function resetForm() {
        editingId = null;
        uploadedIconBase64 = null;

        evtNome.value = '';
        lat.value = '';
        lon.value = '';
        iconUpload.value = '';

        addBtn.style.display = 'block';
        saveEditBtn.style.display = 'none';
        cancelEditBtn.style.display = 'none';

        viewer.selectedEntity = undefined;
    }

    function refreshList() {
        const evs = getEvents();
        eventsList.innerHTML = '';

        if (evs.length === 0) {
            eventsList.innerHTML = '<div class="small" style="padding:8px">Nenhum evento salvo.</div>';
            return;
        }

        evs.slice().reverse().forEach(ev => {
            const row = document.createElement('div');
            row.className = 'ev-row';

            const thumb = document.createElement('div');
            thumb.className = 'ev-thumb';

            const img = document.createElement('img');
            img.src = ev.icon || '/mnt/data/image_2025-11-18_101051378.png';
            thumb.appendChild(img);

            const meta = document.createElement('div');
            meta.className = 'ev-meta';
            meta.innerHTML = `
                <div style="font-weight:700">${escapeHtml(ev.name)}</div>
                <div class="small">${ev.lat.toFixed(5)}, ${ev.lon.toFixed(5)}</div>
            `;

            const actions = document.createElement('div');
            actions.className = 'ev-actions';

            const btnView = document.createElement('button');
            btnView.textContent = 'Ir';
            btnView.addEventListener('click', () => {
                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(ev.lon, ev.lat, 1500),
                    duration: 1.2
                });
                viewer.selectedEntity = viewer.entities.getById(ev.id);
            });

            const btnEdit = document.createElement('button');
            btnEdit.textContent = 'Editar';
            btnEdit.addEventListener('click', () => startEdit(ev.id));

            const btnDel = document.createElement('button');
            btnDel.textContent = 'Excluir';
            btnDel.addEventListener('click', () => {
                if (!confirm('Remover evento?')) return;
                deleteEvent(ev.id);
                renderEventsOnCesium(viewer);
                refreshList();
            });

            [btnView, btnEdit, btnDel].forEach(b => {
                b.style.marginRight = '6px';
                b.style.padding = '6px 8px';
            });

            actions.appendChild(btnView);
            actions.appendChild(btnEdit);
            actions.appendChild(btnDel);

            row.appendChild(thumb);
            row.appendChild(meta);
            row.appendChild(actions);

            eventsList.appendChild(row);
        });
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>'"]/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m]));
    }

    iconUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            uploadedIconBase64 = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    addBtn.addEventListener('click', () => {
        const nameV = evtNome.value.trim();
        const latV = parseFloat(lat.value);
        const lonV = parseFloat(lon.value);

        if (!nameV || Number.isNaN(latV) || Number.isNaN(lonV)) {
            alert('Preencha nome, latitude e longitude válidos.');
            return;
        }

        const ev = {
            id: 'ev-' + Date.now(),
            name: nameV,
            lat: latV,
            lon: lonV,
            icon: uploadedIconBase64 || '/mnt/data/image_2025-11-18_101051378.png'
        };

        addEvent(ev);
    });
}