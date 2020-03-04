function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr){
    let arr = [];
    let arrNumb = [];
    let arrPlus = [];
    let topArr =[];
    let answer = 0;
    expr.split('').map(e => e !== ' '? arr.push(e): false)


    arr.join('').split(/\D/).map(e => e !== ''? arrNumb.push(e): false)
    arr.join('').split(/\d/).map(e => e !== ''? arrPlus.push(e): false)
    let calcLength = arrNumb.length + arrPlus.length;
    for(let i = 0; i < calcLength; i++){
        i%2 == 0 ? topArr.push(arrNumb.shift()) : topArr.push(arrPlus.shift());
    }
    
    let qwer = [];
    arr.join('').split(/\d/).map(e => qwer.push(e.split('')))
    qwer = flatten(qwer)
    console.log(qwer);
    console.log(topArr)

    let brackets = 0;
    qwer.map(e => e == '('? brackets+=1 : e == ')'? brackets-=1:false)
    if(brackets !== 0){
        throw new Error("ExpressionError: Brackets must be paired")
    }

    for(let i = 0; i < topArr.length; i++){
        if(i == 0){
            answer = topArr[i];
        }
        if(topArr.includes('*') || topArr.includes('/')){
            if(topArr[i] == '*'){
                answer = multiply(Number(topArr[i-1]), Number(topArr[i+1]))
                topArr.splice(i-1, 3, answer)
                i = 0;
            }
            if(topArr[i] == '/'){
                answer = division(Number(topArr[i-1]), Number(topArr[i+1]))
                topArr.splice(i-1, 3, answer)
                i = 0;
            }
        } else {
            if(topArr[i] == '+'){
                answer = plus(Number(topArr[i-1]), Number(topArr[i+1]))
                topArr.splice(i-1, 3, answer)
                i = 0;
            }
            if(topArr[i] == '-'){
                answer = minus(Number(topArr[i-1]), Number(topArr[i+1]))
                topArr.splice(i-1, 3, answer)
                i = 0;
            }
        }

        /* console.log(topArr.join('')) */
    }
    console.log(answer)
    return answer
}

function plus(val1, val2){
    return val1 + val2
}

function multiply(val1, val2){
    return val1 * val2
}

function division(val1, val2){
    if(val2==0){
        throw new Error("TypeError: Division by zero.")
    }
    return val1 / val2
}

function minus(val1, val2){
    return val1 - val2
}

function flatten(array) {
    var flattend = [];
    (function flat(array) {
      array.forEach(function(el) {
        if (Array.isArray(el)) flat(el);
        else flattend.push(el);
      });
    })(array);
    return flattend;
  }

module.exports = {
    expressionCalculator
}