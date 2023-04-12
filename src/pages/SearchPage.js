import { useParams } from "react-router-dom";


function SearchPage () {
    const { query } = useParams();


    return (
        <>
            <button type="submit" onClick={handleGoBack}>Go back to List</button>
        </>
    );
};

export default SearchPage
