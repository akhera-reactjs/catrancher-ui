const baseUrl = 'http://quantcats.herokuapp.com';

export const getCats = async () => {
    const response = await fetch(`${baseUrl}/bag`)
    const data = await response.json();
    return  processData(data.cats);
}



const processData = (data) => {
    let cats = [];
    data.forEach( (catData) => {
        const cat = {
            id: catData.join(''),
            stripes: catData[0],
            color: catData[1],
            shape: catData[2],
            eyes: catData[3],
            image: baseUrl + '/static/cats/' + catData.join('') + '.png'
        }
        cats.push(cat)
    });
    return cats;
}

export const checkValidSelection = async (ids: Array<string>) => {
    const response = await fetch(`${baseUrl}/clowder?cat=${ids[0]}&cat=${ids[1]}&cat=${ids[2]}`)
    return await response.json()    
}
