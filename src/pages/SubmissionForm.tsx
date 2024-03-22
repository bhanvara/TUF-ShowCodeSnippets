import React, { useState } from 'react';

export default function SubmissionForm() {
  const [username, setUsername] = useState('');
  const [preferredCodeLanguage, setPreferredCodeLanguage] = useState('');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Preferred Code Language:
        <select value={preferredCodeLanguage} onChange={e => setPreferredCodeLanguage(e.target.value)}>
          <option value="">Select...</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
        </select>
      </label>
      <label>
        Standard Input (stdin):
        <textarea value={stdin} onChange={e => setStdin(e.target.value)} />
      </label>
      <label>
        Source Code:
        <textarea value={sourceCode} onChange={e => setSourceCode(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}