import Image from 'next/image';
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

const Article = () => (
  <div>
    <h1>Pdf</h1>
    <Document>
      <Page size="A4">
        <div>
          <Paper
            sx={{
              height: '29.7cm',
              width: '21cm',
              margin: ' 0 400px',
            }}
            elevation={6}
          >
            <form>
              <TextField
                style={{ marginLeft: '550px', marginTop: '20px' }}
                id="outlined-multiline-static"
                label="Sender"
                multiline
                rows={7}
                placeholder="Vor und Nachname
                  Adresse, Hausnummer, Tür/Stiege/Stock, Ort, Staat"
                variant="outlined"
              />
              <hr style={{ marginLeft: '20px', width: '50%' }} />
              <TextField
                size="small"
                style={{
                  marginLeft: '20px',
                  marginTop: '0px',
                  width: '400px',
                }}
                id="outlined-basic"
                label="Recipient"
                variant="outlined"
              />
            </form>
            <form>
              <hr style={{ marginLeft: '20px', width: '50%' }} />
              <TextField
                style={{ marginLeft: '20px', marginTop: '40px' }}
                id="outlined-multiline-static"
                label="Sender"
                multiline
                rows={7}
                defaultValue="Vor und Nachname
              Adresse, Hausnummer, Tür/Stiege/Stock,  \n Ort, Staat"
                variant="outlined"
              />
            </form>
            <form style={{ marginLeft: '550px', marginTop: '10px' }} noValidate>
              <TextField
                id="date"
                label="Datum"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <hr style={{ marginLeft: '20px', width: '50%' }} />
            <form>
              <TextField
                id="outlined-full-width"
                label="Body"
                style={{
                  width: '650px',
                  height: '200px',
                  marginLeft: '30px',
                  padding: '5px',
                  marginTop: '10px',
                }}
                rows={20}
                s
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                margin="normal"
                multiline
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </form>
          </Paper>
        </div>
      </Page>
    </Document>
  </div>
);

export default Article;
