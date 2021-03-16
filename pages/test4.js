import { Paper, TextField } from '@material-ui/core';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState } from 'react';

import MyDocument from '../components/Mydocument';

export default function MyDoc() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [optionalAddress, setOptionalAddress] = useState('');
  const [ort, setOrt] = useState('');
  const [plz, setPlz] = useState();
  const [staat, setStaat] = useState('');

  return (
    <div suppressHydrationWarning={true}>
      {process.browser && (
        <PDFDownloadLink
          document={<MyDocument name={name} address={address} />}
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
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              label="Vor/Nachname"
              id="standard-size-small"
              size="small"
            />
            <TextField
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
              label="Addresse und Hausnummer"
              id="standard-size-small"
              size="small"
            />
            <TextField
              value={optionalAddress}
              onChange={(event) =>
                setOptionalAddress(event.currentTarget.value)
              }
              label="Tür/Stiege/Stock/Block"
              id="standard-size-small"
              size="small"
            />
            <TextField
              value={ort}
              onChange={(event) => setOrt(event.currentTarget.value)}
              label="Ort"
              id="standard-size-small"
              size="small"
            />
            <TextField
              value={plz}
              onChange={(event) => setPlz(event.currentTarget.value)}
              id="standard-number"
              label="PLZ"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />
            <TextField
              value={staat}
              onChange={(event) => setStaat(event.currentTarget.value)}
              label="Staat"
              id="standard-size-small"
              size="small"
            />
            <hr style={{ marginLeft: '20px', width: '50%' }} />
            <TextField
              size="small"
              // className={classes.inputField}
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
    </div>
  );
}
