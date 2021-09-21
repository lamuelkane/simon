import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';


export default function Rating(props) {

  return (
      <div className={`flex column`}>
        <div className=" flex justify-center align-center">
        <span>
        {
                props.value >= 1
                ? <div className="rating">
                    <StarIcon />
                </div>
                : props.value >= 0.5
                ?<div className="rating">
                    <StarHalfIcon />
                </div>
                : <StarIcon />
            }
        </span>
        <span>
        {
                props.value >= 2
                ? <div className="rating">
                    <StarIcon />
                </div>
                : props.value >= 1.5
                ?<div className="rating">
                    <StarHalfIcon />
                </div>
                : <StarIcon />
            }
        </span>
        <span>
        {
                props.value >= 3
                ? <div className="rating">
                    <StarIcon />
                </div>
                : props.value >= 2.5
                ?<div className="rating">
                    <StarHalfIcon />
                </div>
                : <StarIcon />
            }
        </span>
        <span>
        {
                props.value >= 4
                ? <div className="rating">
                    <StarIcon />
                </div>
                : props.value >= 3.5
                ?<div className="rating">
                    <StarHalfIcon />
                </div>
                : <StarIcon />
            }
        </span>
        <span>
        {
                props.value >= 5
                ? <div className="rating">
                    <StarIcon />
                </div>
                : props.value >= 4.5
                ?<div className="rating">
                    <StarHalfIcon />
                </div>
                : <div className="transparent">
                        <StarIcon />
                    </div>
            }
        </span>
        </div>
        <div>
            <span>{props.text ? ` ${props.text} ${ props.text === 1?"review": `${'reviews'}`} ` : ''}</span>
        </div>    
    </div>
  );
}
