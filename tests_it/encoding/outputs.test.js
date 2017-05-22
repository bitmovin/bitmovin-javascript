import assert from 'assert';

import {getConfiguration} from '../utils';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

let sampleS3Output = {
  name       : 'Sample S3 Output - Bitmovin Javascript',
  description: 'Bitmovin Javascript outputs.test.js',
  accessKey  : 'AKIAIOSFODNN7INVALID',
  secretKey  : 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYINVALIDKEY',
  bucketName : 'printtheworld',
  cloudRegion: 'SA_EAST_1',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleGenericS3Output = {
  name       : 'Sample S3 Output - Bitmovin Javascript',
  description: 'Bitmovin Javascript outputs.test.js',
  accessKey  : 'AKIAIOSFODNN7INVALID',
  secretKey  : 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYINVALIDKEY',
  bucketName : 'printtheworld',
  host: 'myhost.com',
  port: 80,
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleGcsOutput = {
  name       : 'Sample GCS Output - Bitmovin Javascript',
  description: 'Bitmovin Javascript outputs.test.js',
  accessKey  : 'GOOGTS7C7FUP3INVALID',
  secretKey  : 'bGoa+V7g/yqDXvKRqq+JTFn4uQZbPiQJoINVALID',
  bucketName : 'printtheworld',
  cloudRegion: 'US_EAST_1',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleAzureOutput = {
  name       : 'Sample Azure Output - Bitmovin Javascript',
  description: 'Bitmovin Javascript outputs.test.js',
  accountName: 'devfoobardeadbeef',
  accountKey : 'INVALID02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==',
  container  : 'printtheworld',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleFtpOutput = {
  name                    : 'Sample FTP Output - Bitmovin Javascript',
  description             : 'Bitmovin Javascript outputs.test.js',
  host                    : 'filebucket.corpnet.local',
  port                    : 21,
  username                : 'captainmorgan',
  password                : 'correctHorseBatteryStaple',
  passive                 : true,
  transferVersion         : '1.1.0',
  maxConcurrentConnections: 20,
  customData              : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleSftpOutput = {
  name       : 'Sample SFTP Output - Bitmovin Javascript',
  description: 'Bitmovin Javascript outputs.test.js',
  host       : 'myawesomehost.corpnet.local',
  port       : 22,
  username   : 'captainmorgan',
  password   : 'correctHorseBatteryStaple',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

describe('[Outputs]', () => {

  let outputClient = outputs(testConfiguration);

  it('should list all outputs', () => {
    return outputClient.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
    }).catch((error) => {
      fail('Unknown reason', error);
    });
  }, 10000);
  it('should get the type of an output', (done) => {
    outputClient.s3.create(sampleS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      assert.equal(response.name, sampleS3Output.name);
      assert.equal(response.description, sampleS3Output.description);
      assert.equal(response.bucketName, sampleS3Output.bucketName);
      assert.equal(response.cloudRegion, sampleS3Output.cloudRegion);

      return outputClient.getType(response.id);
    }).then((typeResponse) => {
      assert.equal(typeResponse.type.toLowerCase(), 's3');
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a s3 output', (done) => {
    outputClient.s3.create(sampleS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Outputs(response, sampleS3Output);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list s3 outputs', (done) => {
    outputClient.s3.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get s3 output details', (done) => {
    outputClient.s3.create(sampleS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Outputs(response, sampleS3Output);
      return outputClient.s3(response.id).details();
    }).then((detailsResponse) => {
      compareS3Outputs(detailsResponse, sampleS3Output);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get s3 output custom data', (done) => {
    outputClient.s3.create(sampleS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Outputs(response, sampleS3Output);
      return outputClient.s3(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleS3Output.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a s3 output', (done) => {
    let createdOutput = undefined;

    outputClient.s3.create(sampleS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsOutputs(response, sampleS3Output);
      createdOutput = response;
      return outputClient.s3(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdOutput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a genericS3 output', (done) => {
    outputClient.genericS3.create(sampleGenericS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Outputs(response, sampleGenericS3Output);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list genericS3 outputs', (done) => {
    outputClient.genericS3.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get genericS3 output details', (done) => {
    outputClient.genericS3.create(sampleGenericS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Outputs(response, sampleGenericS3Output);
      return outputClient.genericS3(response.id).details();
    }).then((detailsResponse) => {
      compareGenericS3Outputs(detailsResponse, sampleGenericS3Output);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get genericS3 output custom data', (done) => {
    outputClient.genericS3.create(sampleGenericS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Outputs(response, sampleGenericS3Output);
      return outputClient.genericS3(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleGenericS3Output.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a genericS3 output', (done) => {
    let createdOutput = undefined;

    outputClient.genericS3.create(sampleGenericS3Output).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Outputs(response, sampleGenericS3Output);
      createdOutput = response;
      return outputClient.genericS3(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdOutput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a gcs output', (done) => {
    outputClient.gcs.create(sampleGcsOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsOutputs(response, sampleGcsOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list gcs outputs', (done) => {
    outputClient.gcs.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get gcs output details', (done) => {
    outputClient.gcs.create(sampleGcsOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsOutputs(response, sampleGcsOutput);
      return outputClient.gcs(response.id).details();
    }).then((detailsResponse) => {
      compareGcsOutputs(detailsResponse, sampleGcsOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get gcs output custom data', (done) => {
    outputClient.gcs.create(sampleGcsOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsOutputs(response, sampleGcsOutput);
      return outputClient.gcs(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleGcsOutput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a gcs output', (done) => {
    let createdOutput = undefined;

    outputClient.gcs.create(sampleGcsOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsOutputs(response, sampleGcsOutput);
      createdOutput = response;
      return outputClient.gcs(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdOutput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create an azure output', (done) => {
    outputClient.azure.create(sampleAzureOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureOutputs(response, sampleAzureOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list azure outputs', (done) => {
    outputClient.azure.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get azure output details', (done) => {
    outputClient.azure.create(sampleAzureOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureOutputs(response, sampleAzureOutput);
      return outputClient.azure(response.id).details();
    }).then((detailsResponse) => {
      compareAzureOutputs(detailsResponse, sampleAzureOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get azure output custom data', (done) => {
    outputClient.azure.create(sampleAzureOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureOutputs(response, sampleAzureOutput);
      return outputClient.azure(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleAzureOutput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete an azure output', (done) => {
    let createdOutput = undefined;

    outputClient.azure.create(sampleAzureOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureOutputs(response, sampleAzureOutput);
      createdOutput = response;
      return outputClient.azure(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdOutput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a ftp output', (done) => {
    outputClient.ftp.create(sampleFtpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpOutputs(response, sampleFtpOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list ftp outputs', (done) => {
    outputClient.ftp.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get ftp output details', (done) => {
    outputClient.ftp.create(sampleFtpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpOutputs(response, sampleFtpOutput);
      return outputClient.ftp(response.id).details();
    }).then((responseDetails) => {
      compareFtpOutputs(responseDetails, sampleFtpOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get ftp output custom data', (done) => {
    outputClient.ftp.create(sampleFtpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpOutputs(response, sampleFtpOutput);
      return outputClient.ftp(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleFtpOutput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a ftp output', (done) => {
    let createdOutput = undefined;

    outputClient.ftp.create(sampleFtpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpOutputs(response, sampleFtpOutput);
      createdOutput = response;
      return outputClient.ftp(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdOutput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a sftp output', (done) => {
    outputClient.sftp.create(sampleSftpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpOutputs(response, sampleSftpOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list sftp outputs', (done) => {
    outputClient.sftp.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get sftp output details', (done) => {
    outputClient.sftp.create(sampleSftpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpOutputs(response, sampleSftpOutput);
      return outputClient.sftp(response.id).details();
    }).then((responseDetails) => {
      compareSftpOutputs(responseDetails, sampleSftpOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get sftp output custom data', (done) => {
    outputClient.sftp.create(sampleSftpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpOutputs(response, sampleSftpOutput);
      return outputClient.sftp(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleSftpOutput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a sftp output', (done) => {
    let createdOutput = undefined;

    outputClient.sftp.create(sampleSftpOutput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpOutputs(response, sampleSftpOutput);
      createdOutput = response;
      return outputClient.sftp(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdOutput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list bitmovin aws outputs', (done) => {
    outputClient.bitmovin.aws.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get bitmovin aws output details', (done) => {
    let bitmovinAwsOutput = undefined;

    outputClient.bitmovin.aws.list(1).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      bitmovinAwsOutput = response.items[0];
      return outputClient.bitmovin.aws(bitmovinAwsOutput.id).details();
    }).then((detailsResponse) => {
      compareS3Outputs(detailsResponse, bitmovinAwsOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list bitmovin gcp outputs', (done) => {
    outputClient.bitmovin.gcp.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get bitmovin gcp output details', (done) => {
    let bitmovinAwsOutput = undefined;

    outputClient.bitmovin.gcp.list(1).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      bitmovinAwsOutput = response.items[0];
      return outputClient.bitmovin.gcp(bitmovinAwsOutput.id).details();
    }).then((detailsResponse) => {
      compareGcsOutputs(detailsResponse, bitmovinAwsOutput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareS3Outputs = (outputOne, outputTwo) => {
    assert.equal(outputOne.name, outputTwo.name);
    assert.equal(outputOne.description, outputTwo.description);
    assert.equal(outputOne.bucketName, outputTwo.bucketName);
    assert.equal(outputOne.cloudRegion, outputTwo.cloudRegion);
  };

  const compareGenericS3Outputs = (outputOne, outputTwo) => {
    assert.equal(outputOne.name, outputTwo.name);
    assert.equal(outputOne.description, outputTwo.description);
    assert.equal(outputOne.bucketName, outputTwo.bucketName);
    assert.equal(outputOne.cloudRegion, outputTwo.cloudRegion);
    assert.equal(outputOne.host, outputTwo.host);
    assert.equal(outputOne.port, outputTwo.port);
  };

  const compareGcsOutputs = (outputOne, outputTwo) => {
    assert.equal(outputOne.name, outputTwo.name);
    assert.equal(outputOne.description, outputTwo.description);
    assert.equal(outputOne.bucketName, outputTwo.bucketName);
    assert.equal(outputOne.cloudRegion, outputTwo.cloudRegion);
  };

  const compareAzureOutputs = (outputOne, outputTwo) => {
    assert.equal(outputOne.name, outputTwo.name);
    assert.equal(outputOne.description, outputTwo.description);
    assert.equal(outputOne.container, outputTwo.container);
  };

  const compareFtpOutputs = (outputOne, outputTwo) => {
    assert.equal(outputOne.name, outputTwo.name);
    assert.equal(outputOne.description, outputTwo.description);
    assert.equal(outputOne.host, outputTwo.host);
    assert.equal(outputOne.port, outputTwo.port);
    assert.equal(outputOne.passive, outputTwo.passive);
    assert.equal(outputOne.transferVersion, outputTwo.transferVersion);
    assert.equal(outputOne.maxConcurrentConnections, outputTwo.maxConcurrentConnections);
  };

  const compareSftpOutputs = (outputOne, outputTwo) => {
    assert.equal(outputOne.name, outputTwo.name);
    assert.equal(outputOne.description, outputTwo.description);
    assert.equal(outputOne.host, outputTwo.host);
    assert.equal(outputOne.port, outputTwo.port);
  };
});
