import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {

    const searchParams = new URLSearchParams(window.location.search)
    const query = searchParams.get("query")
    const type = searchParams.get("type")
    const [userToggle, setUserToggle] = useState(type === '1')
    const navigate = useNavigate()

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchTerm = (document.getElementById("search-field") as HTMLInputElement).value
            const checked = (document.getElementById('search-switch') as HTMLInputElement).checked
            if (searchTerm !== '' || checked) {
                searchParams.set('query', searchTerm!)
                searchParams.set('page', '0')
                searchParams.set('type', checked ? '1' : '0')
                navigate(`/search?${searchParams.toString()}`)
                navigate(0)
            }
        }
    }

    return (
        <div>
            <input
                id="search-field"
                type="text"
                defaultValue={query!}
                className={"rounded-full py-1 px-4"}
                onKeyDown={(e) => {
                    handleEnter(e)
                }}/>
            <label className={'text-white'}
                   htmlFor="search-switch">User?</label>
            <input
                id='search-switch'
                type="checkbox"
                defaultChecked={type === '1'}/>
        </div>
    )
}