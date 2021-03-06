import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {

    //State
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    //Hooks
    const navigate = useNavigate();

    //Action and Helpers
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    // const postData = async () => {
    //     const response = await fetch(
    //         `${process.env.REACT_APP_API_URL}api-token-auth/`,
    //         {
    //           method: "post",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify(credentials),
    //         }
    //       );
    //       return response.json
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}users/authenticate/`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
              }
            );
            const data = await response.json();
            console.log("data", data);
            window.localStorage.setItem("token", data.token);
            navigate(`/users/${data.id}`);
          } catch (err) {
            console.log(err);
          }
        }
      };

            

    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                        type="text"
                        id="username"
                        placeholder="Enter Username"
                        onChange={handleChange}
                        />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Login
            </button>
            <button><Link to="/">Return to Home</Link></button>


            <br></br>

            <div>
              <h3> Don't have an account? <br></br> <button><Link to="/users/register/">Register Here</Link></button> </h3>               
            </div>

        </form>
    );
}
export default LoginForm;