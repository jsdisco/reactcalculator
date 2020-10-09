import React, {useState} from 'react';
import Display from './Display.js';
import Keypad from './Keypad.js';

function Calculator2(){

    const [input, setInput] = useState(['0']);
    const [currNum, setCurrNum] = useState('0');
    const [currOp, setCurrOp] = useState('');
    //const [values, setValues] = useState([]);

    function clear(){
        setInput(['0']);
        //setValues([]);
        setCurrNum('0');
        setCurrOp('');
    }

    function evaluate(){
        //let currValues = [...values];
        //currValues.push(currNum);
        //console.log(currValues)
    }

    function handleNumClick(e){
        let newCurrNum;
        if (e.target.id === 'decimal'){
            if (currNum === ''){
                setCurrNum('0');
            }
            newCurrNum = currNum.concat(e.target.textContent).toString();
        } else {
            newCurrNum = parseFloat(currNum.concat(e.target.textContent)).toString();
        }
        setCurrNum(newCurrNum);

        if (currOp.length > 0){
            //let newValues = [...values];
            //newValues.push(currOp);
            //setValues(newValues);
            setCurrOp('')
        }
    }

    function handleOpClick(e){
        let newCurrOp = e.target.textContent;
        if (currOp.length === 0) {
            setCurrOp(newCurrOp);

            //let newValues = [...values];
            //newValues.push(currNum);
            //setValues(newValues);

        }  else if (currOp.length === 1 && newCurrOp === '-'){
            //let newValues = [...values];
            //newValues.push(newCurrOp);
            //setValues(newValues);
        }
        setCurrNum('0');



        if (e.target.id === 'equals'){
            evaluate();
        }
    }

    function updateInput(e){
        if (e.target.classList.contains('clear')) {
            clear();
            return;
        };

        if (e.target.classList.contains('number')){
            handleNumClick(e)
        } else if (e.target.classList.contains('operator')){
            handleOpClick(e)
        };
/*
        let newInput;
        if (input.length === 1 && input[0] === '0' && e.target.id !== 'decimal'){
            // only first input
            newInput = [e.target.textContent]
        } else {
            // all following inputs
            newInput = [...input];
            // insert zero before decimal
            if (e.target.id === 'decimal' && isNaN(newInput[newInput.length-1])) {
                newInput.push('0')
            };
            // replace previous operator on repeating operator clicks, unless minus was clicked
            if (e.target.classList.contains('operator') && isNaN(newInput[newInput.length-1]) && e.target.id !== 'subtract') {
                if (newInput[newInput.length-1] === '-'){
                    newInput.pop();
                    newInput.pop();
                } else {
                    newInput.pop();
                }
            } else if (e.target.classList.contains('operator') && isNaN(newInput[newInput.length-1]) && e.target.id === 'subtract'){
                if (newInput[newInput.length-1] === '-' && newInput[newInput.length-2] === '-') {
                    newInput.pop();
                } else if (newInput[newInput.length-1] === '-' && newInput[newInput.length-2] !== '-'){
                    newInput.pop();
                    newInput.pop();
                }
            }

            newInput.push(e.target.textContent);
        }
        setInput(newInput);*/
    }

    const display = input.join('');

    return (
        <div id="calculator">
            <Display display={display}/>
            <Keypad updateInput={updateInput} />
        </div>
    )
}

export default Calculator2;
