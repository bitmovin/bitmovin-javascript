const Bitmovin = require('bitmovin-javascript').default;

const BITMOVIN_API_KEY = '<INSERT_YOUR_API_KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

const ENCODING_NAME = 'simple_smooth_encoding';

const INPUT_FILE_HOST = '<INPUT_FILE_HOST>';
const INPUT_FILE_PATH = '/path/to/your/input/file.mp4';

const S3_ACCESS_KEY = '<YOUR_S3_ACCESS_KEY>';
const S3_SECRET_KEY = '<YOUR_S3_SECRET_KEY>';
const S3_BUCKET_NAME = '<YOUR_S3_BUCKET>';
const OUTPUT_PATH = '/path/to/your/output/destination/';

const httpInput = {
  name: 'HTTP input',
  host: INPUT_FILE_HOST
};

const s3Output = {
  name: 'S3 output',
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
  bucketName: S3_BUCKET_NAME
};

const aacConfiguration = {
  codec: {
    name: 'English',
    bitrate: 128000,
    rate: 48000
  },
  stream: {
    position: 0,
    selectionMode: 'AUDIO_RELATIVE',
    language: 'english'
  }
};

const h264Configuration = {
  codec: {
    name: 'simple encoding - H264 1080p',
    bitrate: 4800000,
    rate: 24.0,
    height: 1080,
    profile: 'HIGH'
  },
  stream: {
    position: 0,
    selectionMode: 'VIDEO_RELATIVE'
  }
};

const encodingResource = {
  name: ENCODING_NAME
};

async function main() {
  try {
    const config = await setUpConfiguration();
    const streams = await addStreams(config);
    await addMuxing(config, streams);
    await startEncoding(config.encoding.id);
  } catch (e) {
    console.error(e.message);
  }

}

async function setUpConfiguration() {
  const input = await bitmovin.encoding.inputs.http.create(httpInput);
  const output = await bitmovin.encoding.outputs.http.create(s3Output);
  const aac = await bitmovin.encoding.codecConfigurations.aac.create(aacConfiguration.codec);
  const h264 = await bitmovin.encoding.codecConfigurations.h264.create(h264Configuration.codec);
  // part above is optional actually because you can create all settings manually with website UI
  // in your account once and use just IDs. you don't need to create it each time

  const encoding = await bitmovin.encoding.encodings.create(encodingResource);

  return {input, output, aac, h264, encoding};
}

async function addStreams({input, output, aac, h264, encoding}, {audioStreamConfig, videoStreamConfig}) {
  const inputStream = {
    inputId: input.id,
    inputPath: INPUT_FILE_PATH
  };

  const audioStream = {
    inputStreams: [
      {
        ...inputStream,
        selectionMode: audioStreamConfig.selectionMode,
        position: audioStreamConfig.position
      }],
    codecConfigId: aac.id
  };
  const videoStream = {
    inputStreams: [
      {
        ...inputStream,
        selectionMode: videoStreamConfig.selectionMode,
        position: videoStreamConfig.position
      }],
    codecConfigId: h264.id
  };

  const audio = await this.bitmovin.encoding.encodings(encoding.id).streams.add(audioStream);
  const video = await this.bitmovin.encoding.encodings(encoding.id).streams.add(videoStream);

  return {audio, video};

}

async function addMuxing(encoding, {output, audio, video}, filename) {
  const streams = [
    {streamId: video.id},
    {streamId: audio.id}];
  const mp4Muxing = {
    name: 'MP4',
    streams,
    outputs: [
      {
        outputId: output.id,
        outputPath: OUTPUT_PATH,
        acl: [{permission: 'PUBLIC_READ'}]
      }],
    filename
  };
  return this.bitmovin.encoding.encodings(encoding.id).muxings.mp4.add(mp4Muxing);
}

async function startEncoding(encodingId) {
  return bitmovin.encoding.encodings(encodingId).start();
}

function exit(code, message) {
  console.error('ERROR: ', message, 'Exiting with code ', code);
  process.exit(code);
}

main()
  .then(() => {
    console.log('finished!');
  })
  .catch(error => {
    exit(100, error);
  });
