// NEU: Einfache Protokollierung für request Anfragen

const logger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${req.method} request to ${req.url}`);
    next();   //Reicht die Anfrage weiter
}

module.exports = logger;


/**
 * Ausgabe:
 * Über localhost:3000/health    -> kommt im Frontend ein OK
 * im Docker.Desktop Konsole kann man auslesen:
 *          'timestamp'  die 'request Methode' und die 'request URL'   
 */


