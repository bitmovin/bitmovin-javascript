import assert from 'assert';

import infrastructure from '../../bitmovin/encoding/infrastructure';
import {getConfiguration} from '../utils';
let testConfiguration = getConfiguration();

const sampleKubernetesInfrastructure = {
  name       : 'Kubernetes Infrastructure',
  description: 'This is my Kubernetes Cluster',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};


const compareInfrastructures = (infrastructureOne, infrastructureTwo) => {
  assert.equal(infrastructureOne.name, infrastructureTwo.name);
  assert.equal(infrastructureOne.description, infrastructureTwo.description);
};

describe('[Infrastructure]', () => {

  let infrastructureClient = infrastructure(testConfiguration);

  it('should create new kubernetes infrastructure', (done) => {
    infrastructureClient.kubernetes.create(sampleKubernetesInfrastructure).then((response) => {
      assert((response.id !== null) && response.id !== undefined);
      compareInfrastructures(sampleKubernetesInfrastructure, response);
      done();
    }).catch((error) => {
      done(new Error(error))
    })
  });

  it('should get kubernetes details and custom data', (done) => {
    infrastructureClient.kubernetes.create(sampleKubernetesInfrastructure).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareInfrastructures(sampleKubernetesInfrastructure, response);
      return infrastructureClient.kubernetes(response.id).details();
    }).then((kubernetesDetailResponse) => {
      assert((kubernetesDetailResponse.id !== null) && (kubernetesDetailResponse.id !== undefined) && kubernetesDetailResponse.id !== '');
      assert((kubernetesDetailResponse.online !== null) && (kubernetesDetailResponse.online !== undefined));
      assert((kubernetesDetailResponse.connected !== null) && (kubernetesDetailResponse.connected !== undefined));
      assert((kubernetesDetailResponse.agentDeploymentDownloadUrl !== null) && (kubernetesDetailResponse.agentDeploymentDownloadUrl !== undefined) && kubernetesDetailResponse.agentDeploymentDownloadUrl !== '');
      compareInfrastructures(sampleKubernetesInfrastructure, kubernetesDetailResponse);
      return infrastructureClient.kubernetes(kubernetesDetailResponse.id).customData();
    }).then((kubernetesCustomDataResponse) => {
      assert.deepEqual(sampleKubernetesInfrastructure.customData, kubernetesCustomDataResponse.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of kubernetes infrastructures', (done) => {
    infrastructureClient.kubernetes.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.previous !== null) && response.previous !== undefined);
      assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

});
