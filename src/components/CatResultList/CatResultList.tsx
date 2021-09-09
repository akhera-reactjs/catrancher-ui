import './catresult.scss';

interface CatResultProps {
    result: Array<string>
}
const CatResultList: React.FC<CatResultProps> = ({result}) => {
    const finalArray = new Array(12).fill('');
    if(result.length >  0) {
        for(let i=0; i<finalArray.length; i++) {
            finalArray[i] = result[i]
        }
    }
    console.log('final array', finalArray)

    return (
        
    
    <div className="results-container">
        {finalArray.map((cat) => 
               <div className="results-item" >
                   {cat ? <img className="result-item" src={`http://quantcats.herokuapp.com/static/cats/${cat}.png`}/>:
                   <div className="result-item"/>}
                </div>)
        }
     </div>
    )
}
   

export default CatResultList;