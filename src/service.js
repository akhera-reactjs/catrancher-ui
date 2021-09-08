
// const stripes = [1,2,3];
// const colors = ['b', 'w','t']
// const shapes = ['t', 's','r']
// const eyes = ['g', 'b', 'r']

//Manually creating cats --- 

// function shuffle(array) {
//     let counter = array.length;

//     // While there are elements in the array
//     while (counter > 0) {
//         // Pick a random index
//         let index = Math.floor(Math.random() * counter);

//         // Decrease counter by 1
//         counter--;

//         // And swap the last element with it
//         let temp = array[counter];
//         array[counter] = array[index];
//         array[index] = temp;
//     }

//     return array;
// }

// async function getCatImage(id) {
//   const imageData =  await fetch('http://quantcats.herokuapp.com/static/cats/'+ id+'.png')
//     .then(response => {
//         return response;
//     }).then(imageData => {
//         // var b64Response = btoa(response);
//         // const imageData = 'data:image/png;base64,' + b64Response;
//         return imageData.url
//     })
//     return Promise.resolve(imageData);
// }

// async function getCatImages(bag) {
//     const data = bag.map(async (id) => {
//        const image = await  getCatImage(id);
//        return Promise.resolve({id: id, image: image})
//     });

//   return  Promise.all(data);
// }


// function getCats() {
//         let bag = [];
//         while(bag.length <12) {
//             const shuffled_stripes = shuffle(stripes);
//             const shuffled_colors = shuffle(colors);
//             const shuffled_shapes = shuffle(shapes);
//             const shuffled_eyes = shuffle(eyes);
//              for (let i=0; i<3; i++) {
//                 const cat_id = shuffled_stripes[i] + shuffled_colors[i]  + shuffled_shapes[i] + shuffled_eyes[i]
//                 if(!bag.includes(cat_id)) {
//                     bag.push(cat_id);
//                 }  
//             }
//         }  

//     return  getCatImages(bag).then(data =>  {
//             return Promise.resolve(data);
//      });
// }
// export default getCats;
