import React, {Component} from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';



// 引入所要使用的store文件
// @inject('countStore')
@inject('stateTreeStore')
@observer
class App extends Component {

    render() {
        console.log(this.props);
        const {value,trial} = this.props.stateTreeStore;

        return (
            <div className="App">
                {`我现在${value}`}
                <button onClick={()=>{
                    trial(888);
                }}>我想变发发发</button>
            </div>
        );
    }
}

export default App;