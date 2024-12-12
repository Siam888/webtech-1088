import React from 'react'


export function UserDetail(props) {

    const { onCancel, item } = props

    return (
        <>
            <h3>
                {item.username}
            </h3>
            <h3>
                {item.fullName}
            </h3>
            <h3>
                {item.type}
            </h3>
            <button onClick={() => onCancel()}>
                Back
            </button>
        </>
    )
}