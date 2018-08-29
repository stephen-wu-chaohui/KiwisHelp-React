import axios from "axios";

export default {
    configure: (setting)=> {_settings = setting}
}

var _settings = {};  

export class APIClass {
    // get(apiName, path, init)
    // {
    //     let url = _settings.API.endpoints[0].endpoint + path;
    //     let data = {};
    //     axios.get(url, {...init, timeout: 1000, token: localStorage.token}).then(
    //         response => data = response.data,
    //         refuse => console.log(refuse)
    //     ).catch(e => console.log(e));
    //     return data;
    // }

    // post(apiName, path, input) {
    //     let url = _settings.API.endpoints[0].endpoint + path;
    //     let data = {};
    //     axios.post(url, input.body, { timeout: 1000, token: localStorage.token}).then(
    //         response => data = response,
    //         refuse => console.log(refuse)
    //     ).catch(e => console.log(e));
    //     return data;
    // }

    // put(apiName, path, input) {
    //     let url = _settings.API.endpoints[0].endpoint + path;
    //     let data = {};
    //     axios.put(url, input.body, { timeout: 1000, token: localStorage.token}).then(
    //         response => data = response,
    //         refuse => console.log(refuse)
    //     ).catch(e => console.log(e));
    //     return data;
    // }

    // del(apiName, path, init) {
    //     let url = _settings.API.endpoints[0].endpoint + path;
    //     axios.delete(url, {...init, timeout: 1000, token: localStorage.token});
    // }

    get(apiName, path, init) {
        return new Promise(function(resolve, reject) {
            let url = _settings.API.endpoints[0].endpoint + path;
            axios.get(url, {...init, timeout: 1000, token: localStorage.token })
                .then(response => resolve(response.data), reason => reject(reason));
        });        
    }

    post(apiName, path, input) {
        let url = _settings.API.endpoints[0].endpoint + path;
        return axios.post(url, input.body, { timeout: 1000, token: localStorage.token});
    }

    put(apiName, path, input) {
        let url = _settings.API.endpoints[0].endpoint + path;
        return axios.put(url, input.body, { timeout: 1000, token: localStorage.token});
    }

    del(apiName, path, init) {
        let url = _settings.API.endpoints[0].endpoint + path;
        axios.delete(url, {...init, timeout: 1000, token: localStorage.token});
    }
}

export const API = new APIClass();


export class AuthClass {

    signUp(params) {
        API.post('', '/auth/register', { body: params});
    }

    confirmSignUp(username, code, options){
    }

    signIn(username, password) {
        API.post('', '/auth/login', { body: {name: username, password}})
        .then(userData => {
            if (userData && userData.token) {
                localStorage.setItem('token', userData.token);
            }
        });
    }

    signOut() {
    }

    currentSession() {
    }
};

export const Auth = new AuthClass();