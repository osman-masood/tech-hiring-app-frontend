import Relay from 'react-relay';
import config from './../../config';

export const ProfileQueries = {
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

    user: () => {
        return Relay.QL`
            query {
                getUser(id: $userId)
            }`
    },
    job: () => {
        return Relay.QL`
            query {
                getJob(id: $jobId)
            }`
    }
};


export function prepareProfileParams(params, {}) {
    return {
        ...params,
        /**
         * Example Param
         */

        // orderBy: "-createdAt"
    };
}