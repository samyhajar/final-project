import React, { useState } from 'react';
import Axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { API_KEY } from './constants';
import { PdfDocument } from './Movie';

export default function MovieList() {
  return (
    <div className="container">
      <p>hello world</p>
      {show && (
        <PDFDownloadLink
          document={<PdfDocument data={movieDetails} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download Pdf'
          }
        </PDFDownloadLink>
      )}
    </div>
  );
}
