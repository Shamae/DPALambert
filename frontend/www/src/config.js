var apiMenuURL = "http://localhost:8000/api/menu";
var apiSaveItemURL = "http://localhost:8001/api/saveitem";
var apiIdentityURL; "http://localhost:5001/identity";
var apiItemURL = "http://localhost:8001/api/item";
var apiTileServiceOverlayURL = 'http://localhost:7999/api/tiledOverlay/troll/{z}/{x}/{y}'; 
var apiTileServiceURL = 'http://localhost:7999/api/tiles/{z}/{x}/{y}';


var config = {};

// Configures the type of overlay {tileOverlay||geoMarker}
config.featureIdLayerStyle = [];

config.featureIdLayerStyle[4] = "tiledOverlay";
config.featureIdLayerStyle[8] = "tiledOverlay";
config.featureIdLayerStyle[10] = "tiledOverlay";
config.featureIdLayerStyle[15] = "geoMarker";
config.featureIdLayerStyle[16] = "geoMarker";

// Configures the ordering of the type of tiled overlays

config.featureIdLayerOrdering = [];

config.featureIdLayerOrdering[4] = 5;
config.featureIdLayerOrdering[8] = 3;
config.featureIdLayerOrdering[10] = 6;



//TODO: convert this into a convenient JSON/Object so that we can use config.