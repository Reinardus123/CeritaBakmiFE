import {createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [customerToken, setCustomerToken] = useState(localStorage.getItem("customerToken"));
     const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));

    const loginCustomer = (token) => {
        localStorage.setItem("customerToken", token);
        setCustomerToken(token);
    };

    const logoutCustomer = () => {
        localStorage.removeItem("customerToken");
        setCustomerToken(null);
    };

     const loginAdmin = (token) => {
        localStorage.setItem("adminToken", token);
        setAdminToken(token);
    };

     const logoutAdmin = () => {
        localStorage.removeItem("adminToken");
        setAdminToken(null);
    };

    return (
        <AuthContext.Provider

            value={{
              adminToken,
              customerToken,
              loginCustomer,
              logoutCustomer,
              loginAdmin,
              logoutAdmin
            }}

        >
            {children}

        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}