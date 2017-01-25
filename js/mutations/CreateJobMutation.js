import Relay from 'react-relay';

export default class CreateJobMutation extends Relay.Mutation {
    static initialVariables = {
        input: null
    };

    getMutation() {
        return Relay.QL`
      mutation {
        createJob
      }
    `;
    }

    getVariables() {
        return {
            userId: this.props.input.user.id,
            description: this.props.input.description
        };
    }

    getFatQuery() {
        return Relay.QL`
      fragment on CreateJobPayload {
        changedJob {
          id
          description
          createdAt
          modifiedAt
        }
      }
    `
    }

    getConfigs() {
        return [{
            type: 'REQUIRED_CHILDREN',
            children: [Relay.QL `
        fragment on CreateJobPayload {
          changedJob {
            id
            description
            user {
              id
            }
            createdAt
            modifiedAt
          }
        }
      `]
        }]
    }
    //
    // getOptimisticResponse() {
    //     return {
    //         changedJob: {
    //             id: this.props.input.id,
    //             user: {
    //                 id: this.props.input.user.id
    //             },
    //             description: this.props.input.description
    //         }
    //     }
    // }

    static fragments = {
        job: () => Relay.QL`
      fragment on CreateJobPayload {
        changedJob {
          id
          description
          user {
            id
          }
          createdAt
          modifiedAt
        }
      }
    `,
    };
}