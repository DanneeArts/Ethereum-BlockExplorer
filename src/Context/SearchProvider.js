import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <SearchContext.Provider value = {{searchTerm, setSearchTerm}}>
            {children}
        </SearchContext.Provider>
    )
}

export { SearchContext, SearchProvider};