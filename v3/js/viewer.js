import { renderEventsOnCesium } from './events.js';

let viewer;

export function createViewer() {

    viewer = new Cesium.Viewer('cesiumContainer', {
        timeline: false,
        animation: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        infoBox: false,
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        })
    });

    // reduzir esforco de GPU e CPU
    viewer.scene.globe.enableLightining = false;
    viewer.scene.fog.enabled = false;
    viewer.scene.skyBox = undefined;
    viewer.scene.skyAtmosphere = undefined;
    viewer.scene.globe.showGroundAtmosphere = false;

    // remove layer padrao.
    viewer.imageryLayers.removeAll();

    // add OSM
    viewer.imageryLayers.addImageryProvider(
        new Cesium.OpenStreetMapImageryProvider()
    );

    // position inicial.
    viewer.camera.setVie
}