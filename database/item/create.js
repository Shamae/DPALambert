// script to create worldmapitemdb
conn = new Mongo();
db = conn.getDB('worldmapitemdb');

// drop
db.dropDatabase();

// recreate
db.createCollection('item');
db.item.insert([
    // City
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [63, -44]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Justitian',
            'description': 'The righteous.',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-57, 69]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Hellvetics stronghold',
            'description': 'A fortress in the alps.',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-65, 61]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Toulon',
            'description': 'Setting of The Killing Game.',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-59, 69]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Lucatore',
            'description': 'Setting of In Thy Blood.',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-89, 76]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Tripol',
            'description': 'The hub of the world.',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    // NPC
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
            'coordinates': [-67, 80]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'Dr. Hernandez Vasco',
            'description': 'He\'s legion.',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-43, 69]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'Eject',
            'description': 'A needle in east Borca.',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [64, -45]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'Rutgar',
            'description': 'The old wolf.',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-79, 38]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'Ezenwa the Hogon',
            'description': 'Anubian.',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    // PC
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
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-56, 68]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Corporal Gruber',
            'description': 'Corlonel of Territorial Region II.',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-52, 68]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Luren',
            'description': 'A pneumancer.',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-78, 58]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Ukmena',
            'description': 'A neolybian (seafarer).',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-100, 78]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Agu',
            'description': 'A kifo.',
            'owner' : 'dyingcircle',
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