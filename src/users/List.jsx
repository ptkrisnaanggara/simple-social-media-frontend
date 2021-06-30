import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService, alertService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    // const [email, setEmail] = useState(email);


    useEffect(() => {
        console.log(localStorage.getItem('email'))
        userService.getAll({email:localStorage.getItem('email')}).then(x => {
            setUsers(x.friends);
        })
        .catch(alertService.error);
        // console.log(users)
    }, []);

    function blockUser(id) {
        // setUsers(users.map(x => {
        //     if (x === id) { x.isDeleting = true; }
        //     return x;
        // }));
        userService.block(id).then(() => {
            setUsers(users => users.filter(x => x !== id));
        });
    }

    return (
        <div>
            <h1>Friend List</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Friend Request</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user}>
                            <td>{user}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/list/${user}`} className="btn btn-sm btn-primary mr-1">Friends</Link>
                                <button onClick={() => blockUser(user)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Block</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Friends To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };