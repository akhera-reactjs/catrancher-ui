
import "./card.scss";
interface CatProps {
    cat: any,
    selected: boolean,
    handleCatSelection: (id: string) => void
}

const Card: React.FC<CatProps> = ({ cat, selected, handleCatSelection }) => {
    return (
        <div onClick={() => handleCatSelection(cat.id)} className={`cat-item ${selected? "selected": ""}`}>
            <img src={cat.image} alt={`${cat.id} cat`} className="img-thumbnail"/>
        </div>
    );
}

export default Card;