import React, {Component} from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';


// 引入所要使用的store文件
@inject('countStore')
@observer
class App extends Component {


    constructor(props) {
        super(props);
    }


    render() {

        // const {count} = this.props.countStore;
        // console.log(count);

        return (
            <div classname="App">
                111
            </div>
        );
    }
}

export default App;