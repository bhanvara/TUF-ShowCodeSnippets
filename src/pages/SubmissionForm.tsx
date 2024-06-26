import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { delay } from 'q';
console.log("BackendUrl: ", process.env.REACT_APP_API_URL);

export default function SubmissionForm() {
    const [formData, setFormData] = useState({
        username: '',
        preferredCodeLanguage: '',
        stdin: '',
        sourceCode: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formDataForAPI = {
            "username": formData.username,
            "code_language": formData.preferredCodeLanguage,
            "stdin": formData.stdin,
            "source_code": formData.sourceCode
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/submit/submitcode`, formDataForAPI);
            console.log(response.data);
            if (response.status === 201) {
                setFormData({
                    username: '',
                    preferredCodeLanguage: '',
                    stdin: '',
                    sourceCode: ''
                });
                setLoading(false);
                alert(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            alert('Error occurred while submitting the code.');
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-lg">
                    <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Preferred Code Language
                            </label>
                            <select
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="preferredCodeLanguage"
                                value={formData.preferredCodeLanguage}
                                onChange={handleChange}
                                title="Preferred Code Language"
                            >
                                <option value="">Select a language</option>
                                <option value="C++">C++</option>
                                <option value="Java">Java</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stdin">
                                Standard Input (stdin)
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="stdin"
                                rows={4} // Fix: Change rows="4" to rows={4}
                                placeholder="Enter standard input"
                                name="stdin"
                                value={formData.stdin}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sourceCode">
                                Source Code
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="sourceCode"
                                rows={4}
                                placeholder="Enter your source code"
                                name="sourceCode"
                                value={formData.sourceCode}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="flex items-center">
                            <button disabled={loading}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Submit
                            </button>
                            {loading && <div className="flex items-center justify-center pl-2">
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                            </div>}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
