import Relay from 'react-relay';

export default class CreateCandidateInfoLikeMutation extends Relay.Mutation {
    static initialVariables = {
        input: null
    };

    getMutation() {
        return Relay.QL`
      mutation {
        createCandidateInfoLike
      }`;
    }

    getVariables() {
        return {
            likerUserId: this.props.input.user.id,
            candidateInfoId: this.props.input.candidateInfo.id
        };
    }

    getFatQuery() {
        return Relay.QL`
      fragment on CreateCandidateInfoLikePayload {
        changedCandidateInfoLike {
          id
          createdAt
          modifiedAt
        }
      }`
    }

    getConfigs() {
        return [{
            type: 'REQUIRED_CHILDREN',
            children: [Relay.QL `
        fragment on CreateCandidateInfoLikePayload {
          changedCandidateInfoLike {
              id
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
        candidateInfoLike: () => Relay.QL`
      fragment on CreateCandidateInfoLikePayload {
        changedCandidateInfoLike {
          id
          createdAt
          modifiedAt
        }
      }`,
    };
}