
function initialize() {

    adminMode = false;

    // set customized icons
    playerIcon = L.icon({
        iconUrl: 'img/playerIcon.png',
        //shadowUrl: 'leaf-shadow.png',

        iconSize: [32, 32], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    nonPlayerIcon = L.icon({
        iconUrl: 'img/nonPlayerIcon.png',
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

function onEachFeature(feature, layer) {



    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.description) {
       
       console.log(feature.properties.description);

       var popupContent =  "<div class='txtWB'>"+ feature.properties.displayName + "</div>" + "<br>"
                        + "<div>"+ feature.properties.description + "</div>" ;
       
       
       
        layer.bindPopup(popupContent, {
            'maxWidth': '500',
            'className' : 'customPopup'
        });
    }

    layer.bindTooltip(feature.properties.displayName);



    switch (feature.properties.featureTypeId) {
        case 15:

            layer.setIcon(nonPlayerIcon);
            break;
        case 16:
            layer.setIcon(playerIcon);
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

    if (adminMode) {

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
            position: 'bottomright'
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

    if (adminMode) {

        // add leaflet.pm controls to the map
        map.pm.addControls(loggedOptions);
    } else {

        map.pm.addControls(unloggedOptions)
    };

};

function getIconByType(featureType) {

    switch (featureType) {

        case 15:
            return nonPlayerIcon;

        case 16:
            return playerIcon;


    };
};

function saveMarker(geojsonFeature){

    console.log(JSON.stringify(geojsonFeature));
  


};

function addItem(map) {

    var geojsonFeature = {};

    geojsonFeature["type"] = "Feature";

    geojsonFeature["properties"] = {};

    var e = document.getElementById("itType");
    var type = e.options[e.selectedIndex].value;

    geojsonFeature["properties"]["featureTypeId"] = parseInt(type);

    geojsonFeature["properties"]["displayName"] = document.getElementById('itName').value;

    geojsonFeature["properties"]["description"] = document.getElementById('itDescr').value;

    geojsonFeature["geometry"] = {};

    geojsonFeature["geometry"] ["type"] = "Point";

    geojsonFeature["geometry"] ["coordinates"] = [lng, lat];

    var myLayer = L.geoJSON(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: getIconByType(parseInt(type)) });
        }
    }).addTo(map);

    myLayer.bindTooltip(geojsonFeature["properties"]["displayName"]);
    myLayer.bindPopup(geojsonFeature["properties"]["description"]);

    saveMarker(geojsonFeature);

    //closes the modal
    document.getElementById('itemForm').style.display = 'none';

};

function searchItem (){

    var key = document.getElementById('srchInputField').value;

    console.log("**SEARCH -- we are looking for : " + key);

    var results = fuse.search(key);
     
    console.log("We found : " + JSON.stringify(results));

    generateSearchList(results);

    


};

function clearSearchList(){
    
    document.getElementById('srchInputField').value = "";
    document.getElementById("srchResults").innerHTML ="";

};

function generateSearchList(results) {
    document.getElementById("srchResults").innerHTML ="";

    for (var i = 0; i < results.length; i++) {

        

        var div = document.createElement("div");

       
        div.setAttribute("data-srch-index", i);
        div.className = "srch-result-item";
        div.innerHTML = results[i]["properties"]["displayName"];

        item = results[i];
        div.onclick =  function(){
            var index = this.getAttribute("data-srch-index");
            console.log("CLIQ ON : " +index+ results[index]["properties"]["displayName"] + results[index]["geometry"]["coordinates"] );
            map.flyTo([
                results[index]["geometry"]["coordinates"][1],
                results[index]["geometry"]["coordinates"][0]], 
                4);
        }
      
        document.getElementById("srchResults").appendChild(div);

    };


/****   THE FOLLOWING RELATES TO IDENTIFICATION ****/

function login() {
    mgr.signinRedirect();
};

function api() {
    mgr.getUser().then(function (user) {
        var url = "http://localhost:5001/identity";

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



};