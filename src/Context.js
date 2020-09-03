import React, {useState, createContext} from 'react'

export const DataContext = createContext()

export const DataProvider = (props) => {

    const [search, setSearch] = useState("")

    

    return(
        <DataContext.Provider value={{search,setSearch}}>
            {props.children}
        </DataContext.Provider>
    )
}