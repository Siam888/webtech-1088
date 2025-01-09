import { useNavigate } from "react-router";

const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <p>Home</p>
            <button onClick={() => navigate('/tasks')}>Go To Tasks</button>
            {/* Ex1. */}
            <button onClick={() => navigate('/about')}>Go To About</button>
        </>
    )
}

export default Home;