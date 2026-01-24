// NEU: Logik auf MVC angepasst / Schaltzentrale
// Ein Module das Datenlädt
// Ein Module das die Daten darstellt



import { apiService } from "./apiService.js";
import { renderView } from "./view.js";


document.addEventListener('DOMContentLoaded', () => {
    // lädt Daten (refresh)
    updateSite();
    // Events für userInput
    initSetup();
});

/**
 * Alle Daten von API holen und mit view darstellen
 */

async function updateSite() {
    try {
        const schueler = await apiService.getSchueler();
        const kurse = await apiService.getKurse();

        //  Schueler holen
        renderView.renderSchueler(
            schueler, 
            // CallbackHölle -_-
            async (id, name) => {
                if (confirm(`Schüler ${name} wirklich löschen?`)) {
                    await apiService.deleteSchueler(id);
                    updateSite();
                }
            },
            // Callback
            (schuelerId, schuelerName) => {
                // WICHTIG: filter braucht ein return
                const teilnahme = kurse.filter(kurs => 
                    kurs.schueler && kurs.schueler.some(schueler => (schueler._id || schueler) === schuelerId)
                );
                // Aufruf der Anzeige-Funktion für die belegten Kurse
                renderView.renderTeilnehmer(schuelerName, teilnahme);
            }
        ); 

        //  Kurse erstellen
        renderView.renderKurse(
            kurse, 
            showKurse, 
            async (id, name) => {
                if (confirm(`Kurs "${name}" wirklich löschen?`)) {
                    await apiService.deleteKurs(id);
                    updateSite();
                }
            }
        );

        //  DATA aktualisieren
        renderView.updateSearchDatalists(schueler, kurse);

    } catch (err) {
        console.error('Fehler beim Aktualisieren der Seite!!!', err);
    }
}







/**
 * Initialisieren der Formulare / User-Input
 * muss selbst nicht asnc sein, nur dei Event-Listener innerhalb
 */

function initSetup() {
    // Schüler erstellen Event-Objekt mit "target" auf das HTML formular-element
    document.getElementById('create-schueler-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = {
            vorname: document.getElementById('schueler-vorname').value,
            nachname: document.getElementById('schueler-nachname').value,
            svnummer: document.getElementById('sv-nummer').value
        };
        await apiService.createSchueler(data);
        event.target.reset();    //reset wichtig!!! leert das Formular nach submit
        updateSite();
    });


// Kurs anlegen
    document.getElementById('create-kurs-form').addEventListener('submit', async (event) =>{
        event.preventDefault();
        const data = {
            kursname : document.getElementById('kurs-name').value,
            lehrer: document.getElementById('kurs-lehrer').value

        };
        await apiService.createKurs(data);
        event.target.reset();
        updateSite();
    });

    // NEU: Schüler zu Kurs einschreiben => Kursteilnehmer via Namen (dataset)
    document.getElementById('enroll-form').addEventListener('submit', async (event) => {
        event.preventDefault();
// wieder vertauscht -_-
        const schuelerName = document.getElementById('enroll-schueler-input').value;
        const kursName = document.getElementById('enroll-kurs-input').value;
         
           
        
        const schuelerOption = document.querySelector(`#schueler-options option[value="${schuelerName}"]`);
        const kursOption = document.querySelector(`#kurs-options option[value="${kursName}"]`);

           

            // NEU: Alert weg  -> messageDspl weg -> showStatus !!
            if (!schuelerOption || !kursOption) {
               renderView.showStatus(" Bitte Namen aus der Liste  wählen!", "orange");
                    return;
                }

                const schuelerId = schuelerOption.dataset.id;
                const kursId = kursOption.dataset.id;

        const response = await apiService.enroll( kursId, schuelerId);
        

        if (response.ok){
            renderView.showStatus("  Erfolgreich eingeschrieben!", "green");
        
            event.target.reset();
            updateSite();

        }else {
             renderView.showStatus("  Fehler beim Einschreiben!", "red");
        }

    });









// Bis hier hin stimmts (idtag prüfen delet-form ALT!!!!)
// innerhalb enroll-form -_-

    // Schüler aus Kurs werfen lol... 

 document.getElementById('btn-unenroll')?.addEventListener('click', async () => {
        
        const kursName = document.getElementById('enroll-kurs-input').value;
        const schuelerName = document.getElementById('enroll-schueler-input').value;

        
       const schuelerOption = document.querySelector(`#schueler-options option[value="${schuelerName}"]`);
    const kursOption = document.querySelector(`#kurs-options option[value="${kursName}"]`);

    if (!schuelerOption || !kursOption) {
         renderView.showStatus("  Bitte wähle  Schüler und Kurs aus der Liste aus!", "orange");
       
        return;
    }

            const schuelerId = schuelerOption.dataset.id;
            const kursId = kursOption.dataset.id;

        const response = await apiService.unenroll( kursId, schuelerId);
      

        if (response.ok){
             renderView.showStatus("  Erfolgreich abgemeldet!", "green");

            document.getElementById('enroll-form')?.reset();
            updateSite();

        }else {
             renderView.showStatus("  Fehlschlag beim Abmeldeversuch", "red");
             return ;
        }

    });
}


    // NEU: Suche nach Namen Schüler und kurse
    // nicht search-id-finder sonder global-search-finder

    
   
// Mongoose verschachtelt Objekte durch .populate('schueler')
// Auch ohne schüler exisiert ein Kurs 
async function showKurse(id) {
    const kursData = await apiService.getKursDetails(id);   //kursData gesamtes Datenpacket {...}
    renderView.renderKursDetails( kursData);
}