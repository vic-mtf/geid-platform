export default function timeHumanReadable (
    _date = new Date(), 
    disabledNum = false, 
    params={showDetail: false 
}) {
    const now = new Date();
    const date = new Date(_date);
    const week = 604800000;
    const year = 31104000000;
    const delay = now.getTime() - date.getTime();
    const getHours = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    const getDay = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    const showDetail = params?.showDetail || false;
    delete params?.showDetail;
    const nowDay = now.getDay();
    const dateDay = date.getDay();
    const isSameWeek = nowDay === dateDay ? now.toLocaleDateString() === date.toLocaleDateString() : true 
    if(delay <= week && isSameWeek)  {
        
        let gap = 0;
        if(nowDay === dateDay)
            return disabledNum ? `Aujourd'hui ${showDetail ? 'à ' + getHours : ''}`.trim() : getHours;
        if(nowDay > dateDay)
            gap = nowDay - dateDay;
        if(dateDay > nowDay) 
            gap = nowDay + 7 - dateDay;
        if(gap === 1) return `Hier ${showDetail ? 'à ' + getHours : ''}`.trim();
        else if(gap === 2) return `Avant hier ${showDetail ? 'à ' + getHours : ''}`.trim();
        else if(gap > 2) return `${getDay} ${showDetail ? 'à ' + getHours : ''}`.trim();
    } else {
        return date.toLocaleDateString(
                'fr-FR', 
                showDetail ? {
                    weekday: undefined, 
                    year: delay > year ? 'numeric' : undefined, 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit',
                    minute:'2-digit',
                    ...params,
                } : params);
    }
    return '';
}
