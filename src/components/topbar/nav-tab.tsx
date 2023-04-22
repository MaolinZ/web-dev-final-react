import React, {ReactNode} from "react";
import {NavLink} from "react-router-dom";

export default function NavTab(props: {label?: string, to?: string, children?: any}) {

    const { label, to, children } = props

    return (
        <NavLink className={"transition ease-in-out delay-150 p-5 px-2" +
            " lg:px-4 text-medium lg:text-xl text-white border-transparent" +
            " border-b-4" +
            " inline-block "}
                 to={to ? to : ''}
                 style={({ isActive, isPending }) => {
                     return {
                         borderBottom: isActive && to !== '' ? "white 4px" +
                             " solid" : ""
                     };
                 }}
                 end>
            <>
                {label ? label.toUpperCase() : ''}
                {children ? <>{children}</> : ''}
            </>
        </NavLink>
    )

}