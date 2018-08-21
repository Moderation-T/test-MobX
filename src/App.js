import React, {Component} from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';


// 引入所要使用的store文件
@inject('countStore')
@observer
class App extends Component {
  
    render() {
        const {count,addCount,resetCount,text} = this.props.countStore;
        return (
            <div classname="App">
                {count}
                <button onClick={addCount}>点我加1</button>
                <button onClick={resetCount}>点我清零</button>
                <p>{text}</p>
            </div>
        );
    }
}

export default App;