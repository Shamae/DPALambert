
function initialize(){

    adminMode = false;

    // set customized icons
     playerIcon = L.icon({
        iconUrl: 'img/playerIcon.png',
        //shadowUrl: 'leaf-shadow.png',
    
        iconSize:     [32, 32], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

     nonPlayerIcon = L.icon({
        iconUrl: 'img/nonPlayerIcon.png',
        //shadowUrl: 'leaf-shadow.png',
    
        iconSize:     [32, 32], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    // set editing UI

    loggedOptions = {
        position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
        drawMarker: true,  // adds button to draw markers
        drawPolyline: true,  // adds button to draw a polyline
        drawRectangle: true,  // adds button to draw a rectangle
        drawPolygon: true,  // adds button to draw a polygon
        drawCircle: true,  // adds button to draw a cricle
        cutPolygon: true,  // adds button to cut a hole in a polygon
        editMode: true,  // adds button to toggle edit mode for all layers
        removalMode: true   // adds a button to remove layers
    };

    unloggedOptions = {
        position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
        drawMarker: false,  // adds button to draw markers
        drawPolyline: false,  // adds button to draw a polyline
        drawRectangle: false,  // adds button to draw a rectangle
        drawPolygon: false,  // adds button to draw a polygon
        drawCircle: false,  // adds button to draw a cricle
        cutPolygon: false,  // adds button to cut a hole in a polygon
        editMode: false,  // adds button to toggle edit mode for all layers
        removalMode: false   // adds a button to remove layers
    };

};
function fetchAPIdata(url) {

    url = "http://localhost:8000/api/menu";

    fetch(url, {
        method: 'get'
    }).then(function (response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        console.log("coucou");
        return response.json();

    }).then(function (data) {
        console.log("data is: " + JSON.stringify(data));

        var myElement = document.getElementById("log");
        myElement.innerText = "Data" + JSON.stringify(data);


    }).catch(function (err) {
        console.log("bouuuuuh!");
        // Error :(
    });

};

/*
function getFeatureTypeIcon(){

    switch(feature.properties.featureTypeId) {
        case 15:
        
        return nonPlayerIcon;
            break;
        case 16:
        return playerIcon);
            break;

        
      
    };

};*/

function onEachFeature(feature, layer) {

    

    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(feature.properties.description);
    }

    layer.bindTooltip(feature.properties.displayName);

   

    switch(feature.properties.featureTypeId) {
        case 15:
        
        layer.setIcon (nonPlayerIcon);
            break;
        case 16:
        layer.setIcon (playerIcon);
            break;

        
      
    };
    
};

function getAllFeatures(map) {

    url = "http://localhost:8001/api/item";

    fetch(url, {
        method: 'get'
    }).then(function (response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        console.log("**** Fetching Items");
        return response.json();

    }).then(function (data) {
        console.log("**** Items are: " + JSON.stringify(data));
        console.log("**** Putting items on the map");
        L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(map);
        console.log("**** Putting items on the map - done!")

    }).catch(function (err) {
        console.log("*** Failed to fetch Items! ***");
    });

};

function createFeatureLayerByType(map, controlparam, typeId) {

    url = "http://localhost:8001/api/item?properties.featureTypeId=" + typeId;

    var control = controlparam.base;
    var name = controlparam.name;
    var group = controlparam.group;

    fetch(url, {
        method: 'get'
    }).then(function (response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        console.log("**** Fetching Items by typeId (" + typeId + ")");
        return response.json();

    }).then(function (data) {
        console.log("**** Items are: " + JSON.stringify(data));
        console.log("**** Putting items of typeId (" + typeId + ") on the map");

        var geoMarkers = L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(map);

        control.addOverlay(geoMarkers, name, group);

        console.log("**** Putting items of typeId (" + typeId + ") the map - done!")

    }).catch(function (err) {
        console.log("*** Failed to fetch Items! ***");
    });

};


function getFeatureByTYpe(map, typeId) {

    url = "http://localhost:8001/api/item?properties.featureTypeId=" + typeId;

    fetch(url, {
        method: 'get'
    }).then(function (response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        console.log("**** Fetching Items by typeId (" + typeId + ")");
        return response.json();

    }).then(function (data) {
        console.log("**** Items are: " + JSON.stringify(data));
        console.log("**** Putting items of typeId (" + typeId + ") on the map");
        L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(map);
        console.log("**** Putting items of typeId (" + typeId + ") the map - done!")

    }).catch(function (err) {
        console.log("*** Failed to fetch Items! ***");
    });

};

function createMenu(map) {

    initialize();

    if (adminMode){

        // add leaflet.pm controls to the map
        map.pm.addControls(options);
    };

    url = "http://localhost:8000/api/menu";

    fetch(url, {
        method: 'get'
    }).then(function (response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        console.log("coucou");
        return response.json();

    }).then(function (data) {

        // getAllFeatures(map);
        // getFeatureByTYpe(map, 15);




        var baseMaps = [
        ];

        var overlays = [
        ];
        /*
                // configure StyledLayerControl options for the layer soybeans_sp
                soybeans_sp.StyledLayerControl = {
                    removable: true,
                    visible: false
                }
        
                // configure the visible attribute with true to corn_bh
                corn_bh.StyledLayerControl = {
                    removable: false,
                    visible: true
                }*/

        var options = {
            container_width: "300px",
            group_maxHeight: "80px",
            //container_maxHeight : "350px", 
            exclusive: false,
            collapsed: false,
            position: 'topright'
        };

        var control = L.Control.styledLayerControl(baseMaps, overlays, options);
        map.addControl(control);


        console.log("tududu: " + data[0].displayName);
        name = JSON.stringify(data);





        var obj = {};
        var controlparam = {};

        // Loop through categories...
        for (var j = 0; j < data.length; j++) {

            categoryName = data[j].displayName;
            console.log("== We fetched the category name: " + categoryName + " ==");

            obj.groupName = categoryName;
            obj.expanded = "true";


            var subMenu = data[j].submenu;
            var subObj = {};

            for (var i = 0; i < subMenu.length; i++) {

                var name = subMenu[i].displayName;
                var typeId = subMenu[i]._id;
                console.log("== We fetched the subcategory name: " + name + " ==");

        

                // ...we should have retrieved the markers of subcategory from itemService.
                console.log("== We fetched the subcategory nameid: " + typeId + " ==");

                controlparam.menu = data
                controlparam.base = control;
                controlparam.name = name;
                controlparam.group = obj;

                createFeatureLayerByType(map, controlparam, typeId)




                //subObj.name = "markers";
                //control.addOverlay(markers, name, obj);


            };
            obj = {};

        };



    

   


    }).catch(function (err) {
        console.log("**** Failed to create content!");
        // Error :(
    });

};


function refreshUI(map) {

    if (adminMode){
        
                // add leaflet.pm controls to the map
                map.pm.addControls(loggedOptions);
            } else {

                map.pm.addControls(unloggedOptions)
            };

};

function addItem(map){
 
   var geojsonFeature = {};

    geojsonFeature["type"]="Feature";

    geojsonFeature["properties"]={};

    var e = document.getElementById("itType");
    var type = e.options[e.selectedIndex].value;

    console.log("type ="+ type);

        geojsonFeature["properties"]["featureTypeId"] = parseInt(type);

        geojsonFeature["properties"]["displayName"] = "Tintin";

        geojsonFeature["properties"]["description"] = "It's not the right place for him";
    
   
    geojsonFeature["geometry"] = {};
        geojsonFeature["type"]="Point";
        geojsonFeature["coordinates"] = [lng,lat];

    /*
    geojsonFeature["geometry"]["coordinates"][0] = 0;
    geojsonFeature["geometry"]["coordinates"][1] = 1;
*/

var myLayer = L.geoJSON(geojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
}).addTo(map);

myLayer.setIcon (nonPlayerIcon);//sadly don't work
/*
    var myLayer = L.geoJSON().addTo(map);
    myLayer.addData(geojsonFeature);

   

    function(geoJsonPoint, latlng) {
        return L.marker(latlng);
    }*/
  // onEachFeature(geojsonFeature, myLayer); // not working sadly
    console.log('WE ADDED A MARKER' + document.getElementById('itDescr').value + "at ["+lat+","+lng);
    
    //closes the modal
    document.getElementById('itemForm').style.display='none';

}