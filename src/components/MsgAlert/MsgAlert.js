import React from 'react';

const msgAlert = (props) => {
    const msgAlertClass = `alert ${props.typeAlert}`
    return (
        <div className={msgAlertClass} role="alert">
            {props.children}
        </div>
    )
}


export default msgAlert