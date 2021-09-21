import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const Totop = () => {
    return (
        <>
            <div className="totop pointer" onClick={e => window.scrollTo({
                top:0,
                behavior: 'smooth'
            })}>
                <ArrowUpwardIcon />
            </div>
        </>
    );
}

export default Totop;