export default (string) => {

  const getOpArr = str => str.match(/(([0-9.]+)|([()/x+-]))/g);
  const operation = operator => arr => {
    let i = arr.indexOf(operator);
    let item;
    switch (operator) {
      case "/":
        item = Number(arr[i - 1]) / Number(arr[i + 1]);
        break;
      case "x":
        item = Number(arr[i - 1]) * Number(arr[i + 1]);
        break;
      case "+":
        item = Number(arr[i - 1]) + Number(arr[i + 1]);
        break;
      case "-":
        item = Number(arr[i - 1]) - Number(arr[i + 1]);
        break;
      default:
        throw new Error('Operator is not defined!');
    }
    arr.splice(i - 1, 3, item)
    return arr
  }

  const division = operation("/")
  const multiplication = operation("x")
  const addition = operation("+")
  const subtraction = operation("-")

  const calculateWithParanthesis = arr => {
    let openParanId = arr.indexOf('(');
    let closeParanId = 0;
    let paranNumber = 1;
    for (let i = openParanId + 1; i < arr.length; i++) {
      if (arr[i] === '(') paranNumber += 1;
      if (arr[i] === ')') paranNumber -= 1;
      if (paranNumber === 0) {
        closeParanId = i;
        break;
      }
    }
    let item = calculate(arr.slice(openParanId + 1, closeParanId))
    arr.splice(openParanId, closeParanId - openParanId + 1, item)
    return arr
  }

  const calculate = (arr) => {
    if (arr.length === 1) {
      return Number(arr[0])
    }
    if (arr.includes('(')) {
      return calculate(calculateWithParanthesis(arr))
    }
    else if (arr.includes('/') || arr.includes('x')) {
      let divId = arr.indexOf('/');
      let mulId = arr.indexOf('x');
      if (divId > 0 && (mulId < 0 || divId < mulId)) return calculate(division(arr))
      else return calculate(multiplication(arr))
    }
    else if (arr.includes('+') || arr.includes('-')) {
      let addId = arr.indexOf('+');
      let subId = arr.indexOf('-');
      if (addId > 0 && (subId < 0 || addId < subId)) return calculate(addition(arr))
      else return calculate(subtraction(arr))
    }
    else
      throw new Error('Unexpected operation!');
  }

  return calculate(getOpArr(string))

};