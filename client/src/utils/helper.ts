export const monthStr = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export const dayStr = ['SUN','MON','TUE','WED','THU','FRI','SAT']

export const dommer = (markup: TemplateStringsArray | string) => {
    const frag = document.createDocumentFragment();
    const markupStr =
        typeof markup === 'string' ? markup : Array.isArray(markup) ? markup[0] : '';
    
    let travelNode = new DOMParser().parseFromString(markupStr, 'text/html').body
        .firstElementChild;

    while(travelNode) {
        frag.appendChild(travelNode);

        travelNode = travelNode.nextElementSibling;
    }
    return frag;
}


export function dateWithDay(dateStr: string): string {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDay();
    const date = dateObj.getDate();
    let dateExtension = 'th';
    if(date == 1) {
        dateExtension = 'st';
    }
    else if(date == 2) {
        dateExtension = 'nd';
    }
    else if(date == 3) {
        dateExtension = 'rd';
    }
    return `${dayStr[day]}, ${date}${dateExtension}`
}

export function groupBy(objArr: {}[], key: string):object {
    return objArr.reduce((a,b) => {
        a[b[key]] = a[b[key]]??[];
        a[b[key]].push(b);
        return a;
    },{});
}