
function expressionCalculator(expr) {
    
    let prioritySigns = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    let exprString = expr.split(' ').join('');

    let outsideArray = [];
    let exprNumerals = '';

    
    let mainArray = [];
    
    
    exprString.split('').forEach(elem => {
        if (!isNaN(elem)) {
            exprNumerals += elem;
        } else {
            if (exprNumerals.length > 0) {
                outsideArray.push(exprNumerals); 
                exprNumerals = '';
            }
            
            if (elem === '(') {
                mainArray.push(elem);
            } else if (elem === ')') {
                while(mainArray.length != 0 && mainArray[mainArray.length - 1] !== '(')
                    outsideArray.push(mainArray.pop());
                
                if (mainArray.length === 0) {
                    throw new Error('ExpressionError: Brackets must be paired');
                } else {
                    mainArray.pop();			
                }
            } else {
                while(mainArray.length != 0 && prioritySigns[elem] <= prioritySigns[mainArray[mainArray.length - 1]]) {
                    if (mainArray[mainArray.length - 1] === '(')
                        throw new Error('ExpressionError: Brackets must be paired');		
                    outsideArray.push(mainArray.pop());
                }
                mainArray.push(elem);
            }
        }
    });
    
    if (exprNumerals.length > 0) {
        outsideArray.push(exprNumerals); 
    }


    while (mainArray.length != 0) {
        let brackets = mainArray.pop();
        if (brackets === '(')
            throw new Error('ExpressionError: Brackets must be paired');
        outsideArray.push(brackets);
    }
    
    outsideArray.forEach(elem => {
        if (!isNaN(elem)) {
            mainArray.push(elem);
        } else {
            let primaryV = parseFloat(mainArray.pop());
            let secondaryV = parseFloat(mainArray.pop());
            
            if (elem === '+') {
                mainArray.push(secondaryV + primaryV);
            } else if (elem === '-') {
                mainArray.push(secondaryV - primaryV);
            } else if (elem === '/') {
                if (primaryV === 0)
                    throw new Error('TypeError: Division by zero.');
                mainArray.push(secondaryV / primaryV);
            } else if (elem === '*') {
                mainArray.push(secondaryV * primaryV)
            }
        }
    });


    return mainArray.pop();
}


module.exports = {
    expressionCalculator
}