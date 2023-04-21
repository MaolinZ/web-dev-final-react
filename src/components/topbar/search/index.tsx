import React from "react";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {

    const searchParams = new URLSearchParams()
    const query = searchParams.get("query")
    const navigate = useNavigate()

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchTerm = (document.getElementById("search-field") as HTMLInputElement).value
            searchParams.set('query', searchTerm!)
            searchParams.set('page', '0')
            navigate(`/search?${searchParams.toString()}`)
            navigate(0)
        }
    }

    return (
        <input
            id="search-field"
            type="text"
            defaultValue={query!}
            className={"rounded-full py-1 px-4"}
            onKeyDown={(e) => {
                handleEnter(e)
            }}/>
    )
}