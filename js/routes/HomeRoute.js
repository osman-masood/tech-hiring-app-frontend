import Relay from 'react-relay';
import config from './../../config';

export const HomeQueries = {
    /**
     * Example Query
     */

    // allHackerNewsItems: (Component, variables) => {
    // 	return Relay.QL `
    // 		query {
    // 			viewer {
    // 				${Component.getFragment('allHackerNewsItems', {orderBy: variables.orderBy})}
    // 			}
    // 		}
    // 	`
    // }

    viewer: () => {
        return Relay.QL`
            query {
                viewer
            }
`
    }
};


export function prepareHomeParams(params, {}) {
    return {
        ...params,
        /**
         * Example Param
         */

        // orderBy: "-createdAt"
    };
}