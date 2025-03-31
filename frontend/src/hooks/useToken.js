import { useState } from "react";

// this func is only used to init setToken state
const getToken = (initValue) => {
  // return token if one already exists, else return passed val
  const storedToken = JSON.parse(sessionStorage.getItem("token"));
  if (storedToken) return storedToken;
  if (initValue instanceof Function) return initValue();  // accept functions behave like useState func
  return initValue;
}

// this func will be called on every App.js render
export default function useToken(initValue) { 
  const [token, setToken] = useState(() => getToken(initValue));

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken); // getToken
  }

  return { token, setToken: saveToken };

}