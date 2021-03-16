import pdfMake from 'pdfmake/build/pdfmake';
import { Paper, TextField } from '@material-ui/core';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from 'react';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function AppComponent() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [optionalAddress, setOptionalAddress] = useState('');
  const [ort, setOrt] = useState('');
  const [plz, setPlz] = useState();
  const [staat, setStaat] = useState('');
  const [body, setBody] = useState('');
  function generatePDF() {
    if (!process.browser) return;

    var docDefinition = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph

        // using a { text: '...' } object lets you set styling properties
        { text: name, fontSize: 15, margin: [0, 60, 0, 0] },
        { text: address, fontSize: 15 },

        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        { text: ort },
        { text: plz },
        { text: staat },
      ],
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getDataUrl(setUrl);
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <Paper
            sx={{
              height: '29.7cm',
              width: '21cm',
              margin: ' 40px 40px',
              paddingTop: '10px',
            }}
            elevation={6}
          >
            <form sx={{ display: 'block' }}>
              <TextField
                value={name}
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
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
            </form>
            <form>
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
                value={body}
                onChange={(event) => setBody(event.currentTarget.value)}
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
        <div>
          <iframe
            style={{
              left: '50%',
              width: '50%',
              position: 'absolute',
              height: '80%',
            }}
            // height: 100%;
            // right: 0;
            // top: 0;
            // bottom: 0;
            // position: absolute;"
            title="hello"
            src={url}
            width="100%"
            height="500px"
          />
        </div>
      </div>
      <div>
        <button onClick={generatePDF}>Generate PDF</button>;
      </div>
    </div>
  );
}
