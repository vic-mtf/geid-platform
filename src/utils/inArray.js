export default function inArray (array_1=[], array_2=[]) {
    let find = false;
    array_2.forEach((item) => {
        if(~array_1.indexOf(item))
            find = true;
    });
    return find || (array_1.length === 0);
}