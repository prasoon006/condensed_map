// Title: DHB Web Map Application - Montreal.
// Authors: Abdulkarim Hammami, Prasoon Jain
// Sources: INSERT SOURCES LINK HERE.
// Tools: ArcGIS Pro, ArcGIS API For JavaScript.

// built following guide below:
// https://www.youtube.com/watch?v=z9kIZjUjsZ4&t=2770s&ab_channel=EsriEvents
// arcGIS API for JS Reference: https://developers.arcgis.com/javascript/latest/api-reference/
 

//----------------------- SETUP OF API -----------------------

// Loading necessary modules, every module loaded has to be included in the function line below.
 require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Widget",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/renderers/Renderer",
  "esri/webdoc/geotriggersInfo/FeatureFilter",
  "esri/widgets/Slider",
  "esri/views/layers/LayerView",
  "esri/form/elements/inputs/TextBoxInput"
], function (esriConfig, Map, MapView, FeatureLayer, Widget, Legend, Expand, LayerList, Search, Renderer, FeatureFilter, Slider, LayerView, TextBoxInput) {

  // Setting the API key.
  esriConfig.apiKey = "AAPKcf41b082b23241d99f9cb537d085e9c9WeP_Rfc6w8cxZtSZep4W6eC_VNN708ZvXoh3LP6g9Mz08Y9zsrdu7Kiuc41R7SHJ";
  
  // Source map for dataset.
  const montrealBuildingsFinalLink = "https://services5.arcgis.com/5R55vsKfq7f14num/arcgis/rest/services/MontrealWebTest/FeatureServer";


  //----------------------- PASSPORTS -----------------------

  // Definition of passport object (widget), to return data for our passport widget.
  const passport = {
    title: "{CIVIQUE_DE} -{CIVIQUE_FI} {NOM_RUE}",
    // lastEditInfoEnabled: false,
    content:  fetchData,
    outFields: ["*"]
  };
  
  //fetching all the Data and printing in the console.
  function fetchData(target) {
    console.log(target.graphic.attributes);
  }


  //----------------------- SYMBOLOGY-----------------------
  
  //Renderer Reference: https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html
  
  // Default Symbology.
  let rendererDefault = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: "#377B64",
      outline: {color: "gray", width: 0.25}
    },
    defaultSymbol: { type: "simple-fill", outline: {color: "gray", width: 0.25} },    
  };
  
  // Symbology for Statistics Canada Unique Building Typology. Uses "unique-value" render type, for string symbologies.
  let rendererStatscan = { 
    type: "unique-value",
    field: "statscan_1",
    defaultSymbol: { type: "simple-fill", outline: {color: "gray", width: 0.25} },  
    uniqueValueInfos: [{
      value: "Single Detached House",
      symbol: {
        type: "simple-fill",  
        color: "red",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Semi-Detached House",
      symbol: {
        type: "simple-fill",  
        color: "yellow",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Row House",
      symbol: {
        type: "simple-fill",  
        color: "orange",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Apartment or Flat in a Duplex",
      symbol: {
        type: "simple-fill",  
        color: "green",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Apartment < 5 Storeys",
      symbol: {
        type: "simple-fill",  
        color: "blue",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Apartment >= 5 Storeys",
      symbol: {
        type: "simple-fill",  
        color: "violet",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Other Movable Dwelling",
      symbol: {
        type: "simple-fill",  
        color: "brown",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Mixed Use (non_statscan)",
      symbol: {
        type: "simple-fill",  
        color: "pink",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Non-Residential",
      symbol: {
        type: "simple-fill",  
        color: "gray",
        outline: {color: "gray", width: 0.25}
      }
    }, {
      value: "Undefined",
      symbol: {
        type: "simple-fill",  
        color: "black",
        outline: {color: "gray", width: 0.25}
      }
    }]
  };

  // Symbology for Building Vintages. Uses "class-breaks" render type, for number symbologies.
  let rendererVintage = { 
    type: "class-breaks", 
    field: "ANNEE_CONS",
    defaultSymbol: {type: "simple-fill", color: "hsla(0, 0%, 50%, 1)", outline: {color: "gray", width: 0.25}},
    defaultLabel: "Unknown",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 1920,
        symbol: {
          type: "simple-fill",  
          color: "hsla(0, 100%, 50%, 1)",
          outline: {color: "gray", width: 0.25}
        },
        label: "pre 1920"
      }, {
        minValue: 1920,
        maxValue: 1950,
        symbol: {
          type: "simple-fill",  
          color: "hsla(15, 100%, 50%, 1)",
          outline: {color: "gray", width: 0.25}
        },
        label: "1920-1949"
      }, {
        minValue: 1950,
        maxValue: 1980,
        symbol: {
          type: "simple-fill",  
          color: "hsla(30, 100%, 50%, 1)",
          outline: {color: "gray", width: 0.25}
        },
        label: "1950-1979"
      }, {
        minValue: 1980,
        maxValue: 9999,
        symbol: {
          type: "simple-fill",  
          color: "hsla(45, 100%, 50%, 1)",
          outline: {color: "gray", width: 0.25}
        },
        label: "1980-Present"
      }, {
        minValue: 9999,
        maxValue: 10000,
        symbol: {
          type: "simple-fill",  
          color: "hsla(60, 100%, 50%, 1)",
          outline: {color: "gray", width: 0.25}
        },
        label: "null"
      }
    ]
  };


  //----------------------- MAPS -----------------------

  // Layers

  // The Dataset of all the buildings in Montreal, containing all necessary information for visualization
  const montrealBuildingsFinal = new FeatureLayer({ 
    title: "Montreal Buildings",
    url: montrealBuildingsFinalLink,
    popupTemplate: passport,
    renderer: rendererDefault,
    definitionExpression: "1=1",
    visible: true
  });

  // Views

  // The basic map object that the above maps attach to.
  const map = new Map({ 
    basemap: "arcgis-light-gray", // Basemap layer
    layers: [montrealBuildingsFinal]//, montrealBuildingsStatscan, montrealBuildingsVintage
  });

  // The map window within the web page that displayes the basemap and the building layer.
  const view = new MapView({
    map: map,
    center: [-73.5673, 45.5017],
    zoom: 13, // scale: 72223.819286
    container: "viewDiv",
    constraints: {
      snapToZoom: true
    }
  });

  // Changing Symbology of Layer: allows the user to select from the renderers defined earlier from drop down defined in the HTML.
  const symbologySelector = document.getElementById("symbologySelector");
  symbologySelector.addEventListener('input', (event) => {
    symbologySelection = document.getElementById("symbologySelector").value;
    if (symbologySelection === "rendererDefault") {
      montrealBuildingsFinal.renderer = rendererDefault;
    } else if (symbologySelection === "rendererStatscan") {
      montrealBuildingsFinal.renderer = rendererStatscan;
    } else if (symbologySelection === "rendererVintage") {
      montrealBuildingsFinal.renderer = rendererVintage;
    }
  });


  //----------------------- WIDGETS -----------------------

  // Window that allows the user to select what layers to view.
  let layerList = new LayerList({ 
    view: view,
    container: "layerDiv",
    index: 1
  });

  // Adds the layer widget below other elements in the top left corner of the view.
  view.ui.add(layerList, { 
    position: "infoDivRight"
  });
  
  // Legend shows the symbology of displayed layers
  let legend = new Legend({ 
    view: view,
    container: "legendDiv",
    index: 2
  });

  // Allows for the expansion or minimization of Legend.
  const expandLeft = new Expand({ 
    view: view,
    content: document.getElementById("infoDivLeft"),
    expanded: true
  });

  // Adds expand to top left of view.
  view.ui.add(expandLeft, "top-left"); 

  const expandRight = new Expand({ 
    view: view,
    content: document.getElementById("infoDivRight"),
    expanded: true
  });

  // Adds expand to top left of view.
  view.ui.add(expandRight, "top-right"); 

  // Address or other location search functionality based on ArcGIS database. Does not select a building at the location, instead it just zooms in and pins the address/location.
  let searchWidget = new Search({ 
    view: view,
    container: "searchDiv",
    index: 1
  });
  
  // Adds the search widget below other elements in the top left corner of the view.
  view.ui.add(searchWidget, { 
    position: "infoDivLeft"
  });




  //----------------------- FILTERS -----------------------
  
  // Defines the slider object to control the vintages displayed. Vintages are based off of the building archetypes designed by DHB.
  const sliderVintage = new Slider({ 
    container: "sliderDivVintage",
    min: 1600,
    max: 2023,
    steps: [ 1600, 1800, 1920, 1950, 1980, 2023 ],
    values: [ 1600, 2023 ],
    snapOnClickEnabled: true,
    visible: true,
    visibleElements: {
      labels: true,
    },
    tickConfigs: [{
      mode: "position",
      values: [ 1600, 1800, 1920, 1950, 1980, "Present" ],
      labelsVisible: true,
    }]
  });

  // Adds the slider widget below other elements in the top left corner of the view.
  view.ui.add(sliderVintage, { 
    position: "infoDivLeft",
    index: 4
  });

  // Creates The "Apply" button, allowing the user to apply the filters onto the layer by firing the filter function below.
  let filterButton = document.getElementById("applyFilterButtonID");
  filterButton.addEventListener('click', event => {
    filterFunction();
  });

  // Takes the filter inputs and commits it to the layer.
  const filterFunction = () => {
    view.whenLayerView(montrealBuildingsFinal).then((layerView) => {

      // Extract filter values from HTML and Widgets.
      const filterSelectType = document.getElementById("filterType").value;
      const filterMinBuildValue = document.getElementById("minBuildValueID").value;
      const filterMaxBuildValue = document.getElementById("maxBuildValueID").value;
      const filterMinHeight = document.getElementById("minBuildHeightID").value;
      const filterMaxHeight = document.getElementById("maxBuildHeightID").value;
      const filterMinFootprint = document.getElementById("minBuildFootprintID").value;
      const filterMaxFootprint = document.getElementById("maxBuildFootprintID").value;
      const filterMinBuildVintage = sliderVintage.values[0];
      const filterMaxBuildVintage = sliderVintage.values[1];
      const filterNullBuildVintage = document.getElementById("includeNullVintageID").checked;

      // Generate SQL Query
      let filterExpression = ""
      if (filterNullBuildVintage === true) { // Generates SQL Query if we choose to include null aged buildings.
        if (filterSelectType === "1=1") { // Selects all building types.
          filterExpression = `statscan_t >= 0 AND VAL_IMPOSA >= ${filterMinBuildValue} AND VAL_IMPOSA < ${filterMaxBuildValue} AND heightavg >= ${filterMinHeight} AND heightavg < ${filterMaxHeight} AND Shape_Area >= ${filterMinFootprint} AND Shape_Area < ${filterMaxFootprint} AND ((ANNEE_CONS >= ${filterMinBuildVintage} AND ANNEE_CONS < ${filterMaxBuildVintage}) OR ANNEE_CONS = 9999)`;
        } else { // Selects specified building types.
          filterExpression = `statscan_t = ${filterSelectType} AND VAL_IMPOSA >= ${filterMinBuildValue} AND VAL_IMPOSA < ${filterMaxBuildValue} AND heightavg >= ${filterMinHeight} AND heightavg < ${filterMaxHeight} AND Shape_Area >= ${filterMinFootprint} AND Shape_Area < ${filterMaxFootprint} AND ((ANNEE_CONS >= ${filterMinBuildVintage} AND ANNEE_CONS < ${filterMaxBuildVintage}) OR ANNEE_CONS = 9999)`;
        }
      } else { // Generates SQL Query if we exclude null aged buildings.
        if (filterSelectType === "1=1") { // Selects all building types.
          filterExpression = `statscan_t >= 0 AND VAL_IMPOSA >= ${filterMinBuildValue} AND VAL_IMPOSA < ${filterMaxBuildValue} AND heightavg >= ${filterMinHeight} AND heightavg < ${filterMaxHeight} AND Shape_Area >= ${filterMinFootprint} AND Shape_Area < ${filterMaxFootprint} AND ANNEE_CONS >= ${filterMinBuildVintage} AND ANNEE_CONS < ${filterMaxBuildVintage}`;
        } else { // Selects specified building types.
          filterExpression = `statscan_t = ${filterSelectType} AND VAL_IMPOSA >= ${filterMinBuildValue} AND VAL_IMPOSA < ${filterMaxBuildValue} AND heightavg >= ${filterMinHeight} AND heightavg < ${filterMaxHeight} AND Shape_Area >= ${filterMinFootprint} AND Shape_Area < ${filterMaxFootprint} AND ANNEE_CONS >= ${filterMinBuildVintage} AND ANNEE_CONS < ${filterMaxBuildVintage}`;
        }
      }

      // Applies Filter Query to the layer view.
      layerView.filter = {
        where: filterExpression
      };   
    }) 
  };
});