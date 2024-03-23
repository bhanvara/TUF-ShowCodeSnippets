import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/submit');
  }, [navigate]);

  return (
    <div>
      {/* The page will redirect to /submit */}
    </div>
  )
}