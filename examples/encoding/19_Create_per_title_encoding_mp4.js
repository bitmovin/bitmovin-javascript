// 19_Create_per_title_encoding_mp4.js
// ---------------------------------------------------------------------------------------------------------------------

const Bitmovin = require('bitmovin-javascript').default;
const Promise = require('bluebird');

const BITMOVIN_API_KEY = '<INSERT YOUR API KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

const ENCODING_NAME = 'JAVASCRIPT Example - Per Title';

const INPUT_FILE_PATH = '/path/to/your/input/file.mp4';

const S3_ACCESS_KEY = '<INSERT_YOUR_ACCESS_KEY>';
const S3_SECRET_KEY = '<INSERT_YOUR_SECRET_KEY>';
const S3_INPUT_BUCKET_NAME = '<INSERT_YOUR_BUCKET_NAME>';
const S3_OUTPUT_BUCKET_NAME = '<INSERT_YOUR_BUCKET_NAME>';
const OUTPUT_PATH = '/your/output/base/path/';

const s3Input = {
    name: 'S3 input',
    accessKey: S3_ACCESS_KEY,
    secretKey: S3_SECRET_KEY,
    bucketName: S3_INPUT_BUCKET_NAME
};

const s3Output = {
    name: 'S3 output',
    accessKey: S3_ACCESS_KEY,
    secretKey: S3_SECRET_KEY,
    bucketName: S3_OUTPUT_BUCKET_NAME
};

const aacAudioCodecConfiguration = {
    name: 'English',
    bitrate: 128000,
    rate: 48000
};
const h264VideoCodecConfiguration1080p = {
    name: 'simple encoding',
    profile: 'HIGH'
};

const autoRepresentation = {
    adoptConfigurationThreshold: null
}

const h264PerTitleStartConfiguration = {
    autoRepresentations: autoRepresentation,
}

const perTitle = {
    h264Configuration: h264PerTitleStartConfiguration
}

const startRequest = {
    encodingMode: 'THREE_PASS',
    perTitle: perTitle
}

const encodingResource = {
    name: ENCODING_NAME
};

const main = () =>
    new Promise((resolve, reject) => {
        let aacCodecConfiguration = Object.assign({}, aacAudioCodecConfiguration);
        let h264CodecConfiguration = Object.assign({}, h264VideoCodecConfiguration1080p);
        let input = Object.assign({}, s3Input);
        let output = Object.assign({}, s3Output);
        let encoding = Object.assign({}, encodingResource);

        //Create the input resource to access the input file
        const createS3InputPromise = createS3Input(input);
        createS3InputPromise.then(createdInput => {
            console.log('Successfully created s3 Input');
            input = createdInput;
        });

        //Create the output resource to write the output files
        const createS3OutputPromise = createS3Output(output);
        createS3OutputPromise.then(createdS3Output => {
            console.log('Successfully created S3 Output');
            output = createdS3Output;
        });

        //Create the AAC codec configuration
        const createAACPromise = createAACCodecConfiguration(aacCodecConfiguration);
        createAACPromise.then(createdCodecConfig => {
            console.log('Successfully created AAC Audio Codec Configuration');
            aacCodecConfiguration = createdCodecConfig;
        });

        //Create the H264 codec configuration
        const createH264ConfigPromise = createH264CodecConfiguration(h264CodecConfiguration);
        createH264ConfigPromise.then(createdCodecConfig => {
            console.log('Successfully created H264 Video Codec Configuration');
            h264CodecConfiguration = createdCodecConfig;
        });

        //The encoding is created. The cloud region is set to AUTO to use the best cloud region depending on the input
        const createEncodingPromise = createEncoding(encodingResource);
        createEncodingPromise.then(createdEncoding => {
            console.log('Successfully created Encoding Resource with name ' + encodingResource.name);
            encoding = createdEncoding;
        });

        const preparationPromises = [
            createS3InputPromise,
            createS3OutputPromise,
            createH264ConfigPromise,
            createAACPromise,
            createEncodingPromise
        ];

        const preparationPromise = Promise.all(preparationPromises);

        preparationPromise
            .then(() => addAudioStreamToEncoding(input, output, aacCodecConfiguration, encoding))
            .then(audioStream => addVideoStreamToEncoding(input, output, h264CodecConfiguration, audioStream, encoding))
            .then(() => startEncodingAndWaitForItToBeFinished(encoding))
            .then(() => resolve(true))
            .catch(error => {
                console.log('An error ocurred.');
                reject(error);
            });
    });



//

/**
 * This will add the audio stream that will be encoded with the given codec configuration.
 *
 * @param input The input resource to access the input file
 * @param output The output resource to write the output files
 * @param audioCodecConfiguration The given codec configuration
 * @param encoding The reference of the encoding
 */
const addAudioStreamToEncoding = (input, output, audioCodecConfiguration, encoding) => {
    const inputStream = {
        inputId: input.id,
        inputPath: INPUT_FILE_PATH,
        selectionMode: 'AUTO'
    };

    let stream = {
        inputStreams: [inputStream],
        codecConfigId: audioCodecConfiguration.id
    };

    return new Promise((resolve, reject) => {
        addStream(encoding, stream)
            .then(addedStream => {
                console.log('Successfully created audio stream!');
                resolve(addedStream);
            })
            .catch(error => {
                console.error('Unable to create stream.');
                reject(error);
            });
    });
};

/**
 * This will create the Per-Title template video stream. This stream will be used as a template for the Per-Title
 * encoding. The Codec Configuration, Muxings, DRMs and Filters applied to the generated Per-Title profile will be
 * based on the same, or closest matching resolutions defined in the template.
 * Please note, that template streams are not necessarily used for the encoding -
 * they are just used as template.
 *
 * @param input The input resource to access the input file
 * @param output The output resource to write the output files
 * @param h264VideoConfiguration The given codec configuration
 * @param audioStream The reference of the audio stream
 * @param encoding The reference of the encoding
 */
const addVideoStreamToEncoding = (input, output, h264VideoConfiguration, audioStream, encoding) => {
    const inputStream = {
        inputId: input.id,
        inputPath: INPUT_FILE_PATH,
        selectionMode: 'AUTO',
    };

    let videoStream = {
        inputStreams: [inputStream],
        codecConfigId: h264VideoConfiguration.id,
        mode: 'PER_TITLE_TEMPLATE'
    };

    return new Promise((resolve, reject) => {
        addVideoStreamAndCreateMuxingWithVideoAndAudioStream(
            encoding,
            videoStream,
            output,
            audioStream
        )
            .then(addedMuxing => {
                console.log('Successfully created stream and muxing!');
                resolve(addedMuxing);
            })
            .catch(error => {
                console.error('Unable to create stream and/or muxing.');
                reject(error);
            });
    });
};

/**
 * An MP4 muxing will be created for with the Per-Title video stream template and the audio stream.
 * This muxing must define either {uuid} or {bitrate} in the output path.  These placeholders will be replaced during
 * the generation of the Per-Title.
 *
 * @param encoding The reference of the encoding
 * @param videoStream The Per-Title template video stream
 * @param output The output the files should be written to
 * @param audioStream The audio stream
 */
const addVideoStreamAndCreateMuxingWithVideoAndAudioStream = (encoding, videoStream, output, audioStream) => {
    const addStreamPromise = bitmovin.encoding.encodings(encoding.id).streams.add(videoStream);

    return new Promise((resolve, reject) => {
        addStreamPromise
            .then(addedStream => {
                console.log('stream resource successfully added');
                const prefix = '{width}_{bitrate}_{uuid}/';

                const streams = [
                    {
                        streamId: addedStream.id
                    },
                    {
                        streamId: audioStream.id
                    }
                ];

                resolve(addMp4MuxingForStreams(encoding, streams, output, prefix));
            })
            .catch(error => {
                console.error('unable to add stream to encoding', error);
                reject(error);
            });
    });
};

/**
 * The encoding will be started with the per title object and the auto representations set. If the auto
 * representation is set, stream configurations will be automatically added to the Per-Title profile. In that case
 * at least one PER_TITLE_TEMPLATE stream configuration must be available. All other configurations will be
 * automatically chosen by the Per-Title algorithm. All relevant settings for streams and muxings will be taken from
 * the closest PER_TITLE_TEMPLATE stream defined. The closest stream will be chosen based on the resolution
 * specified in the codec configuration.
 *
 * @param encoding The reference of the encoding
 */
const startEncodingAndWaitForItToBeFinished = encoding => {
    const startPromise = bitmovin.encoding.encodings(encoding.id).start(startRequest);

    return new Promise((resolve, reject) => {
        startPromise.then(() => {
            waitUntilEncodingFinished(encoding)
                .then(success => {
                    console.log('dash encoding finished', success);
                    resolve(true);
                })
                .catch(error => {
                    console.log('dash encoding errored', error);
                    reject(error);
                });
        });
    });
};

const waitUntilEncodingFinished = encoding => {
    return new Promise((resolve, reject) => {
        const waitForEncodingToBeFinishedOrError = () => {
            console.log('GET STATUS FOR ENCODING WITH ID ', encoding.id);
            bitmovin.encoding
                .encodings(encoding.id)
                .status()
                .then(response => {
                    console.log('Encoding status is ' + response.status);

                    if (response.status === 'FINISHED') {
                        return resolve(response.status);
                    }

                    if (response.status === 'ERROR') {
                        return reject(response.status);
                    }

                    setTimeout(waitForEncodingToBeFinishedOrError, 10000);
                });
        };
        waitForEncodingToBeFinishedOrError();
    });
};

const addMp4MuxingForStreams = (encoding, streams, output, output_prefix) => {
    let mp4Muxing = {
        name: 'MP4' + output_prefix,
        streams,
        outputs: [
            {
                outputId: output.id,
                acl:[],
                outputPath: OUTPUT_PATH + output_prefix,
                acl: [
                    {
                        permission: 'PUBLIC_READ'
                    }
                ]
            }
        ],
        filename: 'per_title_mp4.mp4'
    };

    const addMuxingPromise = bitmovin.encoding.encodings(encoding.id).muxings.mp4.add(mp4Muxing);

    return new Promise((resolve, reject) => {
        addMuxingPromise
            .then(addedFMP4Muxing => {
                console.log('added fmp4 muxing ' + mp4Muxing.name);
                resolve(addedFMP4Muxing);
            })
            .catch(error => {
                console.error('error adding fmp4 muxing ' + mp4Muxing.name, error);
                reject(error);
            });
    });
};

const addStream = (encoding, stream) => {
    const addStreamPromise = bitmovin.encoding.encodings(encoding.id).streams.add(stream);

    return new Promise((resolve, reject) => {
        addStreamPromise
            .then(addedStream => {
                console.log('stream resource successfully added');
                resolve(addedStream);
            })
            .catch(error => {
                console.error('unable to add stream to encoding', error);
                reject(error);
            });
    });
};

const createS3Input = input => {
    const inputCreatePromise = bitmovin.encoding.inputs.s3.create(input);

    return new Promise((resolve, reject) => {
        inputCreatePromise
            .then(createdInput => {
                console.log('s3 input successfully created');
                resolve(createdInput);
            })
            .catch(error => {
                console.error('error creating s3 input', error);
                reject(error);
            });
    });
};

const createS3Output = output => {
    const outputCreatePromise = bitmovin.encoding.outputs.s3.create(output);

    return new Promise((resolve, reject) => {
        outputCreatePromise
            .then(createdOutput => {
                console.log('S3 output successfully created');
                resolve(createdOutput);
            })
            .catch(error => {
                console.error('error creating s3 output', error);
                reject(error);
            });
    });
};

const createH264CodecConfiguration = codecConfig => {
    const codecConfigPromise = bitmovin.encoding.codecConfigurations.h264.create(codecConfig);

    return new Promise((resolve, reject) => {
        codecConfigPromise
            .then(createdConfig => {
                console.log('h264 Codec configuration ' + codecConfig.name + ' successfully created');
                resolve(createdConfig);
            })
            .catch(error => {
                console.error('error creating h264 codec config ' + codecConfig.name);
                reject(error);
            });
    });
};

const createAACCodecConfiguration = codecConfig => {
    const codecConfigPromise = bitmovin.encoding.codecConfigurations.aac.create(codecConfig);

    return new Promise((resolve, reject) => {
        codecConfigPromise
            .then(createdConfig => {
                console.log('aac Codec configuration ' + codecConfig.name + ' successfully created');
                resolve(createdConfig);
            })
            .catch(error => {
                console.error('error creating aac codec config ' + codecConfig.name);
                reject(error);
            });
    });
};

const createEncoding = encoding => {
    const encodingPromise = bitmovin.encoding.encodings.create(encoding);

    return new Promise((resolve, reject) => {
        encodingPromise
            .then(createdEncoding => {
                console.log('encoding ' + encoding.name + ' successfully created');
                resolve(createdEncoding);
            })
            .catch(error => {
                console.error('error creating encoding ' + encoding.name);
                reject(error);
            });
    });
};

const exit = (code, message) => {
    console.error('ERROR: ', message, 'Exiting with code ', code);
    process.exit(code);
};

main()
    .then(() => {
        console.log('finished!');
    })
    .catch(error => {
        exit(100, error);
    });
