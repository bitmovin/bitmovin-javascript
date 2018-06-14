import contactDetails from './contactDetails';
import invoices from './invoices';
import statements from './statements';

const billing = configuration => {
  return {
    statements: statements(configuration),
    invoices: invoices(configuration),
    contactDetails: contactDetails(configuration)
  };
};

export default billing;
