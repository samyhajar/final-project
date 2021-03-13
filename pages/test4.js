import { PDFDownloadLink } from '@react-pdf/renderer';

import MyDocument from '../components/Mydocument';

export default function MyDoc() {
  return (
    <div suppressHydrationWarning={true}>
      {process.browser && (
        <PDFDownloadLink
          document={<MyDocument name="Samy Hajar" />}
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
