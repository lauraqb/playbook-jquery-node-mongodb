'use strict'

let mongoose = require('mongoose');
let CryptoJS = require("crypto-js");
let playsCollection = "plays";
let plays_obj = {};
let encrypted_playbook = "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";
let alternative_playbook = [ 
    [ 'RAMBO triple option derecha', 'option 1: FB, opt.2: QB (keep), opt.3: RB (pitch)' ],
    [ 'LIMBO triple option izquierda', 'option 1: FB, opt.2: QB (keep), opt.3: RB (pitch)' ],
    [ 'RAMBO sprint option derecha', 'option 1: FB, opt.2: QB (keep), opt.3: RB (pitch)' ],
    [ 'LIMBO sprint option izquierda', 'option 1: FB, opt.2: QB (keep), opt.3: RB (pitch)' ],
    [ 'RAMBO ISO derecha', '' ],    
    [ 'LIMBO ISO izquierda', '' ],
    [ 'RAMBO POWER derecha', '' ],
    [ 'RAMBO POWER izquierda', '' ],
    [ 'RAMBO POWER PASS derecha', 'ruta 1' ],
    [ 'LIMBO POWER PASS izquierda', '1' ],
    [ 'FLEX SWITCH PASS', 'doble 8' ],
    [ 'FLEX OUT PASS', 'doble 7' ]
];

var key = process.argv[2];
if(key != undefined) {
    var bytes  = CryptoJS.AES.decrypt(encrypted_playbook, key);
    try {
        plays_obj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch(er) {
        console.log('Wrong key. The alternative playbook will be used instead');
        plays_obj = alternative_playbook;
    }
}
else {
    console.log('Alternative playbook');
    plays_obj = alternative_playbook;
}


mongoose.connect('mongodb://localhost/db_playbook');

//We now need to get notified if we connect successfully or if a connection error occurs:
let conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    console.log("Connected to the Playbook Mongo Database!");
    mongoose.connection.db.listCollections().toArray(function(err, names) {
        if (err) console.log(err);
        else {
            names.forEach(function(e,i,a) {
                mongoose.connection.db.dropCollection(e.name, function(err, res) {
                    if (err) throw err;
                    else if (e.name == playsCollection)
                      createCollectionAndInsertData();
                    console.log("Collection "+e.name+" deleted!");
                });
            });
        }
    });
});

function createCollectionAndInsertData() {
    conn.createCollection(playsCollection, function(err, res) {
        if (err) throw err;
        console.log("Collection plays created!");
        insertPlays();
        // conn.close();   //close method has also been moved to client obj
    });
}

function insertPlays() {
    let values = [{"name":"NEAR D dive 32","notes":""},{"name":"TRIPS D shallow,0,wheel","notes":""},{"name":"FAR I dive 22","notes":""},{"name":"NEAR D fake dive 32, 0,0,0, RB-swing","notes":"pocket"},{"name":"FAR D blast 24","notes":""},{"name":"SLOT doble spot,wheel","notes":"indicar D/I"},{"name":"SLOT doble flash,6","notes":"indicar D/I"},{"name":"SLOT doble 8,7","notes":"indicar D/I"},{"name":"NEAR I toss I","notes":"[pull]"},{"name":"FAR I blast 22","notes":""},{"name":"TRIPS D shallow,5,7","notes":""},{"name":"FAR I bootleg I","notes":"6,1,9 (fake 24)"},{"name":"TRIPS D fake screen 1,7,TE-delay","notes":""},{"name":"SLOT doble flash,7","notes":"indicar D/I"},{"name":"FAR D bootleg D","notes":"9,1,6 (fake 23)"},{"name":"FAR D toss I","notes":""},{"name":"NEAR I doble 2,FB-flat,RB-swing","notes":"receptores muy abiertos"},{"name":"SLOT doble 2,pivot","notes":"indicar D/I"},{"name":"SLOT doble 2,bubble","notes":"indicar D/I"},{"name":"NEAR D dive 22","notes":"check a 24"},{"name":"NEAR D fake dive 22, doble 9, TE-delay","notes":"pocket"},{"name":"NEAR D 2,1,2","notes":"receptores muy abiertos. FB y RB pass protection"},{"name":"NEAR I dive 21","notes":""},{"name":"NEAR I bootleg I","notes":"6,1,9 (fake 24)"},{"name":"FAR I dive 32","notes":""},{"name":"TRIPS D reverse","notes":"QB bloquea izq. (bajo center)"},{"name":"TRIPS D 8,6,2","notes":""},{"name":"NEAR D counter 23","notes":"fake 34 [trap]"},{"name":"TRIPS D Rocket screen","notes":""},{"name":"FAR I blast 23","notes":""},{"name":"TRIPS D 6,spot,arrow","notes":""},{"name":"NEAR D toss D","notes":"[pull]"},{"name":"SLOT QB-draw","notes":"indicar D/I"},{"name":"SLOT doble 2,arrow","notes":"indicar D/I"},{"name":"NEAR I blast 22","notes":""},{"name":"TRIPS D 9,wheel,1","notes":""},{"name":"NEAR D blast 24","notes":""},{"name":"TRIPS D fake-reverse PASS (TE-delay)","notes":"QB bloquea izq. (bajo center)"},{"name":"NEAR D bootleg D","notes":"9,1,6, RB-flat (fake 23)"},{"name":"NEAR I counter 24","notes":"fake 33 [trap]"},{"name":"FAR I toss D","notes":"[pull?]"},{"name":"SLOT draw","notes":"indicar D/I"},{"name":"SLOT doble spot,7","notes":"indicar D/I"},{"name":"TRIPS D 2,2,2","notes":""},{"name":"TRIPS D 0,0,bubble","notes":""},{"name":"NEAR I dive 23","notes":""},{"name":"TRIPS D fake-reverse","notes":"bajo center"},{"name":"SLOT doble Rocket screen","notes":"pase a la izquierda. Bloqueo de RB en el hueco de R-Guard. bajo center + indicar D/I"},{"name":"TRIPS D dive 24","notes":"bajo center"},{"name":"FAR I counter 23","notes":"fake 34"},{"name":"NEAR D blast 21","notes":""},{"name":"TRIPS D shallow,0,arrow","notes":""},{"name":"SLOT doble 0,7","notes":"indicar D/I"},{"name":"NEAR I blast 23","notes":""},{"name":"NEAR D dive 24","notes":"check a 22"},{"name":"NEAR D doble 2,FB-flat,RB-swing","notes":"receptores muy abiertos"},{"name":"FAR D dive 31","notes":""},{"name":"SLOT doble WR screen","notes":"bajo center + indicar D/I"},{"name":"NEAR D 6,1,2, RB-swing","notes":"RB iz"},{"name":"FAR D dive 21","notes":""},{"name":"TRIPS D 6,5,0","notes":""},{"name":"TRIPS D WR screen","notes":""},{"name":"TRIPS D 2,pivot,2","notes":""},{"name":"TRIPS D toss I","notes":"bajo center [pull?]"},{"name":"SLOT doble fake screen,7","notes":"bajo center + indicar D/I"},{"name":"SLOT doble pivot,spot","notes":"indicar D/I"},{"name":"NEAR I dive 33","notes":""},{"name":"SLOT doble flash,wheel","notes":"indicar D/I"},{"name":"NEAR D dive 23","notes":""},{"name":"NEAR D QB sneak","notes":""},{"name":"TRIPS D 9,1,arrow","notes":""},{"name":"SLOT doble 8,7","notes":"indicar D/I"},{"name":"FAR D counter 24","notes":"fake 33"},{"name":"FAR D blast 21","notes":""}];
    conn.collection('plays').insert(plays_obj, function(err, res) {
        if (err) throw err;
        console.log("values inserted!");
        getPlays();
    });
}

function getPlays() {
    conn.collection("plays").find({}).toArray(function(req, result) {
        plays_obj = result;
        // console.log(plays_obj);
    });
}