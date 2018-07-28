// script to create worldmapdb
conn = new Mongo();
db = conn.getDB('worldmapdb');

// drop
db.dropDatabase();

// recreate
db.createCollection('category');
db.category.insert([
    { '_id' : 1, 'displayName' : 'Geography' },
    { '_id' : 2, 'displayName' : 'Civilization' },
    { '_id' : 3, 'displayName' : 'Information' },
    { '_id' : 4, 'displayName' : 'Characters' },
    { '_id' : 5, 'displayName' : 'Locations' }
]);

db.createCollection('featureType');
db.featureType.insert([
    // Geography
    { '_id' : 1, 'displayName' : 'Regions/territories', 'categoryId' : 1, 'geometryType' : 'overlay' },
    { '_id' : 3, 'displayName' : 'Points of interest', 'categoryId' : 1, 'geometryType' : 'point' },
    { '_id' : 4, 'displayName' : 'Mayor roads/passages', 'categoryId' : 1, 'geometryType' : 'overlay' },
    { '_id' : 5, 'displayName' : 'Mayor trade routes', 'categoryId' : 1, 'geometryType' : 'overlay' },
    // Civilization
    { '_id' : 6, 'displayName' : 'Rivers', 'categoryId' : 2, 'geometryType' : 'overlay' },
    { '_id' : 7, 'displayName' : 'Bodies of water', 'categoryId' : 2, 'geometryType' : 'overlay' },
    { '_id' : 8, 'displayName' : 'Mountain ranges', 'categoryId' : 2, 'geometryType' : 'overlay' },
    { '_id' : 9, 'displayName' : 'Climate zones', 'categoryId' : 2, 'geometryType' : 'overlay' },
    { '_id' : 10, 'displayName' : 'Primer', 'categoryId' : 2, 'geometryType' : 'overlay' },
    // Information
    { '_id' : 11, 'displayName' : 'Temperature', 'categoryId' : 3, 'geometryType' : 'overlay' },
    { '_id' : 12, 'displayName' : 'Rainfall', 'categoryId' : 3, 'geometryType' : 'overlay' },
    { '_id' : 13, 'displayName' : 'Population', 'categoryId' : 3, 'geometryType' : 'overlay' },
    { '_id' : 14, 'displayName' : 'Cult influence', 'categoryId' : 3, 'geometryType' : 'overlay' },
    // Characters
    { '_id' : 15, 'displayName' : 'Non-player characters', 'categoryId' :4, 'geometryType' : 'point' },
    { '_id' : 16, 'displayName' : 'Player characters', 'categoryId' : 4, 'geometryType' : 'point' },
    // Locations
    { '_id' : 17, 'displayName' : 'Cities', 'categoryId' : 5, 'geometryType' : 'point' },
    { '_id' : 18, 'displayName' : 'Towns', 'categoryId' : 5, 'geometryType' : 'point' },
    { '_id' : 19, 'displayName' : 'Outposts', 'categoryId' : 5, 'geometryType' : 'point' },
    { '_id' : 20, 'displayName' : 'Ruins', 'categoryId' : 5, 'geometryType' : 'point' },
    { '_id' : 21, 'displayName' : 'Oil Rigs', 'categoryId' : 5, 'geometryType' : 'point' },
    { '_id' : 22, 'displayName' : 'Cities', 'categoryId' : 5, 'geometryType' : 'point' },
    { '_id' : 23, 'displayName' : 'Zigguraths', 'categoryId' : 5, 'geometryType' : 'point' }
]);
db.featureType.createIndex({ 'categoryId' : 1 });

// check
cursor = db.category.find();
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
 };
cursor = db.featureType.find();
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
};