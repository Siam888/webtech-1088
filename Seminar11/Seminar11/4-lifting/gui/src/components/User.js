import React, { useState } from "react";
import './User.css'
import { PowerUser } from "./Exercise3/PowerUser";
import { RegularUser } from "./Exercise3/RegularUser";

export function User(props) {


    const { item, userType, onSelect } = props;

    function renderUser() {
        if (userType && item.type !== userType) {
            return null;
        }

        if (item.type === "regular-user") {
            return <RegularUser item={item} />;
        }

        if (item.type === "power-user") {
            return <PowerUser item={item} />;
        }

        return (
            <div className="user">
                <div className="username">{item.username}</div>
                <div className="fullName">{item.fullName}</div>
            </div>
        );
    }

    return (
        <div onClick={() => onSelect(item.id)}>
            {renderUser()}
        </div>

    );
}