export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    };

    function handleClick() {
        props.hold(props.id);
    }

    return (
        <button
            style={styles}
            onClick={handleClick}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? 'held' : 'not held'}`}
        >
            {props.value}
        </button>
    );
}
