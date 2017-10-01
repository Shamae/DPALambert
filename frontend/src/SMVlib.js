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
        layer.bindPopup(feature.properties.description);
    }
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
