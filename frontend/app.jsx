import * as React from 'react'
import {TestComponent} from "./TestComponent.jsx";

let A = () => <div>
  <TestComponent/>
</div>

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(A), domContainer);

