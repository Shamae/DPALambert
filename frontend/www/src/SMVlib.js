// A series of utility functions 
function initialize() {

    adminMode = false;
    activePopup = false;

    map.on('click', function (e) {
        activePopup = false;
    });
   
    

    // set customized icons
    
        
        unknownIcon = L.icon({
            iconUrl: 'img/unknown.png',
            //shadowUrl: 'leaf-shadow.png',
    
            iconSize: [24, 24], // size of the icon
            //shadowSize:   [50, 64], // size of the shadow
            iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
            //shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
    
    playerIcon = L.icon({
        iconUrl: 'img/playerIcon.png',
        //shadowUrl: 'leaf-shadow.png',

        iconSize: [24, 24], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    nonPlayerIcon = L.icon({
        iconUrl: 'img/nonPlayerIcon.png',
        //shadowUrl: 'leaf-shadow.png',

        iconSize: [24, 24], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    cityIcon = L.icon({
        iconUrl: 'img/cityIcon.png',
        //shadowUrl: 'leaf-shadow.png',

        iconSize: [32, 32], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
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

    //Intitiazes the array containing tiled overlay
    layers = []; // made global for createFeatureLayerByType

   

};

function getIconByType(featureType) {

    //Select marker icon based on featuretype
    switch (featureType) {
        //NPC icons            
        case 15:
            return nonPlayerIcon;
            break;

        //Player characters icons
        case 16:
            return playerIcon;
            break;

        //City icons
        case 17:
            return cityIcon;
            break;

        default:
            return unknownIcon;
            break;

    };
};
function fetchAPIdata(url) {

    url = apiMenuURL;

    fetch(url, {
        method: 'get'
    }).then(function (response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

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

function onEachFeature(feature, layer) {

    overlayData.push(feature);

    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.description) {

        console.log(feature.properties.description);

        var popupContent = "<div class='txtWB'>" + feature.properties.displayName + "</div>" + "<br>"
            + "<div>" + feature.properties.description + "</div>";



        layer.bindPopup(popupContent, {
            'maxWidth': '500',
            'className': 'customPopup'
        });
    }

    layer.bindTooltip(feature.properties.displayName);


    //Select and assign marker icon based on featuretype.
    layer.setIcon(getIconByType(feature.properties.featureTypeId));
    
    //Event handler for editing menu
    layer.on('contextmenu', function(e){

        if (!activePopup) {
            if ((usrRole != 'none' && usrId == this.feature.properties.owner) || usrRole == 'admin') {

                activePopup = true;
                L.DomUtil.disableTextSelection();

                //Defines HTML elments for the menu
                var menuContent = L.DomUtil.create('div', 'markerContextMenuButton');
                menuContent.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i> DELETE';
                //Event handler of the DELETE button
                menuContent.onclick = function (e) {

                    if (confirm('Are you sure you want to delete this marker?')) {

                        removeMarker(feature);
                        popup.remove();
                        activePopup = false;
                    } else {
                        // Do nothing!
                    }

                };

                //Defines the context menu as a popup
                var popup = L.popup({
                    closeButton: false,
                    autoClose: false,
                    closeOnEscapeKey: true,
                    className: 'customPopup'
                })
                    .setLatLng([e.latlng.lat, e.latlng.lng])
                    .setContent(menuContent)
                    .openOn(map);

                console.log('[DEBUG] this sounds like a context menu' + e.latlng + this.feature.properties.displayName + this.feature.properties.owner);

            } else console.log('[ADMIN] Only logged owners are allowed to modify markers.');

        };

    });
};

function getAllFeatures(map) {

    url = apiItemURL;

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

function toggleTiledLayer(featureId) {

    if (map.hasLayer(layers[featureId])) {

        map.removeLayer(layers[featureId]);
    }
    else {

        layers[featureId].addTo(map);
    }

};

function createFeatureLayerByType(map, controlparam, typeId) {

    url = apiItemURL + "?properties.featureTypeId=" + typeId;

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

        // Add features on the map based on type (overlay || geomarkers)

        var layerLvl = config.featureIdLayerOrdering[typeId]; //Retrieve ordering of the overlay based on config object

        switch (config.featureIdLayerStyle[typeId]) {

            case 'tiledOverlay':


                var tileId = 'feature' + typeId;
                var apiTileServiceOverlayURL = 'http://localhost:7999/api/tiledOverlay/' + tileId + '/{z}/{x}/{y}';

               
                layers[typeId] = L.tileLayer(apiTileServiceOverlayURL, {
                    minZoom: mapMinZoom, maxZoom: mapMaxZoom,
                    bounds: mapBounds,
                    noWrap: true,
                    tms: false,
                    zIndex: layerLvl,
                    tileSize: 512
                })

               // layers[layerLvl].setZIndex(50);
                layers[typeId].addTo(map);
                control.addOverlay(layers[typeId], name , group);
                console.log("LE Z index de " + layerLvl + " -- is -- "+ layers[typeId].zIndex);
                break;

            case 'geoMarker':
                //Default is geoMarker
                 layers[typeId] = L.geoJSON(data, {
                    onEachFeature: onEachFeature
                })
                
                 layers[typeId].zIndex = layerLvl;
                 layers[typeId].addTo(map);

                  control.addOverlay(layers[typeId], name , group);

                break;



        };




        console.log("**** Putting items of typeId (" + typeId + ") the map - done!")

    }).catch(function (err) {
        console.log("*** Failed to fetch Items! ***");
    });

};


function getFeatureByTYpe(map, typeId) {

    url = apiItemURL + "?properties.featureTypeId=" + typeId;


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

// Retrieve the editing rights based on user profile and modifies the UI accordingly
function checkUrPrivileges (usrRole){

    var usrRights = null; 

    if (usrRole != 'none'){

        usrRights = config.markersByRole[usrRole];

        $('#markerOptions').empty();
        usrRights.forEach(function(element) {
            $('#markerOptions')
            .append($('<option>', {
                value: element,
                text: config.categoryName[element]
            }));
            console.log(element);
          });
       
    }
    

    console.log("[DEBUG] Current user is: " + usrRole + "/id = "+ usrId + " with credentials for >> " + usrRights);

    return usrRights;

};

    

// End of utility functions section.

// Marker Mangement functions
function saveMarker(geojsonFeature) {

    var url = apiSaveItemURL;
    var data = geojsonFeature;

    console.log("Marker saved : ", geojsonFeature);

    // contacts backend to store new feature
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    }).then(res => res.json())
        .catch(error => console.error('Error :', error))
        .then(response => console.log('Successfully added item:', response));

    //updates searchlist in live memory
    overlayData.push(geojsonFeature);
};

function removeMarker(geojsonFeature) {
    console.log('[ADMIN] Marker #'+geojsonFeature._id+ ' is being deleted');
   
    var url = apiItemURL+"/"+geojsonFeature._id;
    //var data = geojsonFeature;

    //console.log("Marker saved : ", geojsonFeature);

    // contacts backend to store new feature
    fetch(url, {
        method: 'DELETE',
        //body: JSON.stringify(data),
        headers: new Headers({
           // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    }).then(res => res.json())
        .catch(error => console.error('Error :', error))
        .then(response => console.log('Successfully deleted item:', response));

    //updates searchlist in live memory
    //overlayData.push(geojsonFeature);*/
};
// End of marker management functions
function initializeWorldMapContent(map) {

    initialize();
    
    // Retrieve the feature categories and names from MenuService --> create the Menu
    url = apiMenuURL;

    fetch(url, {
        method: 'get'
    }).then(function (response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

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
            //group_maxHeight: "80px",
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
                config.categoryName[subMenu[i]._id] = subMenu[i].displayName;
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

       


     
        // Init Search Engine

        // temporary mockup data

        overlayData = [];

        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: [
                "properties.displayName",
                "properties.description"
            ]
        };

        fuse = new Fuse(overlayData, options); // "list" is the item array








    }).catch(function (err) {
        console.log("**** Failed to create content!");
        // Error :(
    });

    


};


function refreshUI(map) {

    if (adminMode) {

        // add leaflet.pm controls to the map
        map.pm.addControls(loggedOptions);
    } else {

        map.pm.addControls(unloggedOptions)
    };

};





function addItem(map) {

    var geojsonFeature = {};

    geojsonFeature["type"] = "Feature";

    geojsonFeature["properties"] = {};

    var e = document.getElementById("markerOptions");
    var type = e.options[e.selectedIndex].value;

    geojsonFeature["properties"]["featureTypeId"] = parseInt(type);

    geojsonFeature["properties"]["displayName"] = document.getElementById('itName').value;

    geojsonFeature["properties"]["description"] = document.getElementById('itDescr').value;

    geojsonFeature["geometry"] = {};

    geojsonFeature["geometry"]["type"] = "Point";

    geojsonFeature["geometry"]["coordinates"] = [lng, lat];

    var myLayer = L.geoJSON(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: getIconByType(parseInt(type)) });
        }
    }).addTo(map);

    myLayer.bindTooltip(geojsonFeature["properties"]["displayName"]);

    var popupContent = "<div class='txtWB'>" + geojsonFeature["properties"]["displayName"] + "</div>" + "<br>"
        + "<div>" + geojsonFeature["properties"]["description"] + "</div>";


    myLayer.bindPopup(popupContent, {
        'maxWidth': '500',
        'className': 'customPopup'
    });

    myLayer.on('contextmenu', function(e){

        if (!activePopup) {
            if ((usrRole != 'none' && usrId == this.feature.properties.owner) || usrRole == 'admin') {

                activePopup = true;
                L.DomUtil.disableTextSelection();

                //Defines HTML elments for the menu
                var menuContent = L.DomUtil.create('div', 'markerContextMenuButton');
                menuContent.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i> DELETE';
                //Event handler of the DELETE button
                menuContent.onclick = function (e) {

                    if (confirm('Are you sure you want to delete this marker?')) {

                        removeMarker(feature);
                        popup.remove();
                        activePopup = false;
                    } else {
                        // Do nothing!
                    }

                };

                //Defines the context menu as a popup
                var popup = L.popup({
                    closeButton: false,
                    autoClose: false,
                    closeOnEscapeKey: true,
                    className: 'customPopup'
                })
                    .setLatLng([e.latlng.lat, e.latlng.lng])
                    .setContent(menuContent)
                    .openOn(map);

                console.log('[DEBUG] this sounds like a context menu' + e.latlng + this.feature.properties.displayName + this.feature.properties.owner);

            } else console.log('[ADMIN] Only logged owners are allowed to modify markers.');

        };

    });

    saveMarker(geojsonFeature);

    //closes the modal
    document.getElementById('itemForm').style.display = 'none';

};

function getItemCoord(item) {

    var coord = {};
    coord.lng = 0;
    coord.lat = 0;

    switch (item["properties"]["featureTypeId"]) {

        case 10:

            coord.lng = item["geometry"]["coordinates"][0][0][0];
            coord.lat = item["geometry"]["coordinates"][0][0][1];
            break;

        default:

            coord.lat = item["geometry"]["coordinates"][1];
            coord.lng = item["geometry"]["coordinates"][0];


            break;



    };



    return coord;
};

function searchItem() {

    var key = document.getElementById('srchInputField').value;

    console.log("**SEARCH -- we are looking for : " + key);

    var results = fuse.search(key);

    console.log("We found : " + JSON.stringify(results));

    generateSearchList(results);




};

function clearSearchList() {

    document.getElementById('srchInputField').value = "";
    document.getElementById("srchResults").innerHTML = "";

};




function generateSearchList(results) {
    document.getElementById("srchResults").innerHTML = "";

    for (var i = 0; i < results.length; i++) {



        var div = document.createElement("div");


        div.setAttribute("data-srch-index", i);
        div.className = "srch-result-item";
        div.innerHTML = results[i]["properties"]["displayName"];

        item = results[i];





        //console.log("fly to: " + " ( "+coord.lng + " , " + coord.lat+")" + JSON.stringify(results[i]));
        div.onclick = function () {
            var index = this.getAttribute("data-srch-index");
            coord = getItemCoord(results[index]);

            map.flyTo([
                coord.lat,
                coord.lng],
                4);

            var popupOptions = {

                'maxWidth': '500',
                'className': 'customPopup'

            };

            var popup = L.popup(popupOptions)
                .setLatLng(L.latLng(coord.lat, coord.lng))
                .setContent(
                    "<div class='txtWB'>" + results[index]["properties"]["displayName"] + "</div>" + "<br>"
                    + "<div>" + results[index]["properties"]["description"] + "</div>"

                ).openOn(map);



        }

        document.getElementById("srchResults").appendChild(div);

    };








};


/****   THE FOLLOWING RELATES TO IDENTIFICATION ****/

function login() {
    mgr.signinRedirect();
};

function api() {
    mgr.getUser().then(function (user) {
        var url = apiIdentityURL;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
};

function logout() {
    mgr.signoutRedirect();
};
