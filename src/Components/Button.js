import React from 'react';

function Button({ id, className, text, updateInput }){
    return (
        <div id={id} className={className} onClick={updateInput}>{text}</div>
    )
}

export default Button;
