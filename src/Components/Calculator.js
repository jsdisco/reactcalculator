import React, {useState} from 'react';
import Display from './Display.js';
import Keypad from './Keypad.js';

function Calculator(){

    const [input, setInput] = useState(['0']);

    function handleClicks(e){
        if (e.target.classList.contains('clear')) {
            clear();
        } else if (e.target.classList.contains('back')) {
            handleBackClick();
        } else if (e.target.classList.contains('number')){
            handleNumClick(e)
        } else if (e.target.classList.contains('operator')){
            handleOpClick(e)
        };
    }

    function clear(){
        setInput(['0']);
    }

    function handleBackClick(){
        let newInputArr = [...input];
        if(input.length > 1) {
            newInputArr.pop();
        } else if (input.length === 1 && input[0] !== '0'){
            newInputArr = ['0']
        };
        setInput(newInputArr)
    }

    function handleNumClick(e){
        let newInputArr = [...input];
        let thisInput = e.target.textContent;

        if (thisInput === '.'){
            if (!isCurrNumDecimal()){
                if (isFirstClick() || lastInputType(0) === 'num'){
                    newInputArr.push(thisInput);
                } else if (lastInputType(0) === 'minus' || lastInputType(0) === 'other-op') {
                    newInputArr.push('0');
                    newInputArr.push(thisInput);
                }
            }
        } else {
            if (isFirstClick()){
                newInputArr.pop();
            }
            newInputArr.push(thisInput);
        }
        setInput(newInputArr);
    }

    function handleOpClick(e){
        let newInputArr = [...input];
        let thisInput = e.target.textContent;

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

    function isCurrNumDecimal(){
        let inputArr = [...input];
        const loopThroughInput = (arr,n) => {
            if (lastInputType(n) === 'minus' || lastInputType(n) === 'other-op'){
                return false
            } else if (lastInputType(n) === 'num'){
                arr.pop();
                n += 1;
                return loopThroughInput(arr,n)
            } else if (lastInputType(n) === 'decimal'){
                return true;
            }
        };
        return loopThroughInput(inputArr,0);
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
        let newInputArr = result.toString().split('');
        setInput(newInputArr);
    }

    const display = input.join('');

    return (
        <div id="calculator">
            <Display display={display}/>
            <Keypad handleClicks={handleClicks} />
        </div>
    )
}

export default Calculator;
