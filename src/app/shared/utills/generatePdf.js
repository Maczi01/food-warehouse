import jsPDF from 'jspdf';
import PropTypes from 'prop-types';

export const generatePdf = (data) => {
  const doc = new jsPDF('p', 'pt');
  doc.text(220, 30, 'Shopping list');
  const rows = [];
  data.map((item, index) => rows.push([index + 1, item.name, item.neededQuantity, item.unit]));
  doc.autoTable({
    head: [['Index', 'Name', 'Quantity', 'Unit']],
    body: rows,
  });
  doc.save('shopping-list.pdf');
};

generatePdf.propTypes = {
  data: PropTypes.array,
};

generatePdf.defaultProps = {
  data: [],
};
