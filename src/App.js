import React, { useEffect,useState  } from 'react';
import axios from 'axios';
import { AuthenticatedTemplate , useMsal, useMsalAuthentication } from "@azure/msal-react";

import {loginRequest} from './authConfig';

function GetData(){
    const { instance,accounts } = useMsal();
    
    
}

function App() {
   // const [token, setToken] = useState(0);
    const { login, result, error } = useMsalAuthentication("redirect", loginRequest);
    const { instance,accounts } = useMsal();
    
    console.log(accounts);
    if(accounts.length>0){
        instance.setActiveAccount(accounts[0]);
         const loginRequest = {
            scopes: ["api://693e1f87-8381-4d96-b35d-9ad141f7d587/app-read","User.Read"]
        };
    instance.acquireTokenSilent(loginRequest).then(response=>{
       
        const config = {
            headers: {'Authorization': `Bearer ${response.accessToken}`,'contentType':'application/json','Access-Control-Allow-Origin':"*"}

        };

        axios.get('https://localhost:44304/api/values',config)
                .then(function (response) {
                    // handle success
                    console.log(response);
                }).catch(x=>{console.log(x);});

    });
    }
    useEffect(() => {
        if (error) {
            login("redirect", loginRequest);
        }
    }, [error]);

   

    return (
        <React.Fragment>
            <AuthenticatedTemplate>
                <p>Signed in as: {accounts[0]?.username}</p>
                <button onClick={GetData}>Get Data</button>
            </AuthenticatedTemplate>
        </React.Fragment>
    );
}

export default App;