export default function timeElapsed(date, bigger= false) {
    let now = new Date();
    let diff = Math.abs(now - new Date(date));

    let minutes = Math.floor(diff / 60000);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let days = Math.floor(hours / 24);
    hours = hours % 24;
    let weeks = Math.floor(days / 7);
    days = days % 7;
    let months = Math.floor(weeks / 4);
    weeks = weeks % 4;

    let result = [];
    if (months > 0) 
        result.push(months + (months > 1 ? " mois" : " mois"));
    if (weeks > 0) 
        result.push(weeks + (weeks > 1 ? " semaines" : " semaine"));
    if (days > 0) 
        result.push(days + (days > 1 ? " jours" : " jour"));
    if (hours > 0) 
        result.push(hours + (hours > 1 ? " heures" : " heure"));
    if (minutes > 0) 
        result.push(minutes + (minutes > 1 ? " minutes" : " minute"));
    
    if(bigger) return result[0]
    else return result.join(", ");
}
