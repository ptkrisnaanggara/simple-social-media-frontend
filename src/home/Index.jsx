import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService, alertService } from '@/_services';

function Home() {
    const [email, setEmail] = useState(null);

    // useEffect(() => {
    //     setEmail('demo@email.com')
    // }, []);

    function onInputchange(event) {
        // this.setState({
        //   [event.target.name]: event.target.value
        // });
        setEmail(event.target.value)
        localStorage.setItem('email', event.target.value);
        console.log(event.target.value);
    }

    return (
        <div>
           <div className="card col-md-6 m-auto">
                <div className="card-body">
                    <h5>Please Enter your Email First to Continue the process</h5>
                    <div className="form-group">
                        <input
                        name="email"
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={onInputchange}
                        />
                    </div>
                    <Link to="friends" className={`btn btn-success ${email ? '' : 'disabled'}`}>Next</Link>
                </div>

           </div>
           
            {/* <h1>React - CRUD Example with React Hook Form</h1>
            <p>An example app showing how to list, add, edit and delete user records with React and the React Hook Form library.</p> */}
            {/* <p><Link to="friends">&gt;&gt; Manage Friends</Link></p> */}
        </div>
    );
}

export { Home };