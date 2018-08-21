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

 

}

const countStore = new CountStore();

export default countStore;
export { CountStore };

