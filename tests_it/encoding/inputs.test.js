import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import inputs from '../../bitmovin/encoding/inputs';

let testConfiguration = getConfiguration();

const sampleS3Input = {
  name       : 'Bitmovin Javascript Sample S3 Input',
  description: 'Bitmovin Javascript input.test.js sampleS3Input',
  accessKey  : 'AKIAIOSFODNN7INVALID',
  secretKey  : 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYINVALIDKEY',
  bucketName : 'readtheworld',
  cloudRegion: 'SA_EAST_1',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleGenericS3Input = {
  name       : 'Bitmovin Javascript Sample Generic S3 Input',
  description: 'Bitmovin Javascript input.test.js sampleGenericS3Input',
  accessKey  : 'AKIAIOSFODNN7INVALID',
  secretKey  : 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYINVALIDKEY',
  bucketName : 'readtheworld',
  host: 'myhost.com',
  port: '80',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleGcsInput = {
  name       : 'Bitmovin Javascript Sample GCS Input',
  description: 'Bitmovin Javascript input.test.js sampleAzureInput',
  accessKey  : 'GOOGTS7C7FUP3INVALID',
  secretKey  : 'bGoa+V7g/yqDXvKRqq+JTFn4uQZbPiQJoINVALID',
  bucketName : 'readtheworld',
  cloudRegion: 'US_EAST_1',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleAzureInput = {
  name       : 'Bitmovin Javascript Sample Azure Input',
  description: 'Bitmovin Javascript input.test.js sampleAzureInput',
  accountName: 'devfoobardeadbeef',
  accountKey : 'INVALID02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==',
  container  : 'readtheworld',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleFtpInput = {
  name       : 'Bitmovin Javascript Sample FTP Input',
  description: 'Bitmovin Javascript input.test.js sampleFtpInput',
  host       : 'filebucket.corpnet.local',
  port       : 21,
  username   : 'captainmorgan',
  password   : 'correctHorseBatteryStaple',
  passive    : true,
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleSftpInput = {
  name       : 'Bitmovin Javascript Sample SFTP Input',
  description: 'Bitmovin Javascript input.test.js sampleSftpInput',
  host       : 'myawesomehost.corpnet.local',
  port       : 22,
  username   : 'captainmorgan',
  password   : 'correctHorseBatteryStaple',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleHttpInput = {
  name       : 'Bitmovin Javascript Sample HTTP Input',
  description: 'Bitmovin Javascript input.test.js sampleHttpInput',
  host       : 'websrv.corpnet.local',
  username   : 'jim',
  password   : 'correctHorseBatteryStaple',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleHttpsInput = {
  name       : 'Bitmovin Javascript Sample HTTPS Input',
  description: 'Bitmovin Javascript input.test.js sampleHttpsInput',
  host       : 'websrv.corpnet.local',
  username   : 'john',
  password   : 'correctHorseBatteryStaple',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleAsperaInput = {
  name        : 'Bitmovin Javascript Sample Aspera Input',
  description : 'Bitmovin Javascript input.test.js sampleAsperaInput',
  host        : 'asperahost.local',
  username    : 'jack',
  password    : 'correctHorseBatteryStaple',
  minBandwidth: '100k',
  maxBandwidth: '100k',
  customData  : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};


describe('[Inputs]', () => {

  let inputsClient = inputs(testConfiguration);

  it('should return a list of inputs', (done) => {
    inputsClient.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.previous !== null) && response.previous !== undefined);
      assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get input type', (done) => {
    inputsClient.s3.create(sampleS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Inputs(response, sampleS3Input);
      return inputsClient.getType(response.id);
    }).then((typeResponse) => {
      assert.equal(typeResponse.type, 'S3');
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list RTMP inputs', (done) => {
    inputsClient.rtmp.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get RTMP input details', (done) => {
    let bitmovinRtmpInput = undefined;

    inputsClient.rtmp.list(1).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      bitmovinRtmpInput = response.items[0];
      return inputsClient.rtmp(bitmovinRtmpInput.id).details();
    }).then((detailsResponse) => {
      assert.equal(detailsResponse.id, bitmovinRtmpInput.id);
      assert.equal(detailsResponse.name, bitmovinRtmpInput.name);
      assert.equal(detailsResponse.description, bitmovinRtmpInput.description);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a s3 input', (done) => {
    inputsClient.s3.create(sampleS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Inputs(response, sampleS3Input);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list s3 inputs', (done) => {
    inputsClient.s3.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get s3 input details', (done) => {
    inputsClient.s3.create(sampleS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Inputs(response, sampleS3Input);
      return inputsClient.s3(response.id).details();
    }).then((detailsResponse) => {
      compareS3Inputs(detailsResponse, sampleS3Input);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get s3 input custom data', (done) => {
    inputsClient.s3.create(sampleS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Inputs(response, sampleS3Input);
      return inputsClient.s3(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleS3Input.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a s3 input', (done) => {
    let createdInput = undefined;

    inputsClient.s3.create(sampleS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareS3Inputs(response, sampleS3Input);
      createdInput = response;
      return inputsClient.s3(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a genericS3 input', (done) => {
    inputsClient.genericS3.create(sampleGenericS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Inputs(response, sampleGenericS3Input);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list genericS3 inputs', (done) => {
    inputsClient.genericS3.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get genericS3 input details', (done) => {
    inputsClient.genericS3.create(sampleGenericS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Inputs(response, sampleGenericS3Input);
      return inputsClient.genericS3(response.id).details();
    }).then((detailsResponse) => {
      compareGenericS3Inputs(detailsResponse, sampleGenericS3Input);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get genericS3 input custom data', (done) => {
    inputsClient.genericS3.create(sampleGenericS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Inputs(response, sampleGenericS3Input);
      return inputsClient.genericS3(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleGenericS3Input.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete genericS3 s3 input', (done) => {
    let createdInput = undefined;

    inputsClient.genericS3.create(sampleGenericS3Input).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGenericS3Inputs(response, sampleGenericS3Input);
      createdInput = response;
      return inputsClient.genericS3(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a gcs input', (done) => {
    inputsClient.gcs.create(sampleGcsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsInputs(response, sampleGcsInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list gcs inputs', (done) => {
    inputsClient.gcs.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get gcs input details', (done) => {
    inputsClient.gcs.create(sampleGcsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsInputs(response, sampleGcsInput);
      return inputsClient.gcs(response.id).details();
    }).then((detailsResponse) => {
      compareGcsInputs(detailsResponse, sampleGcsInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get gcs input custom data', (done) => {
    inputsClient.gcs.create(sampleGcsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsInputs(response, sampleGcsInput);
      return inputsClient.gcs(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleGcsInput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a gcs input', (done) => {
    let createdInput = undefined;

    inputsClient.gcs.create(sampleGcsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareGcsInputs(response, sampleGcsInput);
      createdInput = response;
      return inputsClient.gcs(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create an azure input', (done) => {
    inputsClient.azure.create(sampleAzureInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureInputs(response, sampleAzureInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list azure inputs', (done) => {
    inputsClient.azure.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get azure input details', (done) => {
    inputsClient.azure.create(sampleAzureInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureInputs(response, sampleAzureInput);
      return inputsClient.azure(response.id).details();
    }).then((detailsResponse) => {
      compareAzureInputs(detailsResponse, sampleAzureInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get azure input custom data', (done) => {
    inputsClient.azure.create(sampleAzureInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureInputs(response, sampleAzureInput);
      return inputsClient.azure(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleAzureInput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete an azure input', (done) => {
    let createdInput = undefined;

    inputsClient.azure.create(sampleAzureInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAzureInputs(response, sampleAzureInput);
      createdInput = response;
      return inputsClient.azure(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a ftp input', (done) => {
    inputsClient.ftp.create(sampleFtpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpInputs(response, sampleFtpInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list ftp inputs', (done) => {
    inputsClient.ftp.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get ftp input details', (done) => {
    inputsClient.ftp.create(sampleFtpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpInputs(response, sampleFtpInput);
      return inputsClient.ftp(response.id).details();
    }).then((detailsResponse) => {
      compareFtpInputs(detailsResponse, sampleFtpInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get ftp input custom data', (done) => {
    inputsClient.ftp.create(sampleFtpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpInputs(response, sampleFtpInput);
      return inputsClient.ftp(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleFtpInput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a ftp input', (done) => {
    let createdInput = undefined;

    inputsClient.ftp.create(sampleFtpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareFtpInputs(response, sampleFtpInput);
      createdInput = response;
      return inputsClient.ftp(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a sftp input', (done) => {
    inputsClient.sftp.create(sampleSftpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpInputs(response, sampleSftpInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list sftp inputs', (done) => {
    inputsClient.sftp.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get sftp input details', (done) => {
    inputsClient.sftp.create(sampleSftpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpInputs(response, sampleSftpInput);
      return inputsClient.sftp(response.id).details();
    }).then((detailsResponse) => {
      compareSftpInputs(detailsResponse, sampleSftpInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get sftp input custom data', (done) => {
    inputsClient.sftp.create(sampleSftpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpInputs(response, sampleSftpInput);
      return inputsClient.sftp(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleSftpInput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a sftp input', (done) => {
    let createdInput = undefined;

    inputsClient.sftp.create(sampleSftpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareSftpInputs(response, sampleSftpInput);
      createdInput = response;
      return inputsClient.sftp(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a http input', (done) => {
    inputsClient.http.create(sampleHttpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpInputs(response, sampleHttpInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list http inputs', (done) => {
    inputsClient.http.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get http input details', (done) => {
    inputsClient.http.create(sampleHttpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpInputs(response, sampleHttpInput);
      return inputsClient.http(response.id).details();
    }).then((detailsResponse) => {
      compareHttpInputs(detailsResponse, sampleHttpInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get http input custom data', (done) => {
    inputsClient.http.create(sampleHttpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpInputs(response, sampleHttpInput);
      return inputsClient.http(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleHttpInput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a http input', (done) => {
    let createdInput = undefined;

    inputsClient.http.create(sampleHttpInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpInputs(response, sampleHttpInput);
      createdInput = response;
      return inputsClient.http(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a https input', (done) => {
    inputsClient.https.create(sampleHttpsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpsInputs(response, sampleHttpsInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list https inputs', (done) => {
    inputsClient.https.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get https input details', (done) => {
    inputsClient.https.create(sampleHttpsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpsInputs(response, sampleHttpsInput);
      return inputsClient.https(response.id).details();
    }).then((detailsResponse) => {
      compareHttpsInputs(detailsResponse, sampleHttpsInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get https input custom data', (done) => {
    inputsClient.https.create(sampleHttpsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpsInputs(response, sampleHttpsInput);
      return inputsClient.https(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleHttpsInput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete a https input', (done) => {
    let createdInput = undefined;

    inputsClient.https.create(sampleHttpsInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareHttpsInputs(response, sampleHttpsInput);
      createdInput = response;
      return inputsClient.https(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create an aspera input', (done) => {
    inputsClient.aspera.create(sampleAsperaInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAsperaInputs(response, sampleAsperaInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should list aspera inputs', (done) => {
    inputsClient.aspera.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get aspera input details', (done) => {
    inputsClient.aspera.create(sampleAsperaInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAsperaInputs(response, sampleAsperaInput);
      return inputsClient.aspera(response.id).details();
    }).then((detailsResponse) => {
      compareAsperaInputs(detailsResponse, sampleAsperaInput);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should get aspera input custom data', (done) => {
    inputsClient.aspera.create(sampleAsperaInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAsperaInputs(response, sampleAsperaInput);
      return inputsClient.aspera(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleAsperaInput.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  it('should delete an aspera input', (done) => {
    let createdInput = undefined;

    inputsClient.aspera.create(sampleAsperaInput).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareAsperaInputs(response, sampleAsperaInput);
      createdInput = response;
      return inputsClient.aspera(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdInput.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it.skip('should start analyzing a media file', (done) => {
    done(new Error('TODO'));
  });
  it.skip('should list media analyses', (done) => {
    done(new Error('TODO'));
  });
  it.skip('should get media analysis status', (done) => {
    done(new Error('TODO'));
  });
  it.skip('should get media analysis details', (done) => {
    done(new Error('TODO'));
  });
  it.skip('should get media analysis stream details', (done) => {
    done(new Error('TODO'));
  });
  it.skip('should get media analysis custom data', (done) => {
    done(new Error('TODO'));
  });

  const compareS3Inputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.bucketName, inputTwo.bucketName);
    assert.equal(inputOne.cloudRegion, inputTwo.cloudRegion);
  };

  const compareGenericS3Inputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.bucketName, inputTwo.bucketName);
    assert.equal(inputOne.cloudRegion, inputTwo.cloudRegion);
    assert.equal(inputOne.host, inputTwo.host);
    assert.equal(inputOne.port, inputTwo.port);
  };

  const compareGcsInputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.bucketName, inputTwo.bucketName);
    assert.equal(inputOne.cloudRegion, inputTwo.cloudRegion);
  };

  const compareAzureInputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.container, inputTwo.container);
  };

  const compareFtpInputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.host, inputTwo.host);
    assert.equal(inputOne.port, inputTwo.port);
    assert.equal(inputOne.passive, inputTwo.passive);
  };

  const compareSftpInputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.host, inputTwo.host);
    assert.equal(inputOne.port, inputTwo.port);
  };

  const compareHttpInputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.host, inputTwo.host);
  };

  const compareHttpsInputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.host, inputTwo.host);
  };

  const compareAsperaInputs = (inputOne, inputTwo) => {
    assert.equal(inputOne.name, inputTwo.name);
    assert.equal(inputOne.description, inputTwo.description);
    assert.equal(inputOne.host, inputTwo.host);
    assert.equal(inputOne.minBandwidth, inputTwo.minBandwidth);
    assert.equal(inputOne.maxBandwidth, inputTwo.maxBandwidth);
  };
});