// script to create worldmapitemdb
conn = new Mongo();
db = conn.getDB('worldmapitemdb');

// drop
db.dropDatabase();

// recreate
db.createCollection('item');
db.item.insert([
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [63, -44]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'First judge Archot',
            'description': 'He\'s old and somewhat insane.',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [79, -81]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Scrapper Lupo',
            'description': 'A scrapper living and working in syracus.',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    }
]);
db.featureType.createIndex({ 'properties.featureTypeId' : 1 });
db.featureType.createIndex( { 'geometry' : '2d' } )

// check
cursor = db.item.find();
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
 };