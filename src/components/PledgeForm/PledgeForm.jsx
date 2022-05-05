import React, { useState } from "react";

// imports 
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


// function PledgeForm({ projectId }) {

//     //state
//     const token = window.localStorage.getItem("token");
//     const [pledge, setPledge] = useState({
//         amount: "",
//         comment: "",
//         anonymous: "",
//     });

    //actions and helpers
    // const handleChange = (event) => {
    //     const { id, value} = event.target;
    //     setPledge((prevPledge) => ({
    //         ...prevPledge,
    //         [id]: value,
    //     }));
    // };

function PledgeForm(pledgeData) {
        //state
    const [pledge, postPledge] = useState(
         pledgeData.map
    );
        
    // Hooks
    const { id } = useParams();
    const navigate = useNavigate();
    

    //actions and helpers
    const handleChange = (event) => {
     const { id, value } = event.target;
     postPledge((PledgeData) => ({
         ...PledgeData,
        [id]: value,
     }));
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const token = window.localStorage.getItem("token");
        console.log("handleSubmit", pledge, token)

    // only will post the pledge if the user is logged in( have a token)
        if (token && pledge.amount && pledge.comment) {

            try {
             const res = await fetch (
                 `${process.env.REACT_APP_API_URL}pledges`,
              {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    project_id: parseInt(id),
                    amount: parseInt(pledge.amount), 
                    anonymous: pledge.anonymous,  
                    comment: pledge.comment 
                    // supporter: pledge.supporter              
                }),  
              }                     
            );
            const data = await res.json();
            console.log(data);
            //This is how you navigate automatically 
            navigate(`/project/${id}`);
        } catch (err) {
            console.log(err);
        }
       }        
    };

    // if (!token) {
    //     return <Link to="/login">Login to Pledge</Link>
    // }



    return (
        <form>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Enter Pledge Amount"
                    onChange={handleChange} 
                    />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="Enter comment here"
                    onChange={handleChange} 
                    />
            </div>
            <div>
                <label htmlFor="anonymous">Anonymous:</label>
                <select                    
                    id="anonymous" onChange={handleChange}>
                    <option value="">-- Please choose an option ---</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                    </select>                
                    
            </div>
            <button type="submit" onClick={handleSubmit}>Submit Pledge</button>
        </form>
    );
}

export default PledgeForm;