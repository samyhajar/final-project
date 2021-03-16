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

const MyDocument = (props) => (
  <Document>
    <Page size="A4">
      <View>
        <Text>{props.name}</Text>
        <Text>{props.address}</Text>
        <Text>{props.optionalAddress}</Text>
        <Text>{props.ort}</Text>
        <Text>{props.plz}</Text>
        <Text>{props.staat}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
