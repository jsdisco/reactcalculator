import React from 'react';
import Button from './Button.js';

function Keypad( {updateInput }){

    const btns = [
        {
            id:'seven',
            class:'number',
            text:'7'
        },
        {
            id:'eight',
            class:'number',
            text:'8'
        },
        {
            id:'nine',
            class:'number',
            text:'9'
        },
        {
            id:'clear',
            class:'clear',
            text:'C'
        },
        {
            id:'four',
            class:'number',
            text:'4'
        },
        {
            id:'five',
            class:'number',
            text:'5'
        },
        {
            id:'six',
            class:'number',
            text:'6'
        },
        {
            id:'add',
            class:'operator',
            text:'+'
        },
        {
            id:'subtract',
            class:'operator',
            text:'-'
        },
        {
            id:'one',
            class:'number',
            text:'1'
        },
        {
            id:'two',
            class:'number',
            text:'2'
        },
        {
            id:'three',
            class:'number',
            text:'3'
        },
        {
            id:'multiply',
            class:'operator',
            text:'*'
        },
        {
            id:'divide',
            class:'operator',
            text:'/'
        },
        {
            id:'zero',
            class:'number',
            text:'0'
        },
        {
            id:'decimal',
            class:'number',
            text:'.'
        },
        {
            id:'equals',
            class:'operator',
            text:'='
        },
    ]


    return (
        <div id="keypad">
            {btns.map((btn,i) => {
                return <Button key={i}
                    id={btn.id}
                    className={`button ${btn.class}`}
                    text={btn.text}
                    updateInput={updateInput}/>
            })}
        </div>
    )
}

export default Keypad;
