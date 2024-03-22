import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import HomePage from './pages/HomePage';
import SubmissionForm from './pages/SubmissionForm';
import DisplayPage from './pages/DisplayPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmissionForm />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;