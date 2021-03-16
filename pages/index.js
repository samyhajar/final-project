import React from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import { positions } from '@material-ui/system';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Button from '@material-ui/core/Button';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, PDFDownloadLink } from '@react-pdf/renderer';
import { useState } from 'react';

import ReactPDF from '@react-pdf/renderer';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(24),
      height: theme.spacing(24),
      display: 'block',
    },
  },
  customBorderRadius: {
    borderRadius: 25,
  },
  textField: {
    width: theme.spacing(),
  },
}));

export default function Home(props) {
  const [inputName, setInputName] = useState('');
  const classes = useStyles();
  console.log(inputName);
  return (
    <div>
      <h1>Pdf</h1>
      <Document>
        <Page size="A4"></Page>
      </Document>
    </div>
  );
}
