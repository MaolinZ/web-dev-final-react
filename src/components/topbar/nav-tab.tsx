import React from "react";
import {NavLink} from "react-router-dom";

export default function NavTab(props: {label: string, to: string}) {

    return (
        <NavLink className={"transition ease-in-out delay-150 pb-5 px-4" +
            " text-white border-white text-lg hover:border-b-4"} to={props.to}
                 style={({ isActive, isPending }) => {
                     return {
                         borderBottom: isActive ? "white 4px solid" : ""
                     };
                 }}
                 end>

            {props.label.toUpperCase()}
        </NavLink>
    )

}