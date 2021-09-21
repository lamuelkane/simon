
const Cartpaymentitem = (props) => {
    return (
        <>
            
                <div className="cartItem">
                        <img className="img" src={props.item.image} alt=""></img>
                    <div className="description">
                        <h5>{props.item.name}<small><sup>{props.item.option}</sup></small></h5>
                    </div>
                    <p className="cartItem-total">{`$${props.item.price.toFixed(2)} x ${props.item.amount} = ${"  "} $${(props.item.price * props.item.amount).toFixed(2)}`}</p>
                </div>
        </>
    );
}

export default Cartpaymentitem;