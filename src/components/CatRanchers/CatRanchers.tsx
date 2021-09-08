/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2020 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

import React ,{useState, useEffect} from 'react';
import './CatRanchers.scss';
import Card from '../Card';
import Feedback from '../Feedback';
import CatResultList from '../CatResultList';
import {getCats,checkValidSelection} from '../../datasource/service'
//import getCats from '../../service' //Manual
const CatRanchers = () => {
    const [cats, setCats] = useState([{id: '', image:''}]);
    const [selectedCats, setSelectedCats] =  useState<string[]>([]);
    const [feedback, setFeedback] =  useState<any | null>();
    const [result, setResult] = useState<string[]>([])

    const isValidSelection =  (selectedCats: any) =>{
       // const response = await checkValidSelection(selectedCats);
        const response = {valid: true};
        return response.valid;
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


    // useEffect(() => {
    //     if (selectedCats.length > 3 ) {
    //         setFeedback({message:'You need to  selected exactly 3 cats'});
    //     }
    //     if(selectedCats.length === 3) {
    //         console.log(isValidSelection(selectedCats));
    //         setFeedback(null);
    //         if(isValidSelection(selectedCats)) {
    //             selectedCats.forEach((id) => {
    //                 if(!result.includes(id)) {
    //                     setResult([...result,id])
    //                     setFeedback({ essage: 'Congratulations! These cats get along.' })    
    //                 } else {
    //                     setFeedback({ message: 'This clowder set already exists.' })
    //                 }
    //             } );    
    //     } else {
    //         setFeedback({  message: 'Oops! The cats dont get along.' })
    //     }
    // }
    // }, [selectedCats])

    useEffect(() => {
        if (selectedCats.length === 3) {
                setFeedback(null)
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
                        setFeedback({ heading: 'Congratulations!', message: 'These cats get along.' })    
                    } else {
                        selectedCats.forEach((catId) => {
                            const index = result.indexOf(catId);
                            if (index > -1) {
                                let newArr = result;
                                newArr.splice(index, 1)
                                setResult(newArr);
                            }
                        });
                        setFeedback({  message: 'This clowder set already exists.' })
                    }
                    setSelectedCats([])
                } else {
                    setSelectedCats([...selectedCats.slice(0, -1)])
                    setFeedback({  message: 'These cats do not get along.' })
                }
        } else {
            setFeedback({  message: 'Select only 3 cats.' })
        }
    }, [selectedCats])
    const onCatClick= (id: string) => {
        if (!selectedCats.includes(id)) {
            setSelectedCats([...selectedCats, id])
        } else {
            setSelectedCats([...selectedCats.filter(catId => catId !== id)])
        }
    }

    
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