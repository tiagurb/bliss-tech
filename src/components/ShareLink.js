import { useState } from "react";
import { shareLink } from "../api"
import { toast } from "react-toastify";

function ShareLink() {
    const [ email, setEmail ] = useState("");

    function handleInput(event) {
        setEmail(event.target.value.toLowerCase());
    }

    async function handleShareLink (event) {
        event.preventDefault();
        try {
            let contentUrl = window.location.href;
            let destinationEmail = email;
            await shareLink(destinationEmail, contentUrl);
        } catch (error) {
            toast.error("An error has occured", error.message);
        }
        toast.success("Email sent");
    }


    return (
        <>
            <h3>Share this with a friend:</h3>
            <form>
                <label htmlFor="email"/>
                <input className="input" placeholder="email address" type="email" name="email" onChange={handleInput}/>
                <button className="inputBtn" onClick={handleShareLink}>Share</button>
            </form>
        </>
    )
};

export default ShareLink