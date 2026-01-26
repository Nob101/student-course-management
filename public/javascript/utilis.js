
import API_BASE_URL from '../config.js';

const API_URL = API_BASE_URL;

// NEU: HTML Template Hilfsfunktion (DRY) um Dashboard und Suche schlanker zu halten
// XSS Sicher(er)    Schueelr oder Kurs  

// moderner (HOISTING)  => da variablen  definiert sein müssen
export const  createTemplate = (value, type, isDashboard = false) => {
        const tag = (type === 'schueler' && isDashboard) ? 'li' : 'div';
        const className = isDashboard ? (type === 'kurs' ? 'dash-course-item' : 'dash-item') : 'search-item';
        


    const valueId = value._id || value.id;
// Wenn schueler
    if (type === 'schueler') {
        const style = isDashboard ? 'style="list-style: none; margin-bottom: 8px; font-size: 0.9rem;"' : '';
        return `
            <${tag} class="${className}" ${style} data-id="${valueId}">
                <span style="color: var(--toshiro);">${value.vorname} ${value.nachname}</span>
            </${tag}>`;

    } else if (type === 'kurs') {
        // wenn kein Schüler = Kurs 
        return `

            <${tag} class="${className}" data-id="${valueId}">

                <div style="font-weight: bold; color: var(--ichigo); font-size: 0.9rem;"> ${value.kursname || 'Name fehlt'}</div>
                <div style="font-size: 0.8rem; color: var(--zangetsu);">Lehrer: ${value.lehrer}</div>

            </${tag}>`;
    }
    
    return '';   // Für den Fall das wieder der falsche Typ (undefined) kommt -_-
}




export async function fetchAppData(){
    try {
       const [resSchueler, resKurse] = await Promise.all([
            fetch(`${API_URL}/schueler`),
            fetch(`${API_URL}/kurse`)
        ]);
        return {
            schueler: await resSchueler.json(),
            kurse: await resKurse.json()
        };

    }catch (err){
        console.error("API Fehlgeschlagen:", err);
         // throw err;
        return { schueler: [], kurse: []}
       

    }
}
