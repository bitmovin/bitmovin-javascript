import codecConfigurations from './codecConfigurations';
import {Encodings} from './encodings';
import encodings from './encodings';
import filters from './filters';
import infrastructure from './infrastructure';
import inputs from './inputs';
import manifests from './manifests';
import outputs from './outputs';
import statistics from './statistics';

export interface Encoding {
  encodings: Encodings;
  codecConfigurations: any;
  inputs: any;
  outputs: any;
  manifests: any;
  filters: any;
  statistics: any;
  infrastructure: any;
}

const encoding = internalConfig => ({
  encodings: encodings(internalConfig),
  codecConfigurations: codecConfigurations(internalConfig),
  inputs: inputs(internalConfig),
  outputs: outputs(internalConfig),
  manifests: manifests(internalConfig),
  filters: filters(internalConfig),
  statistics: statistics(internalConfig),
  infrastructure: infrastructure(internalConfig)
});

export default encoding;
