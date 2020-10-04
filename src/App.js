import React from 'react';
import { useReducer } from 'react';
import calculator from "./calculator.js"

const InputButton = (props) => (
  <button value={props.value} className={`${props.value === "0" ? "col-span-2" : ""} bg-blue-400 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-full`} onClick={props.onClick}>{props.value}</button>)

const OperationButton = (props) => (
  <button value={props.op} className={"bg-orange-500 hover:bg-white hover:text-orange-500 text-white text-xl font-bold py-2 px-4 rounded-full"} onClick={props.onClick}>{props.op}</button>)

const ParanButton = (props) => (
  <button value={props.value} className={"bg-blue-200 hover:bg-blue-600 hover:text-blue-200 text-blue-700 text-xl font-bold py-2 px-4 rounded-full"} onClick={props.onClick}>{props.value}</button>)

const Screen = (props) => <div className="grid grid-flow-row justify-center grid-cols-4 grid-rows-1 gap-1 px-2 py-2 ">
  <div className="col-span-4 text-white text-4xl text-right">{props.value}</div>
</div>

const init = { count: "0", initialized: true, header: "Simple Calculator" };
const reducer = (state, action) => {
  switch (action.type) {
    case 'insert':
      return { ...state, count: state.initialized ? action.payload : state.count + action.payload, initialized: false }
    case 'calculate':
      return { ...state, count: calculator(state.count) + "", initialized: true }
    case 'reset':
      return { ...state, count: "0", initialized: true }
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, init);
  const valueInserted = (e) => dispatch({ type: 'insert', payload: e.target.value })
  const calculateClicked = () => dispatch({ type: 'calculate' })
  const reset = () => dispatch({ type: 'reset' })

  return (
    <div className="h-screen lg:mx-auto flex justify-center items-start bg-gray-800" >
      <div className="container max-w-lg min-h-s bg-gray-800" >
        <div className="text-4xl text-center p-8 text-blue-300">{state.header}</div>
        <div className=" bg-gray-800  rounded px-8 pb-8">
          <Screen value={state.count} />
          <div className="grid grid-flow-row justify-center grid-cols-4 grid-rows-3 gap-1 px-2 py-2 ">
            <ParanButton value="AC" onClick={reset} />
            <ParanButton value="(" onClick={valueInserted} />
            <ParanButton value=")" onClick={valueInserted} />
            <OperationButton op="/" onClick={valueInserted} />
            <InputButton value="7" onClick={valueInserted} />
            <InputButton value="8" onClick={valueInserted} />
            <InputButton value="9" onClick={valueInserted} />
            <OperationButton op="x" onClick={valueInserted} />
            <InputButton value="4" onClick={valueInserted} />
            <InputButton value="5" onClick={valueInserted} />
            <InputButton value="6" onClick={valueInserted} />
            <OperationButton op="-" onClick={valueInserted} />
            <InputButton value="1" onClick={valueInserted} />
            <InputButton value="2" onClick={valueInserted} />
            <InputButton value="3" onClick={valueInserted} />
            <OperationButton op="+" onClick={valueInserted} />
            <InputButton value="0" onClick={valueInserted} />
            <InputButton value="." onClick={valueInserted} />
            <OperationButton op="=" onClick={calculateClicked} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
