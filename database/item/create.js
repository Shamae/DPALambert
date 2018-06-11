// script to create worldmapitemdb
conn = new Mongo();
db = conn.getDB('worldmapitemdb');

// drop
db.dropDatabase();

// recreate
db.createCollection('item');
db.item.insert([
// City
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "London", "description" : "" }, "geometry" : { "coordinates" : [ 146.65625, -64.65625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Brest", "description" : "" }, "geometry" : { "coordinates" : [ 124.5, -81.890625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "St. Brieuc", "description" : "" }, "geometry" : { "coordinates" : [ 132.46875, -81 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Morlaix", "description" : "" }, "geometry" : { "coordinates" : [ 127.328125, -79.890625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Carhaix", "description" : "" }, "geometry" : { "coordinates" : [ 128.640625, -82.765625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Carnac", "description" : "" }, "geometry" : { "coordinates" : [ 130.640625, -87.359375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Vannes", "description" : "" }, "geometry" : { "coordinates" : [ 132.5, -86.46875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Rennes", "description" : "" }, "geometry" : { "coordinates" : [ 137.390625, -83.75 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Mont Saint Michel", "description" : "" }, "geometry" : { "coordinates" : [ 137.796875, -79.9375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "The Last Stand", "description" : "" }, "geometry" : { "coordinates" : [ 138.40625, -80.0625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Caen (Destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 142.734375, -77.25 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Alencon (Destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 144.3125, -81.140625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Lemans (Destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 143.84375, -83.203125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ruins of Nantes", "description" : "" }, "geometry" : { "coordinates" : [ 138.09375, -91.296875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Oil Rig Atlas", "description" : "" }, "geometry" : { "coordinates" : [ 122.453125, -91.546875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Oil Rig Ogen", "description" : "" }, "geometry" : { "coordinates" : [ 125.328125, -73.84375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Oil Rig Tethys", "description" : "" }, "geometry" : { "coordinates" : [ 131.921875, -75.4375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Plymouth (destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 128.609375, -70.65625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Bath (destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 136.484375, -65.28125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ziggurat of Ganaress (Destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 148.03125, -76.15625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Parasite", "description" : "" }, "geometry" : { "coordinates" : [ 156.453125, -80.15625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ziggurat of Parasite", "description" : "" }, "geometry" : { "coordinates" : [ 157.015625, -82.515625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Border Post North (Destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 161.640625, -75.21875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Brighton (Destroyed)", "description" : "" }, "geometry" : { "coordinates" : [ 145.0625, -70.65625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "The Ninth Ziggurat", "description" : "" }, "geometry" : { "coordinates" : [ 154.5, -107.78125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Aquitaine", "description" : "" }, "geometry" : { "coordinates" : [ 139.578125, -112.859375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Toulouse", "description" : "" }, "geometry" : { "coordinates" : [ 148.859375, -115.828125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Camp Fierté", "description" : "" }, "geometry" : { "coordinates" : [ 158.078125, -117.0625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Montpellier", "description" : "" }, "geometry" : { "coordinates" : [ 165.328125, -119.25 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Hijos del Sol", "description" : "" }, "geometry" : { "coordinates" : [ 148.734375, -127.265625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Peyrepertuse", "description" : "" }, "geometry" : { "coordinates" : [ 157.0625, -125.6875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Queribuse", "description" : "" }, "geometry" : { "coordinates" : [ 157.46875, -126 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Perpignan", "description" : "" }, "geometry" : { "coordinates" : [ 160.75, -126.6875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Burgos", "description" : "" }, "geometry" : { "coordinates" : [ 133.609375, -128.125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Valladolid", "description" : "" }, "geometry" : { "coordinates" : [ 117.4375, -128.6875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Leon", "description" : "" }, "geometry" : { "coordinates" : [ 114.1875, -121.859375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Salamanca", "description" : "" }, "geometry" : { "coordinates" : [ 108.71875, -135.59375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Madrid", "description" : "" }, "geometry" : { "coordinates" : [ 120.140625, -138.671875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Lissabon", "description" : "" }, "geometry" : { "coordinates" : [ 94.28125, -151.171875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Huelva", "description" : "" }, "geometry" : { "coordinates" : [ 100.109375, -156.921875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Cordoba", "description" : "" }, "geometry" : { "coordinates" : [ 117.671875, -155.640625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Sevilla", "description" : "" }, "geometry" : { "coordinates" : [ 104.140625, -158.0625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Granada", "description" : "" }, "geometry" : { "coordinates" : [ 120.59375, -160.140625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Cartagena", "description" : "" }, "geometry" : { "coordinates" : [ 133.5, -160.015625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Fes", "description" : "" }, "geometry" : { "coordinates" : [ 108.671875, -182.28125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Marrakush", "description" : "" }, "geometry" : { "coordinates" : [ 90.171875, -199.453125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Algier", "description" : "" }, "geometry" : { "coordinates" : [ 158.5625, -168.84375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Biskra", "description" : "" }, "geometry" : { "coordinates" : [ 170.15625, -186 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "El Colea", "description" : "" }, "geometry" : { "coordinates" : [ 158.203125, -202.34375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Tessalt", "description" : "" }, "geometry" : { "coordinates" : [ 151.359375, -275.75 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Gao", "description" : "" }, "geometry" : { "coordinates" : [ 136.828125, -300.71875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Agadesh", "description" : "" }, "geometry" : { "coordinates" : [ 194.171875, -309.421875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Qabis", "description" : "" }, "geometry" : { "coordinates" : [ 205.8125, -190.0625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Constantine", "description" : "" }, "geometry" : { "coordinates" : [ 191.46875, -168.28125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Tunis", "description" : "" }, "geometry" : { "coordinates" : [ 197.328125, -165.21875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Tripol", "description" : "" }, "geometry" : { "coordinates" : [ 215.96875, -196.6875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Zillah", "description" : "" }, "geometry" : { "coordinates" : [ 252.546875, -213.71875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Bengasi", "description" : "" }, "geometry" : { "coordinates" : [ 260.28125, -197.359375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Kairo", "description" : "" }, "geometry" : { "coordinates" : [ 324.8125, -196.734375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ajaccio", "description" : "" }, "geometry" : { "coordinates" : [ 188.84375, -131.109375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "The Black Nest", "description" : "" }, "geometry" : { "coordinates" : [ 187.40625, -129.046875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Cinto's Nest", "description" : "" }, "geometry" : { "coordinates" : [ 189.75, -126.453125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Toulon", "description" : "" }, "geometry" : { "coordinates" : [ 174.546875, -123.984375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Bayonne", "description" : "" }, "geometry" : { "coordinates" : [ 170.578125, -118.109375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Field Hospital Mercure", "description" : "" }, "geometry" : { "coordinates" : [ 170.34375, -107.28125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ziggurat of Iomedes", "description" : "" }, "geometry" : { "coordinates" : [ 167.65625, -90.40625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Bassham", "description" : "" }, "geometry" : { "coordinates" : [ 172.078125, -75.328125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Mulhouse", "description" : "" }, "geometry" : { "coordinates" : [ 180.625, -90.1875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Basel", "description" : "" }, "geometry" : { "coordinates" : [ 181.8125, -91.546875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Border Post South", "description" : "" }, "geometry" : { "coordinates" : [ 177.984375, -92.53125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Bern", "description" : "" }, "geometry" : { "coordinates" : [ 181.453125, -95.921875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "The Alpine Fortress", "description" : "" }, "geometry" : { "coordinates" : [ 186.515625, -98.515625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ziggurat of Machiawen", "description" : "" }, "geometry" : { "coordinates" : [ 177.9375, -97.953125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Cremant", "description" : "" }, "geometry" : { "coordinates" : [ 180.453125, -102.0625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Grionesse Customs Station", "description" : "" }, "geometry" : { "coordinates" : [ 184.03125, -103.4375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Fortrezza Lombardi", "description" : "" }, "geometry" : { "coordinates" : [ 191.484375, -103.703125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Bergamo", "description" : "" }, "geometry" : { "coordinates" : [ 193.109375, -104.953125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Carnest Intelligence Post", "description" : "" }, "geometry" : { "coordinates" : [ 180.9375, -107.171875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Turin", "description" : "" }, "geometry" : { "coordinates" : [ 183.65625, -109.6875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Genoa", "description" : "" }, "geometry" : { "coordinates" : [ 192.9375, -111.21875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ducal", "description" : "" }, "geometry" : { "coordinates" : [ 185.59375, -118.421875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Morvant Control Terminal", "description" : "" }, "geometry" : { "coordinates" : [ 181.28125, -119.921875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Perugia", "description" : "" }, "geometry" : { "coordinates" : [ 204.03125, -120.328125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "L'Aqulia", "description" : "" }, "geometry" : { "coordinates" : [ 210.90625, -121.890625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Pula", "description" : "" }, "geometry" : { "coordinates" : [ 214.53125, -112.203125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Cruces", "description" : "" }, "geometry" : { "coordinates" : [ 205.78125, -114.03125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Bologna", "description" : "" }, "geometry" : { "coordinates" : [ 202.59375, -112.09375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Syracus", "description" : "" }, "geometry" : { "coordinates" : [ 226.28125, -166.671875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Roma", "description" : "" }, "geometry" : { "coordinates" : [ 209, -130.796875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Trident", "description" : "" }, "geometry" : { "coordinates" : [ 200.265625, -102.296875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Veniz", "description" : "" }, "geometry" : { "coordinates" : [ 207.625, -105.0625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Santiago", "description" : "" }, "geometry" : { "coordinates" : [ 211.328125, -107.234375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Laibach", "description" : "" }, "geometry" : { "coordinates" : [ 221.609375, -103.6875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Voivodat Dalmazia", "description" : "" }, "geometry" : { "coordinates" : [ 230.609375, -114.71875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Voivodat Ionnus", "description" : "" }, "geometry" : { "coordinates" : [ 264.78125, -138.515625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Voivodat Sofia", "description" : "" }, "geometry" : { "coordinates" : [ 268.859375, -119.890625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Burgas", "description" : "" }, "geometry" : { "coordinates" : [ 288.40625, -116.5625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Istanbul", "description" : "" }, "geometry" : { "coordinates" : [ 294.703125, -125.796875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Voivodat Bukarest", "description" : "" }, "geometry" : { "coordinates" : [ 279.3125, -104.59375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Voivodat Beograd", "description" : "" }, "geometry" : { "coordinates" : [ 250.671875, -108.890625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Pest", "description" : "" }, "geometry" : { "coordinates" : [ 239.296875, -92.125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Brno", "description" : "" }, "geometry" : { "coordinates" : [ 227.09375, -80.796875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Praha Republica", "description" : "" }, "geometry" : { "coordinates" : [ 216.265625, -74.625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Jena", "description" : "" }, "geometry" : { "coordinates" : [ 202.125, -68.671875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Leipzig", "description" : "" }, "geometry" : { "coordinates" : [ 206.59375, -66.03125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Dresden", "description" : "" }, "geometry" : { "coordinates" : [ 212.859375, -67.890625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Wroclaw", "description" : "" }, "geometry" : { "coordinates" : [ 229.203125, -67.21875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Danzig", "description" : "" }, "geometry" : { "coordinates" : [ 236.875, -43.21875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Osman", "description" : "" }, "geometry" : { "coordinates" : [ 211.234375, -56.984375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Nullpelia", "description" : "" }, "geometry" : { "coordinates" : [ 185.984375, -72.25 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Wetzlar", "description" : "" }, "geometry" : { "coordinates" : [ 183.5625, -72.65625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Spicafield", "description" : "" }, "geometry" : { "coordinates" : [ 173.171875, -68.90625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Noret", "description" : "" }, "geometry" : { "coordinates" : [ 180.75, -70.65625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ruins of Exalt", "description" : "" }, "geometry" : { "coordinates" : [ 188.875, -68.0625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Siege", "description" : "" }, "geometry" : { "coordinates" : [ 185, -68.890625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Last Exit", "description" : "" }, "geometry" : { "coordinates" : [ 180.171875, -69.65625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Severinus", "description" : "" }, "geometry" : { "coordinates" : [ 179, -68.5 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ignatz", "description" : "" }, "geometry" : { "coordinates" : [ 180.328125, -66.875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Cathedral City", "description" : "" }, "geometry" : { "coordinates" : [ 178.28125, -67.40625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Born", "description" : "" }, "geometry" : { "coordinates" : [ 173.5, -66.1875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "A 235", "description" : "" }, "geometry" : { "coordinates" : [ 178.75, -66.1875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Mobilus", "description" : "" }, "geometry" : { "coordinates" : [ 177.296875, -64.34375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "The Festering", "description" : "" }, "geometry" : { "coordinates" : [ 182.609375, -65.125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Chalk Breach", "description" : "" }, "geometry" : { "coordinates" : [ 189, -65.046875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "The Klawen", "description" : "" }, "geometry" : { "coordinates" : [ 185.15625, -64.828125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Arnsberg", "description" : "" }, "geometry" : { "coordinates" : [ 184.953125, -64.09375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "The Spital", "description" : "" }, "geometry" : { "coordinates" : [ 183.59375, -63.640625 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Gesseln", "description" : "" }, "geometry" : { "coordinates" : [ 188.921875, -60.09375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Ferropol", "description" : "" }, "geometry" : { "coordinates" : [ 179.859375, -64.46875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Wupper Crater", "description" : "" }, "geometry" : { "coordinates" : [ 180.125, -64.1875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Dog's End", "description" : "" }, "geometry" : { "coordinates" : [ 177.34375, -61.484375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Newcrest", "description" : "" }, "geometry" : { "coordinates" : [ 180.953125, -62.546875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Cavernis", "description" : "" }, "geometry" : { "coordinates" : [ 182.0625, -61.734375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Sinder", "description" : "" }, "geometry" : { "coordinates" : [ 180.96875, -59.9375 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Leadfield", "description" : "" }, "geometry" : { "coordinates" : [ 185.0625, -59.78125 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Harm", "description" : "" }, "geometry" : { "coordinates" : [ 184.078125, -62.296875 ], "type" : "Point" }},
{ "type" : "Feature", "properties" : { "zoomlevel" : 1, "visibility" : "public", "owner" : "1", "timestamp" : new Date(), "featureTypeId" : 2, "displayName" : "Justitian", "description" : "" }, "geometry" : { "coordinates" : [ 182.625, -63.328125 ], "type" : "Point" }},
    // {
    //     'type': 'Feature',
    //     'geometry': {
    //         'type': 'Point',
    //         'coordinates': [63, -44]
    //     },
    //     'properties': {
    //         'featureTypeId': 2,
    //         'displayName': 'Justitian',
    //         'description': 'The righteous.',
    //         'zoomlevel': 0,
    //         'visibility': 'public',
    //         'owner': 'alice',
    //         'timestamp' : new Date()
    //     }
    // },
//     // NPC
//     {
//         'type': 'Feature',
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [63, -44]
//         },
//         'properties': {
//             'featureTypeId': 15,
//             'displayName': 'First judge Archot',
//             'description': 'He\'s old and somewhat insane.',
//             'zoomlevel': 2,
//             'visibility': 'public',
//             'owner' : 'bob',
//             'timestamp' : new Date()
//         }
//     },
//     // PC
//     {
//         'type': 'Feature',
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [79, -81]
//         },
//         'properties': {
//             'featureTypeId': 16,
//             'displayName': 'Scrapper Lupo',
//             'description': 'A scrapper living and working in syracus.',
//             'zoomlevel': 3,
//             'visibility': 'private',
//             'owner' : 'alice',
//             'timestamp' : new Date()
//         }
//     },
// // Primer (alice 07/02/2018 : Polygons can't be fetched yet)
//      {
//          'type': 'Feature',
//          'geometry': {
//              'type': 'Polygon',
//              'coordinates': [[
//                  [35,-97],[35,-95],[33,-95],[33,-93],[36,-90],[36,-91],[34,-93],[34,-94],[35,-94],[35,-93],[36,-92],[36,-94],[37,-94],[37,-95],[36,-95],[36,-97],
//                  [38,-97],[38,-95],[40,-95],[43,-98],[42,-98],[40,-96],[39,-96],[39,-97],[40,-97],[41,-98],[39,-98],[39,-99],[38,-99],[38,-98],[36,-98],
//                 [36,-100],[38,-100],[38,-102],[35,-105],[35,-104],[37,-102],[37,-101],[36,-101],[36,-102],[35,-103],[35,-101],[34,-101],[34,-100],[35,-100],[35,-98],
//                  [33,-98],[33,-100],[31,-100],[28,-97],[29,-97],[31,-99],[32,-99],[32,-98],[31,-98],[30,-97],[32,-97],[32,-96],[33,-96],[33,-97],[35,-97]
//              ]]
//          },
//          'properties': {
//              'featureTypeId': 10,
//              'displayName': 'Symbol',
//              'description': 'Just to show off.',
//              'zoomlevel': 0,
//              'visibility': 'public',
//              'owner' : 'alice',
//              'timestamp' : new Date()
//          }       
//      }
]);
db.featureType.createIndex({ 'properties.featureTypeId' : 1 });
db.featureType.createIndex( { 'geometry' : '2d' } )

// check
cursor = db.item.find();
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
 };