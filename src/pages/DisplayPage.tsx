import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DisplayPage() {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    axios.get(`${process.env.REACT_APP_API_URL}/entries/getentries`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setEntries(response.data as never[]);
        } else {
          console.error('API response is not an array');
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleOpen = (code: any) => {
    setSelectedCode(code);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto p-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Code Language</th>
              <th className="px-4 py-2">Stdin</th>
              <th className="px-4 py-2">Submission Time</th>
              <th className="px-4 py-2">Source Code</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(entries) && entries.map((entry: { id: string, username: string, code_language: string, stdin: string, submission_time: string, source_code: string }, index: number) => (
                <tr key={entry.id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                    <td className="border px-4 py-2">{entry.id}</td>
                    <td className="border px-4 py-2">{entry.username}</td>
                    <td className="border px-4 py-2">{entry.code_language}</td>
                    <td className="border px-4 py-2">{entry.stdin}</td>
                    <td className="border px-4 py-2">{new Date(entry.submission_time).toLocaleString()}</td>
                    <td className="border px-4 py-2">
                        <button onClick={() => handleOpen(entry.source_code)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Show Code
                        </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
        {open && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Source Code
                      </h3>
                      <div className="mt-2">
                        <pre className="text-sm text-gray-500">{selectedCode}</pre>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DisplayPage;