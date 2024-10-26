import React, { createContext, useState } from 'react';

const UserContext = createContext();

function CurrentUser({ children }) {
    const [username, setUsername] = useState('fail');
    const [userId, setUserId] = useState(-1);

    const value = { 
        username, setUsername,
        userId, setUserId,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, CurrentUser };
export default CurrentUser; // Ensure this is the default export
