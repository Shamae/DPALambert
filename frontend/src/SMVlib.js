function fetchAPIdata() {

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

function getItem(map){

    console.log('playing with geoJ like a boss')
   
    var geoJ= [{
        "type": "Feature",
        "properties": {"description": "Republican"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [23, -85],
                [42,  -86],
                [67,  -145.94],
                [40, -145.94],
                [20, -148.99]
            ]]
        }
    }, {
        "type": "Feature",
        "properties": {"description": "Democrat"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [109.05,-41.00],
                [102.06, -40.99],
                [102.03, -36.99],
                [109.04, -36.99],
                [109.05, -41.00]
            ]]
        }
    },

    {
        "type":"Feature",
        "geometry":{
            "type": "Point",
            "coordinates": [78, -60],

        },
        "properties":{
            "description": "it is so cool to put popups on the markers"
        },
    }

];


var myLayer = new L.LayerGroup();
L.marker([-22, -49.80]).addTo(soybeans_sp),
    L.marker([-23, -49.10]).addTo(soybeans_sp),
    L.marker([-21, -49.50]).addTo(soybeans_sp);

    L.geoJSON(geoJ, {
    onEachFeature: onEachFeature
}).addTo(map);




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


        getItem(map);

        // Sao Paulo Soybeans Plant
        var soybeans_sp = new L.LayerGroup();
        L.marker([-22, -49.80]).addTo(soybeans_sp),
            L.marker([-23, -49.10]).addTo(soybeans_sp),
            L.marker([-21, -49.50]).addTo(soybeans_sp);

        // Sao Paulo Corn Plant
        var corn_sp = new L.LayerGroup();
        L.marker([-22, -48.10]).addTo(corn_sp),
            L.marker([-21, -48.60]).addTo(corn_sp);

        // Rio de Janeiro Bean Plant
        var bean_rj = new L.LayerGroup();
        L.marker([-22, -42.10]).addTo(bean_rj),
            L.marker([-23, -42.78]).addTo(bean_rj);

        // Rio de Janeiro Corn Plant
        var corn_rj = new L.LayerGroup();
        L.marker([-22, -43.20]).addTo(corn_rj),
            L.marker([-23, -43.50]).addTo(corn_rj);

        // Rio de Janeiro Rice Plant
        var rice_rj = new L.LayerGroup();
        L.marker([-22, -42.90]).addTo(rice_rj),
            L.marker([-22, -42.67]).addTo(rice_rj),
            L.marker([-23, -42.67]).addTo(rice_rj);

        // Belo Horizonte Sugar Cane Plant
        var sugar_bh = new L.LayerGroup();
        L.marker([-19, -44.90]).addTo(sugar_bh),
            L.marker([-19, -44.67]).addTo(sugar_bh);

        // Belo Horizonte Corn Plant
        var corn_bh = new L.LayerGroup();
        L.marker([-19.45, -45.90]).addTo(corn_bh),
            L.marker([-19.33, -45.67]).addTo(corn_bh);




        var baseMaps = [
        ];

        var overlays = [
        ];

        // configure StyledLayerControl options for the layer soybeans_sp
        soybeans_sp.StyledLayerControl = {
            removable: true,
            visible: false
        }

        // configure the visible attribute with true to corn_bh
        corn_bh.StyledLayerControl = {
            removable: false,
            visible: true
        }
*/
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
                console.log("== We fetched the subcategory name: " + name + " ==");

                // we should retrieve the markers of subcategory from itemService but temporarily we don't: ... 
                markers = new L.LayerGroup();
                L.marker([-22, -49.80]).addTo(markers),
                    L.marker([-23, -49.10]).addTo(markers),
                    L.marker([-21, -49.50]).addTo(markers);

                // ...we should have retrieved the markers of subcategory from itemService.
                //subObj.name = "markers";
                control.addOverlay(markers, name, obj);
                

            };
            obj ={};

        };

        





        console.log("test stylized off");



        console.log("data is: " + JSON.stringify(data));

        var myElement = document.getElementById("log");
        myElement.innerText = "Data" + JSON.stringify(data);


    }).catch(function (err) {
        console.log("bouuuuuh!");
        // Error :(
    });

};