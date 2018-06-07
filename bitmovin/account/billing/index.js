import statements from './statements';
import invoices from './invoices';
import contactDetails from './contactDetails';

const billing = configuration => {
  return {
    statements: statements(configuration),
    invoices: invoices(configuration),
    contactDetails: contactDetails(configuration)
  };
};

export default billing;
