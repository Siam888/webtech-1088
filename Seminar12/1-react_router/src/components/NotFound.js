import { Link } from 'react-router-dom';

const NotFound = () => {


    return (
        <>
            <p>Page not found</p>
            <Link to={'/'}>Go To Home</Link>
        </>
    )
}

export default NotFound;