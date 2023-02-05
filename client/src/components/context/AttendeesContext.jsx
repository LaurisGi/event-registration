import { createContext, useState } from "react";

export const AttendeesContext = createContext();

export const AttendeesContextWrapper = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleSetUser = (data) => setUser(data);

    return (
        <AttendeesContext.Provider value={{ user, setUser: handleSetUser }}>
            {children}
        </AttendeesContext.Provider>
    );
}