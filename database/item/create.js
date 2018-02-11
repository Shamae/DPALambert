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
            'zoomlevel': 0,
            'visibility': 'public',
            'owner': 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [69, -57]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Hellvetics stronghold',
            'description': 'A fortress in the alps.',
            'zoomlevel': 2,
            'visibility': 'public',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [61, -69]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Toulon',
            'description': 'Setting of The Killing Game.',
            'zoomlevel': 1,
            'visibility': 'public',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [69, -59]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Lucatore',
            'description': 'Setting of In Thy Blood.',
            'zoomlevel': 1,
            'visibility': 'public',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [76, -89]
        },
        'properties': {
            'featureTypeId': 2,
            'displayName': 'Tripol',
            'description': 'The hub of the world.',
            'zoomlevel': 0,
            'visibility': 'public',
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
            'zoomlevel': 2,
            'visibility': 'public',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [80, -67]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'Dr. Hernandez Vasco',
            'description': 'He\'s legion.',
            'zoomlevel': 2,
            'visibility': 'public',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [69, -43]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'Eject',
            'description': 'A needle in east Borca.',
            'zoomlevel': 2,
            'visibility': 'public',
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
            'zoomlevel': 2,
            'visibility': 'public',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [38, -79]
        },
        'properties': {
            'featureTypeId': 15,
            'displayName': 'Ezenwa the Hogon',
            'description': 'Anubian.',
            'zoomlevel': 2,
            'visibility': 'public',
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
            'zoomlevel': 3,
            'visibility': 'owner',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [68, -59]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Corporal Gruber',
            'description': 'Corlonel of Territorial Region II.',
            'zoomlevel': 3,
            'visibility': 'owner',
            'owner' : 'shamae',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [68, -52]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Luren',
            'description': 'A pneumancer.',
            'zoomlevel': 3,
            'visibility': 'owner',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [58, -78]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Ukmena',
            'description': 'A neolybian (seafarer).',
            'zoomlevel': 3,
            'visibility': 'public',
            'owner' : 'owner',
            'timestamp' : new Date()
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [78, -100]
        },
        'properties': {
            'featureTypeId': 16,
            'displayName': 'Agu',
            'description': 'A kifo.',
            'zoomlevel': 3,
            'visibility': 'owner',
            'owner' : 'dyingcircle',
            'timestamp' : new Date()
        }
    },
// Primer (shamae 07/02/2018 : Polygons can't be fetched yet)
     {
         'type': 'Feature',
         'geometry': {
             'type': 'Polygon',
             'coordinates': [[
                 [35,-97],[35,-95],[33,-95],[33,-93],[36,-90],[36,-91],[34,-93],[34,-94],[35,-94],[35,-93],[36,-92],[36,-94],[37,-94],[37,-95],[36,-95],[36,-97],
                 [38,-97],[38,-95],[40,-95],[43,-98],[42,-98],[40,-96],[39,-96],[39,-97],[40,-97],[41,-98],[39,-98],[39,-99],[38,-99],[38,-98],[36,-98],
                [36,-100],[38,-100],[38,-102],[35,-105],[35,-104],[37,-102],[37,-101],[36,-101],[36,-102],[35,-103],[35,-101],[34,-101],[34,-100],[35,-100],[35,-98],
                 [33,-98],[33,-100],[31,-100],[28,-97],[29,-97],[31,-99],[32,-99],[32,-98],[31,-98],[30,-97],[32,-97],[32,-96],[33,-96],[33,-97],[35,-97]
             ]]
         },
         'properties': {
             'featureTypeId': 10,
             'displayName': 'Symbol',
             'description': 'Just to show off.',
             'zoomlevel': 0,
             'visibility': 'public',
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