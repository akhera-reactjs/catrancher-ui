import React ,{useState, useEffect} from 'react';
import './CatRanchers.scss';
import Card from '../Card';
import Feedback from '../Feedback';
import CatResultList from '../CatResultList';
import {getCats,checkValidSelection} from '../../datasource/service'
//import getCats from '../../service' //Manual

  
 type Stripes = 1|2|3;

 type Colors = 'b' | 'w' | 't';

 type Shapes = 't' | 's' | 'r';

 type Eyes = 'g' | 'b' | 'r';

interface CatDetails {
    id: string,
    stripes: Stripes,
    color: Colors,
    shape: Shapes,
    eyes: Eyes, 
    image: string
}
const CatRanchers = () => {
    const [cats, setCats] = useState<Array<CatDetails> | any>([]);
    const [selectedCats, setSelectedCats] =  useState<string[]>([]);
    const [feedback, setFeedback] =  useState<any | null>();
    const [result, setResult] = useState<string[]>([])

    const isValidSelection =  (selectedCats: any) =>{
       // const response = await checkValidSelection(selectedCats);
        let catDetails: Array<CatDetails> = [];
        selectedCats.forEach((catId: string) => {
             catDetails.push(cats.filter((cat: CatDetails) => cat.id === catId));
        });
        
        console.log('catDetails', catDetails);

        if((catDetails[0].shape === catDetails[1].shape) && (catDetails[1].shape !== catDetails[2].shape)) {
          return false;
        }

        if((catDetails[0].color === catDetails[1].color) && (catDetails[1].color !== catDetails[2].color)) {
            return false;
          }
        if((catDetails[0].eyes === catDetails[1].eyes) && (catDetails[1].eyes !== catDetails[2].eyes)) {
            return false;
        }
   

        return true;
    }

    useEffect(() => {
        async function getCatDetails() {
          try {
            const cats = await getCats();
            setCats(cats);
          }
          catch (error) {
            console.log(error);
          }
        }
        getCatDetails();
      }, []);


    useEffect(() => {
        if (selectedCats.length === 3) {
                if (isValidSelection(selectedCats)) {
                    let isExisting = false;
                    let resultArr = result;
                    selectedCats.forEach((catId) => {
                        if(!result.includes(catId)) {
                            resultArr.push(catId);
                        } else {
                            isExisting = true;
                        }
                    });
                    
                    if(!isExisting) {
                        setResult(resultArr);
                        setFeedback({ message: 'Congratulations! These cats get along.' })    
                    } else {
                        selectedCats.forEach((catId) => {
                            const index = result.indexOf(catId);
                            if (index > -1) {
                                let newArr = result;
                                newArr.splice(index, 1)
                                setResult(newArr);
                            }
                        });
                        setFeedback({  message: 'Some of these cats already exists.' })
                    }
                    setSelectedCats([])
                } else {
                    setSelectedCats([])
                    setFeedback({  message: 'These cats do not get along.' })
                }
        } 
    }, [selectedCats])
    const onCatClick= (id: string) => {
        if (!selectedCats.includes(id)) {
            setSelectedCats([...selectedCats, id])
        } else {
            setSelectedCats([...selectedCats.filter(catId => catId !== id)])
        }
    }

    console.log(result);
    
    return( 
       <div className="catranchers-page">
            <div className="cats-container">
                {cats.map((item: any) => {
                    
                    return (<Card cat={item} handleCatSelection={onCatClick} key={item.id} selected={selectedCats.includes(item.id)} />)
                })}
             </div>

                <CatResultList result={result}/>

            {feedback && <Feedback message={feedback.message}/>}
       </div>
    );
}

export default CatRanchers;
