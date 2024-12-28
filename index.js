import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const clerkFrontendApi = 'your-clerk-frontend-api'; // Replace with your Clerk Frontend API key.

ReactDOM.render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);
