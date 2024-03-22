import React, { useEffect, useState } from 'react';

interface Entry {
  username: string;
  codeLanguage: string;
  stdin: string;
  timestamp: Date;
  sourceCode: string;
}

export default function DisplayPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    // Replace this with the actual API call
    fetch('/api/entries')
      .then(response => response.json())
      .then(data => setEntries(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Code Language</th>
          <th>Stdin</th>
          <th>Timestamp</th>
          <th>Source Code</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td>{entry.username}</td>
            <td>{entry.codeLanguage}</td>
            <td>{entry.stdin}</td>
            <td>{entry.timestamp.toString()}</td>
            <td>{entry.sourceCode.substring(0, 100)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}