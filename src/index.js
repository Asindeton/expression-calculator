function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr){
    let arr = [];;
    expr.split('').map(e => e !== ' '? arr.push(e): false)

    let topArr = concat(arr);
    
    let qwer = [];
    arr.join('').split(/\d/).map(e => qwer.push(e.split('')))
    qwer = flatten(qwer)
    let asd = flatten(topArr.map(e => e.split('')));
    console.log(asd)
    console.log(asd)
    console.log(asd.indexOf('(')+1, asd.indexOf(')'))
    console.log(concat(asd.slice(asd.indexOf('(')+1, asd.indexOf(')'))))
    let delLength = asd.slice(asd.indexOf('(')+1, asd.indexOf(')')).length;

    let answerBrackets = `${calculate(concat(asd.slice(asd.indexOf('(')+1, asd.indexOf(')'))))}`;
    console.log(answerBrackets)
    let testArr = asd.splice(asd.indexOf('('), delLength+2, answerBrackets)
    console.log(topArr)

    let zxc = []
    console.log(asd.join('').split(/(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/).map(e => e !== '' ? zxc.push(e):false))
    console.log(zxc)
    console.log(concat(asd))
    let brackets = 0;
    qwer.map(e => e == '('? brackets+=1 : e == ')'? brackets-=1:false)
    if(brackets !== 0){
        throw new Error("ExpressionError: Brackets must be paired")
    }
    
    if(qwer.includes('(') || qwer.includes(')')){
        return calculate(concat(asd))
    } else {
        return calculate(topArr)
    }


}

function calculate(arr){
    let answer = 0;
    for(let i = 0; i < arr.length; i++){
        if(i == 0){
            answer = arr[i];
        }
        if(arr.includes('*') || arr.includes('/')){
            if(arr[i] == '*'){
                answer = multiply(Number(arr[i-1]), Number(arr[i+1]))
                arr.splice(i-1, 3, answer)
                i = 0;
            }
            if(arr[i] == '/'){
                answer = division(Number(arr[i-1]), Number(arr[i+1]))
                arr.splice(i-1, 3, answer)
                i = 0;
            }
        } else {
            if(arr[i] == '+'){
                answer = plus(Number(arr[i-1]), Number(arr[i+1]))
                arr.splice(i-1, 3, answer)
                i = 0;
            }
            if(arr[i] == '-'){
                answer = minus(Number(arr[i-1]), Number(arr[i+1]))
                arr.splice(i-1, 3, answer)
                i = 0;
            }
        }

        /* console.log(arr.join('')) */
    }
    return answer

}

function concat(arr){
    let arrNumb = [];
    let arrPlus = [];
    let topArr = [];
    arr.join('').split(/\D/).map(e => e !== ''? arrNumb.push(e): false)
    arr.join('').split(/\d/).map(e => e !== ''? arrPlus.push(e): false)
    let calcLength = arrNumb.length + arrPlus.length;
    for(let i = 0; i < calcLength; i++){
        i%2 == 0 ? topArr.push(arrNumb.shift()) : topArr.push(arrPlus.shift());
    }
    return topArr;
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