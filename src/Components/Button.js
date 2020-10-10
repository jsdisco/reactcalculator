import React from 'react';

function Button({ id, className, text, handleClicks }){
    return (
        <div id={id} className={className} onClick={handleClicks}>{text}</div>
    )
}

export default Button;
