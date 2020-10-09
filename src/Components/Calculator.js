import React, {useState} from 'react';
import Display from './Display.js';
import Keypad from './Keypad.js';
import { create, all } from "mathjs";

function Calculator(){

    const config = {
          epsilon: 1e-12,
          matrix: "Matrix",
          number: "number",
          precision: 64,
          predictable: false,
          randomSeed: null
        };
    const math = create(all, config);


    const [input, setInput] = useState(['0']);
    const [currNum, setCurrNum] = useState('0');

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
    }

    function clear(){
        setInput(['0']);
        setCurrNum('0');
    }

    function isFirstClick(){
        return input.length === 1 && input[0] === '0';
    }

    function lastInputType(index){
        let type;
        if (!isNaN(input[input.length-1-index])) {
            type = 'num'
        } else if (input[input.length-1-index] === '.'){
            type = 'decimal'
        } else if (input[input.length-1-index] === '-') {
            type = 'minus'
        } else if (isNaN(input[input.length-1-index])){
            type = 'other-op'
        };
        return type;
    }


    function handleNumClick(e){
        let newInput = [...input];
        let thisInput = e.target.textContent;

        if (thisInput === '.'){
            if (!currNum.includes('.')){
                if (isFirstClick() || lastInputType(0) === 'num'){
                    newInput.push(thisInput);
                    setCurrNum(prev => prev.concat('0').concat(thisInput))
                } else if (lastInputType(0) === 'other-op') {
                    newInput.push('0');
                    newInput.push(thisInput);
                    setCurrNum(prev => prev.concat('0').concat(thisInput))
                }
            }
        } else {
            if (isFirstClick()){
                newInput.pop();
            }
            newInput.push(thisInput);
            setCurrNum(prev => prev.concat(thisInput))
        }
        setInput(newInput);
    }

    function handleOpClick(e){
        let newInput = [...input];
        let thisInput = e.target.textContent;

        if (lastInputType(0) !== 'decimal'){
            setCurrNum('0');
        }
        if (thisInput === '-'){
            if (isFirstClick()) {
                newInput.pop();
            }
            if (lastInputType(0) === 'num' || (lastInputType(1) === 'num' && (lastInputType(0) === 'minus' || lastInputType(0) === 'other-op'))){
                newInput.push(thisInput)
            }
            setInput(newInput);
        } else if (thisInput !== '=') {
            if (!isFirstClick()){
                if (lastInputType(0) === 'num') {
                    newInput.push(thisInput)
                } else if (lastInputType(0) === 'other-op' || lastInputType(0) === 'minus'){
                    if (lastInputType(1) === 'other-op' || lastInputType(1) === 'minus'){
                        newInput.pop();
                    }
                    newInput.pop();
                    newInput.push(thisInput)
                }
            };
            setInput(newInput)
        } else if (thisInput === '='){
            setInput(newInput);
            evaluate();
        }
    }

    function evaluate(){
        const str = input.join('');
        const result = math.evaluate(str);
        setInput([result]);
        setCurrNum(result.toString());
    }


    const display = input.join('');

    return (
        <div id="calculator">
            <Display display={display}/>
            <Keypad updateInput={updateInput} />
        </div>
    )
}

export default Calculator;
