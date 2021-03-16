import React from 'react';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';
import MyDocument from '../components/Mydocument';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function MovieList() {
  return (
    <>
      <PDFViewer style={{ height: '21cm', width: '20cm' }}>
        <MyDocument />
      </PDFViewer>
      <PDFDownloadLink
        document={<MyDocument />}
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
    </>
  );
}
