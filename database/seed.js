

const Schueler = require('../models/schueler');
const Kurse = require('../models/kurs');


async function seedData(){

    try{
        const schuelerCount = await Schueler.countDocuments();
        const kursCounter = await Kurse.countDocuments();

        if(schuelerCount === 0 && kursCounter === 0){
            console.log('Seeding Test Data...');


              // Fake schüler erstellen
            const fakeSchueler = await Schueler.create({
                vorname: 'John',
                nachname: 'Doe',
                svnummer: '11110395'
                
            });

            // Kurs erstellen
            const fakeKurs = await Kurse.create({
                kursname: 'Musik_101',
                lehrer: 'John F.',
                schueler: [fakeSchueler._id]

            });
          
            console.log(`Testkurs ${fakeKurs.name} angelegt und der Testschüler ${fakeSchueler.vorname} eingetragen`);


        } else {
            console.log('In der Datenbank sind bereits Daten vorhanden');
        }
    } catch (err) {
        console.error('', err);
    }
}

module.exports = seedData;