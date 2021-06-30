import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService, alertService } from '@/_services';

function Request({ match }) {
    const { path } = match;
    const [requests, setRequests] = useState(null);

    useEffect(() => {
        userService.getRequest().then(x => {
            setRequests(x.requests);
        })
        .catch(alertService.error);
    }, []);

    function reject(id) {
        userService.reject(id).then(() => {
            setRequests(requests => requests.filter(x => x.requestor !== id));
        });
    }

    function accept(id) {
        userService.accept(id).then(() => {
            setRequests(requests => requests.filter(x => x.requestor !== id));
        });
    }

    return (
        <div>
            <h1>Request List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Requestor</th>
                        <th style={{ width: '30%' }}>Status</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {requests && requests.map(user =>
                        <tr key={user.requestor}>
                            <td>{user.requestor}</td>
                            <td>{user.status}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button onClick={() => reject(user.requestor)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.status != 'pending'}>
                                <span>Reject</span>
                                </button>
                                <button onClick={() => accept(user.requestor)} className="ml-2 btn btn-sm btn-success" disabled={user.status != 'pending'}>
                                    <span>Accept</span>
                                </button>
                                
                            </td>
                        </tr>
                    )}
                    {!requests &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {requests && !requests.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Request To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { Request };