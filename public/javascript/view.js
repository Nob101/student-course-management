/**
 * ES6 Module Nativer Standard bei Browserumgebung
 * reine DOM manipulation (optik) -> kein try catch finally
 * bekommt Daten aus apiService  -> Aufteilen von loadSchueler usw.
 * CSS anpassen!!!!
 */ 


export const renderView = {
    // Schülerliste anzeigen

    renderSchueler(schuelerData, onDelete, onSelect){
        const list = document.getElementById('schueler-liste');
        list.innerHTML = '';  // NEU: <li>Lade Schüler...</li> weg

        if (schuelerData.length === 0) {
            list.innerHTML = '<li>Keine Schüler gefunden.</li>';
            return;
        }


        schuelerData.forEach(student => {
            const li = document.createElement('li');
            li.classList.add('data-item', 'schueler-item');
            li.style.cursor = 'pointer';
               // NEU: dataset speichert eigene Werte direkt in HTML  -> best practice
            li.dataset.id = student._id;
// NEU: Kurse der einzelnen Schüler onSelect => Kurs-logik umgedreht
// Aber onclick hängt nur einen listener an, ein Zusatz wie  zB counter würde probleme machen   -> addEventlistener
        li.onclick = () => onSelect(student._id, `${student.vorname} ${student.nachname}`);

            // NEU: Anzeige von Name und der MongoDB _id
            const content = document.createElement('span');    //Fehlte!!!!
          content.textContent = `  ${student.vorname}  ${student.nachname}`;
            li.appendChild(content);


            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Löschen';
           deleteBtn.className = 'delete-button';

        //    NEU: Callback onDelete -> view muss nicht wissen wie gelöscht wird
            deleteBtn.onclick = (event) => {
                event.stopPropagation();   // bubbling
                const fullName = `${student.vorname} ${student.nachname}`;
                onDelete(student._id, fullName);    // Ruft die Lösch-Funktion auf
            };

            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    },

    // Kurse anzeigen  -> onSelect als callback -> click übergibt _id
    renderKurse(kursData, onSelect, onDelete) {
        const list = document.getElementById('kurs-list');
        list.innerHTML = '';


        if(kursData.length === 0){
             list.innerHTML = '<li>Keine Kurse verfügbar.</li>';
            return;
        }
        kursData.forEach(kurs  => {
            const li = document.createElement('li');
            li.classList.add('data-item', 'kurs-item');
            li.style.cursor = 'pointer';
          
           li.dataset.id = kurs._id;

            // NEU: Callback onSelect
    li.onclick = () => onSelect(kurs._id, kurs.kursname);

           const content = document.createElement('span');
            content.textContent = ` ${kurs.kursname} (Lehrer: ${kurs.lehrer})`;
            li.appendChild(content);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Löschen';
            deleteBtn.className = 'delete-button';

        
    // kurs.kursname bei delete vergessen
            deleteBtn.onclick = (event) => {
                event.stopPropagation();
                onDelete(kurs._id, kurs.kursname);
            };

            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    },


// Kurs Lehrer,   wenn vorhanden Schüler(teilnehmer)


    renderKursDetails(kurs) {
        const info = document.getElementById('kurs-teilnehmer-info');
        const list = document.getElementById('kurs-teilnehmer-list');
        
        list.innerHTML = '';
        //  Error-handling  || garantierte länge 0
        const teilnehmer = kurs.schueler || [];

        info.textContent = `Kurs: ${kurs.kursname}  | Lehrer: ${kurs.lehrer} mit (${teilnehmer.length} Teilnehmer)`;
        // list.innerHTML = 'Test test testtest';

        if ( teilnehmer.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Für diesen Kurs sind noch keine Schüler eingetragen,';
            

            li.style.fontStyle = 'italic';
            list.appendChild(li);
        } else {

            teilnehmer.forEach(schueler => {
                const li = document.createElement('li');
                li.className = 'data-item schueler-item';
                
                //  Enroll über Inputfeld-button
                 li.textContent = `${schueler.vorname} ${schueler.nachname} `;
                list.appendChild(li);
            });
        }
    },


    // NEU: Rendert Kurse in denen die Schüler eingetragen sind
   

renderTeilnehmer(schuelerName, kursNamen) {
    const info = document.getElementById('kurs-teilnehmer-info'); 
    const list = document.getElementById('kurs-teilnehmer-list'); 
    // NEU: Lerren
    list.innerHTML = '';

    info.textContent = `Kurse von ${schuelerName}: (${kursNamen.length})`;

    if (kursNamen.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Dieser Schüler ist in keinen Kursen eingeschrieben.';
        li.style.fontStyle = 'italic';
        list.appendChild(li);

    } else {

        kursNamen.forEach(kurs => {
            const li = document.createElement('li');
            li.className = 'data-item kurs-item';

            li.textContent = `${kurs.kursname} Lehrer: ${kurs.lehrer})`;
            list.appendChild(li);
        });
    }
},


    updateSearchDatalists(schuelerData, kursData) {
        const schuelerList = document.getElementById('schueler-options');
        const kursList = document.getElementById('kurs-options');

        if(schuelerList) {
            schuelerList.innerHTML = schuelerData.map(schueler => 
                `<option data-id="${schueler._id}" value="${schueler.vorname} ${schueler.nachname }"></option>`
            ).join('');
        }

        if(kursList) {
            kursList.innerHTML = kursData.map(kurs => 
                `<option data-id="${kurs._id}" value="${kurs.kursname}"></option>`
            ).join('');
        }
    },

    // NEU: Global Helper für messageDisplay aber in main.js DOM Abhängigkeit
    showStatus(message, color ) {
        const delay = 2000;
        const display = document.getElementById('enroll-message');
        if (!display) return;

        display.textContent = message;
        display.style.color = color;

        setTimeout(() => {
            display.textContent = '';
        }, delay);
    }
};



