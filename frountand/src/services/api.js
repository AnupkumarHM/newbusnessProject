import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users/user`);
  
  return response.data;

};
const generateInvoice = async (invoiceData) => {
    const response = await axios.post(`${API_BASE_URL}/invoices/generate`, invoiceData);
  
    return response.data.pdfBuffer;
  };
// const generateInvoice = async (invoiceData) => {
//   const response = await axios.post(`${API_BASE_URL}/invoices/generate`, invoiceData);
//   console.log(response.data)

//   return response.data;
// };
const registerUser = async (userData) => {
    console.log(userData)
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData,{      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct header
      },});
    return response.data;
  };
  const Logging = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
    return response.data;
  };
  const downloadInvoice = async (invoiceData) => {
    try {
      const pdfBlob = await generateInvoice(invoiceData);
      console.log(pdfBlob.data)
      const binaryPdfData = new Uint8Array(pdfBlob.data); 
      // Create a Blob URL
      const url = window.URL.createObjectURL(new Blob([binaryPdfData], { type: 'application/pdf' }));
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };
  

export default {
  fetchUsers,
  generateInvoice,
  downloadInvoice,
  registerUser,
  Logging
};
