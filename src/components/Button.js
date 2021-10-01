import React from 'react';

function Button({name,onClick,disabled}){

    return(
<>
        <button className="button" name={name} type="button" onClick={onClick} disabled={disabled}>
            {name}
        </button>
</>

    )

}

export default Button;