


import { createTemplate, fetchAppData } from './utilis.js';



    const dashBtn = document.getElementById('trigger-dashboard');
    const dashOverlay = document.getElementById('dashboard-overlay');
    const closeDash = document.getElementById('close-dash');

    // NEU: Filtern nach Namen
    const searchInput = document.getElementById('global-search-input');
    const searchDropdown = document.getElementById('search-results-dropdown');  





function renderSearchResults(filteredSchueler, filteredKurse) {
    
    const schuelerString = filteredSchueler.map(schueler => createTemplate(schueler, 'schueler', false)).join('');
    const kurseString = filteredKurse.map(kurse => createTemplate(kurse, 'kurs', false)).join('');
    
    if (!schuelerString && !kurseString) {
        searchDropdown.innerHTML = '<div class="search-item" style="color: var(--zangetsu);">Keine Treffer</div>';
    } else {
        // beide Strings kombinieren 
        searchDropdown.innerHTML = schuelerString + kurseString;
    }
    
    searchDropdown.classList.remove('hidden');
}



// Event Listener dranhängen
if(searchInput) searchInput.addEventListener('input', handleSearch);


// NEU: Schließen beim Klick außerhalb der Searchbar
document.addEventListener('click', (event) => {

    if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
        searchDropdown.classList.add('hidden');
    }
});







//  NEU: Helper nutzen
    async function openDashboard(){
        dashOverlay.classList.remove('hidden');
        dashOverlay.style.display = 'flex'

        // NEU: Globaler fetch
    const { schueler, kurse } = await fetchAppData();
       
      

        // NEU: Helper  kursContainer]
        const studentContainer = document.getElementById('dash-student-list');
         const courseContainer = document.getElementById('dash-course-grid');
                // joinen
            studentContainer.innerHTML = schueler.map(schueler => createTemplate(schueler, 'schueler', true)).join('');
            courseContainer.innerHTML = kurse.map(kurs => createTemplate(kurs, 'kurs', true)).join('');
           
            
   
    }
     if(dashBtn) dashBtn.addEventListener('click', openDashboard);
    
    // Schließen des Dashboards
    if(closeDash) {
        closeDash.addEventListener('click', () => {
            dashOverlay.style.display = 'none';
            dashOverlay.classList.add('hidden');
        });
    }




    async function handleSearch(event) {
    const term = event.target.value.toLowerCase();
    
    if (term.length < 1) {
        searchDropdown.classList.add('hidden');
        return;
    }

    const { schueler, kurse} = await fetchAppData();

        // NEU: Filtern auch nur mit Nachname
        const filteredSchueler = schueler.filter(schueler => 
            `${schueler.vorname} ${schueler.nachname}`.toLowerCase().startsWith(term)
        );
        const filteredKurse = kurse.filter(kurs => 
            kurs.kursname.toLowerCase().startsWith(term)
        );

        // Ergebnisse anzeigen!!!
        renderSearchResults(filteredSchueler, filteredKurse);
    
}








