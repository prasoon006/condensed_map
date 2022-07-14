
 require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Widget",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/LayerList",
  "esri/widgets/Search"
], function (esriConfig, Map, MapView, FeatureLayer, Widget, Legend, Expand, LayerList, Search) {

  // Setting the API key
  esriConfig.apiKey = "AAPKcf41b082b23241d99f9cb537d085e9c9WeP_Rfc6w8cxZtSZep4W6eC_VNN708ZvXoh3LP6g9Mz08Y9zsrdu7Kiuc41R7SHJ";
  
  const montrealBuildingsFinalLink = "https://services5.arcgis.com/5R55vsKfq7f14num/arcgis/rest/services/MontrealWebTest/FeatureServer";

  const passport = {
    title: "Housing Passport: {CIVIQUE_DE}-{CIVIQUE_FI} {NOM_RUE}",
    // lastEditInfoEnabled: false,
    content:  fetchData,
    outFields: ["*"]
  };




  //fetching all the Data and printing in the console.
  function fetchData(target) {
    console.log(target.graphic.attributes);
  }

  const montrealBuildingsFinal = new FeatureLayer({
    title: "Montreal Buildings Final",
    url: montrealBuildingsFinalLink,
    copyright: "Trace Lab McGill",
    popupTemplate: passport
  });

  const map = new Map({
    basemap: "arcgis-light-gray", // Basemap layer
    layers: [montrealBuildingsFinal]
  });

  const view = new MapView({
    map: map,
    center: [-73.5673, 45.5017],
    zoom: 13, // scale: 72223.819286
    container: "viewDiv",
    constraints: {
      snapToZoom: true
    }
  });

  const legend = new Legend({
    view: view,
    container: "legendDiv"
  });

  const expand = new Expand({
    view: view,
    content: document.getElementById("infoDiv"),
    expanded: true
  });

  const searchWidget = new Search({
    view: view,
    container: "searchDiv"
  });
  // Adds the search widget below other elements in
  // the top left corner of the view
  view.ui.add(searchWidget, {
    position: "top-left",
    index: 1
  });

  let layerList = new LayerList({
    view: view,
    container: "layerDiv",
    index: 2
  });


  view.ui.add(layerList, {
    position: "top-left"
  });



  view.ui.add(expand, "top-right");


  
});
















