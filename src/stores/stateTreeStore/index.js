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
