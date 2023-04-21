import React from "react";

export default function Stat(props: {title: string, value?: string | number}) {
    const { title, value } = props

    return(
        <div className={'rounded bg-spotify-dark w-56 p-4 shadow-md'}>
            <h1 className={'text-white font-medium text-3xl'}>{value ? value : '--'}</h1>
            <h1 className={'text-gray-500'}>{title}</h1>
        </div>
    )
}