# MobX使用笔记

[小练习文件地址](https://github.com/Moderation-T/test-MobX)

`使用create-react-app快速搭建的react项目 目录结构都是根据这个来的`

以下案例只是展示了mobx最基本的使用方法：

### 安装依赖

> MobX

```bash
npm install mobx
npm install mobx-react
```

> 翻译修饰器（decorators）

```bash
npm i babel-plugin-transform-decorators-legacy
npm i babel-loader;

```

> 在package.json中配置plugin：

![image-20180821150612926](http://p82ue350h.bkt.clouddn.com/image/mobx/mobx_plugins_1.png)

### 一、创建一个简单的计数案例

##### 1.1 创建src/stores/countStore/index.js 

```jsx
import { observable, action,computed } from 'mobx';

class CountStore {
    // 定义变量count
    @observable count = 0;
    // count+1函数
    @action addCount = () => {
        this.count += 1;
    }
    // 重置count函数
    @action resetCount = () => {
        this.count = 0;
    }

    @computed get  text (){
        return `我现在是${this.count}`
    }

   constructor() {
        // 运行一次建立连接
        autorun( () => {
            console.log('number:' + this.count)
        })
    }
}

const countStore = new CountStore();

export default countStore;
export { CountStore };

```

- observable 用来包装一个属性为 被观察者
- autorun 用来包装一个方法为 观察者，可以订阅变更
- action 任何应用都有动作。动作是任何用来修改状态的东西。 
- computed 计算值(computed values)是可以根据现有的状态或其它计算值衍生出的值。

##### 1.2 创建src/stores/index.js 一个项目中一定会有许多的store 所以在这个文件中集中管理

```jsx
import countStore from './countStore';
export {
    countStore,
}
```

##### 1.4 在src/index.js中provide stores

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'; // 引入Provider

import * as stores from './stores'; // 引入stores
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //使用provider
    <Provider {...stores}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```

##### 1.3在src/app.js中使用

```jsx
import React, {Component} from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';


// 引入所要使用的store文件
@inject('countStore')
@observer
class App extends Component {
  
    render() {
        // 引入所用变量与方法
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
```

![image-20180821155118769](http://p82ue350h.bkt.clouddn.com/image/mobx/mobx_test_1.png)

### 附：

[参考文档](https://cn.mobx.js.org/)



# Mobx-state-tree使用笔记

[小练习文件地址](https://github.com/Moderation-T/test-MobX)

`使用create-react-app快速搭建的react项目 目录结构都是根据这个来的`

以下案例只是展示了mobx-state-tree最基本的使用方法：

### 安装依赖

> MobX

```bash
npm install mobx
npm install mobx-react
npm mobx-state-tree
```

> 翻译修饰器（decorators）

```bash
npm i babel-plugin-transform-decorators-legacy
npm i babel-loader;
```

> 在package.json中配置plugin：

![image-20180821150612926](http://p82ue350h.bkt.clouddn.com/image/mobx/mobx_plugins_1.png)

### 一、一个简单的案例

##### 1.1 创建src/stores/stateTreeStore/index.js  

```jsx
// @flow
/* eslint-disable no-param-reassign */
import { types, flow, getEnv } from 'mobx-state-tree';
export default types
    .model('StateTreeStore', {
        value:types.optional(types.number,666),
    })
    .actions(self => ({
        trial: flow(function* trial(history) {
            console.log(history)
            self.value = history; 
        }),
    }));

```

> 下面这个是有异步处理的其他项目的使用，与小案例项目无关

```jsx
export default types
  .model('Account', {
    expireMessage: types.optional(types.string, ''),
    expireCount: types.optional(types.number, 0),
    availableRegionList: types.optional(availableRegionListModel, []),
  })
  .actions(self => ({
    trial: flow(function* trial({ channel, customerName, email, jobPosition, mobile, name, region } = {}) {
      const { code, msg } = yield getEnv(self).api(`${config.IResearchAPI}/test/ircenter4memect/members/trial`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel,
          customerName,
          email,
          jobPosition,
          mobile,
          name,
          region: Number(region),
        }),
      });
      cosnole.log(code);
      if (code !== 1) {
        throw new Error(msg);
      }
      console.log(msg);
    }),
  }));
```

##### 1.2 创建src/stores/index.js 一个项目中一定会有许多的store 所以在这个文件中集中管理

```jsx
import t from 'flow-runtime';
import * as mobx from 'mobx';

import flowRuntimeMobx from 'flow-runtime-mobx'; //让mobx支持flow-runtime
import makeInspectable from 'mobx-devtools-mst'; 

import { types } from 'mobx-state-tree';


import StateTreeStore from './stateTreeStore';

flowRuntimeMobx(t, mobx);

export const Model = types.model({
    stateTreeStore:types.optional(StateTreeStore,{}),
});

const store = Model.create();
makeInspectable(store);

export {
    store,
};
```

##### 1.4 在src/index.js中provide stores

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// import * as stores from './stores';
import {store} from './stores'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider
    stateTreeStore = {store.stateTreeStore}
><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

```

##### 1.3在src/app.js中使用

```jsx
import React, {Component} from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';



// 引入所要使用的store文件
// @inject('countStore')
@inject('stateTreeStore')
// @inject('tree')
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
```

![image-20180822152018636](http://p82ue350h.bkt.clouddn.com/image/mobx/mobx_mobx-state-tree_test_1.png)

### 附：

[mobx-state-tree使用参考文档](https://codeburst.io/migrating-from-redux-to-mobx-state-tree-straight-to-the-steps-735ae20d6cd5)



