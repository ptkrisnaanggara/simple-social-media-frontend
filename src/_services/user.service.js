import config from 'config';
import { fetchWrapper } from '@/_helpers';

// const baseUrl = `${config.apiUrl}/users`;
const baseUrl = `http://localhost:8000/api`;

export const userService = {
    getAll,
    getById,
    create,
    update,
    accept,
    reject,
    getRequest,
    block,
    delete: _delete
};

function getAll(params) {
    return fetchWrapper.post(baseUrl+'/listFriend', params);
}

function getRequest() {
    return fetchWrapper.post(baseUrl+'/listRequest', {'email' : localStorage.getItem('email')});
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    // console.log('data', params.email);
    return fetchWrapper.post(baseUrl+'/friendRequest', {'requestor' : localStorage.getItem('email'), 'to':params.email});
}

function block(params) {
    return fetchWrapper.post(baseUrl+'/blockUser', {'requestor' : localStorage.getItem('email'), 'block':params});
}

function accept(params) {
    return fetchWrapper.post(baseUrl+'/acceptRequest', {'to' : localStorage.getItem('email'), 'requestor':params});
}

function reject(params) {
    return fetchWrapper.post(baseUrl+'/rejectRequest', {'to' : localStorage.getItem('email'), 'requestor':params});
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
