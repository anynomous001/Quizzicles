import './App.css'
import { PropagateLoader } from 'react-spinners'; // Import the loader


export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div>
                <PropagateLoader className='spinner' />
                <p>Loading questions...</p>
            </div>
        </div>
    );
}