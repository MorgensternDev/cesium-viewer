export function addEventToCesium(viewer, ev) {
    return viewer.entities.add({
        id: ev.id,
        position: Cesium.Cartesian3.fromDegrees(ev.lon, ev.lat),
        billboard: {
            image: ev.iconUrl,
            scale: 0.15,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
        label: {
            text: ev.name,
            font: "16px sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            pixelOffset: new Cesium.Cartesian2(0, -40)
        }
    });
}

import { getEvents } from './storage.js';


const DEFAULT_ICON = '/mnt/data/image_2025-11-18_101051378.png';


export function renderEventsOnCesium(viewer){
// remove e recria
viewer.entities.removeAll();
const evs = getEvents();
evs.forEach(e => addEventToCesium(viewer, e));
}
