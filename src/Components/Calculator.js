import React, {useState} from 'react';
import Display from './Display.js';
import Keypad from './Keypad.js';

function Calculator(){

    const [input, setInput] = useState(['0']);
    const [currNum, setCurrNum] = useState('');

    function updateInput(e){
        if (e.target.classList.contains('clear')) {
            clear();
        } else if (e.target.classList.contains('number')){
            handleNumClick(e)
        } else if (e.target.classList.contains('operator')){
            handleOpClick(e)
        };
    }

    function clear(){
        setInput(['0']);
        setCurrNum('')
    }

    function isFirstClick(){
        return input.length === 1 && input[0] === '0';
    }

    function lastInputType(indexFromEnd) {
        let type;
        if (!isNaN(input[input.length - 1 - indexFromEnd])) {
            type = "num";
        } else if (input[input.length - 1 - indexFromEnd] === ".") {
            type = "decimal";
        } else if (input[input.length - 1 - indexFromEnd] === "-") {
            type = "minus";
        } else if (isNaN(input[input.length - 1 - indexFromEnd])) {
            type = "other-op";
        }
        return type;
    }

    function handleNumClick(e){
        let newNum = currNum;
        let newInputArr = [...input];
        let thisInput = e.target.textContent;

        if (thisInput === '.'){
            if (!currNum.includes('.')){
                if (isFirstClick() || lastInputType(0) === 'num'){
                    newInputArr.push(thisInput);
                    newNum = isFirstClick() ? newNum.concat('0.') : newNum.concat('.')
                } else if (lastInputType(0) === 'minus' || lastInputType(0) === 'other-op') {
                    newInputArr.push('0');
                    newInputArr.push(thisInput);
                    newNum = newNum.concat('0.')
                }
            }
        } else {
            if (isFirstClick()){
                newInputArr.pop();
            }
            newInputArr.push(thisInput);
            newNum = newNum.concat(thisInput);
        }
        setCurrNum(newNum);
        setInput(newInputArr);
    }

    function handleOpClick(e){
        let newInputArr = [...input];
        let thisInput = e.target.textContent;

        if (lastInputType(0) !== 'decimal'){
            setCurrNum('');
        }
        if (thisInput === '-'){
            if (isFirstClick()) {
                newInputArr.pop();
            }
            if (lastInputType(0) === 'num' || (lastInputType(1) === 'num' && (lastInputType(0) === 'minus' || lastInputType(0) === 'other-op'))){
                newInputArr.push(thisInput)
            }
        } else if (thisInput !== '=') {
            if (!isFirstClick()){
                if (lastInputType(0) === 'num') {
                    newInputArr.push(thisInput)
                } else if (lastInputType(0) === 'minus' || lastInputType(0) === 'other-op'){
                    if (lastInputType(1) === 'minus' || lastInputType(1) === 'other-op'){
                        newInputArr.pop();
                    }
                    newInputArr.pop();
                    newInputArr.push(thisInput)
                }
            }
        }
        setInput(newInputArr);
        if (thisInput === '='){
            const isValid = lastInputType(0) === 'num';
            if (isValid){
                evaluate();
            }
        }
    }

    function evaluate(){
        let str = input.join('');
        let numbersArr = str.split(/\+|-|\*|\//).filter(e => !!e);
        let opsArr = str.split(/[0-9]|\./).filter(e => !!e).map(e => e === '+-' ? '-' : e === '--' ? '+' : e);

        if (opsArr.length === numbersArr.length){
            opsArr.shift();
            numbersArr[0] = `-${numbersArr[0]}`
        };

        opsArr = opsArr.map((e,i) => {
            if (e.length === 2){
                numbersArr[i+1] = `-${numbersArr[i+1]}`;
                return e.slice(0,1)
            };
            return e;
        });

        opsArr.unshift('+');
        let result = numbersArr.reduce((acc,n,i) => {
            let op = opsArr[i];
            let num = Number(n);
            switch(op){
                case '+': acc += num; break;
                case '-': acc -= num; break;
                case '*': acc *= num; break;
                case '/': acc /= num; break;
                default: return acc;
            };
            return acc;
        },0);

        result = Math.round(1000000000000 * result) / 1000000000000;
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
