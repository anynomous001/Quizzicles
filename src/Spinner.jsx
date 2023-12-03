
import { PropagateLoader } from 'react-spinners'; // Import the loader


export const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div>
                <PropagateLoader className='spinner' />
                <p>Loading questions...</p>
            </div>
        </div>
    );
}