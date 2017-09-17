// script to create worldmapdb
conn = new Mongo();
db = conn.getDB('worldmapdb');

// drop
db.dropDatabase();

// recreate
db.createCollection('item');
db.item.insert([
    { '_id' : 1, 'displayName' : 'First judge Archot', 'featureTypeId' : 15 },
    { '_id' : 2, 'displayName' : 'Scrapper Lupo', 'featureTypeId' : 16 }
]);
db.featureType.ensureIndex({ 'featureTypeId' : 1 });

// check
cursor = db.item.find();
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
 };