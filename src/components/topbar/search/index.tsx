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
        <div className={'inline-flex items-center h-9'}>
            <input
                id="search-field"
                type="text"
                defaultValue={query!}
                placeholder={'Search'}
                className={"rounded-l-full pl-5 w-52 h-full"}
                onKeyDown={(e) => {
                    handleEnter(e)
                }}/>
            <label
                className={`inline-flex switch-box rounded-r-full bg-black w-50 text-xs pl-2 pr-4 h-full
                items-center hover:cursor-pointer hover:bg-green-700 w-16 m-auto text-white select-none`}
                htmlFor={'search-switch'}>
                {userToggle ? 'USERS' : 'SONGS'}
            </label>
            <input
                className={'hidden'}
                id='search-switch'
                type="checkbox"
                defaultChecked={userToggle}
                onClick={() => {
                    setUserToggle(!userToggle)
                }}/>
        </div>
    )
}