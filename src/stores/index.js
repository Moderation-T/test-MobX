// *********** MobX 的 store集中管理 ***************

// import countStore from './countStore';
//
// export {
//     countStore,
// }

// *************************************************



// *************** mobx-state-tree store的集中管理 *****************
// @flow
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
