
// reine fetch logik für json (Datenquelle)
// Basis URL

import API_BASE_URL from '../config.js';

const API_URL = API_BASE_URL;



export const apiService = {
    //Schueler  GET anfrage...
    async getSchueler(){
        const res = await fetch(`${API_URL}/schueler`);
        return await res.json();
    },
    async createSchueler(data){         //data anstatt vorname, nachname -> bleibt flexibel für später sv-nr
        return await fetch(`${API_URL}/schueler`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},   //Inhalt des Bodys ans Backend ist im JSON format
                body: JSON.stringify(data)
            }
        );
    },
    async deleteSchueler(id) {
        return await fetch(`${API_URL}/schueler/${id}`, 
            { 
                method: 'DELETE' 
            });
    },


    //Kurse
    async getKurse(){
        const res = await fetch(`${API_URL}/kurse`);
        return await res.json();
    },

    async createKurs(data){
        return await fetch(`${API_URL}/kurse`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
      );
    },

    // Einschreiben Kurs <=> Schüler
    async enroll(kursId, schuelerId) {
        return await fetch(`${API_URL}/kurse/${kursId}/schueler`, 
            {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ schuelerId }) 
        });
    },
// kein data -> Eindeutiger Pfad zur (kurs/schüler-Beziehung)
    async unenroll(kursId, schuelerId) {
        return await fetch(`${API_URL}/kurse/${kursId}/schueler/${schuelerId}`,
         {
            method: 'DELETE'
        });
    },

    // NEU: Delete Kurs -_-
    async deleteKurs(kursId){
        return await fetch(`${API_URL}/kurse/${kursId}`,
            {
                method: 'DELETE'
            }
        );
    },

    //  Schüler nach Namen Suchen statt ID; mit Endpunkt + trennzeichen ? und querry/question + Wert aus Suchfeld
    async findSchuelerByName(query) {
        const res = await fetch(`${API_URL}/schueler/search?q=${query}`);
        return await res.json();
    },

    async getKursDetails(id){
        const res = await fetch(`${API_URL}/kurse/${id}`);
        return res.json();
    }

};
