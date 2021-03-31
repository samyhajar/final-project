import pdfMake from 'pdfmake/build/pdfmake';
import { Paper, input, Button, Typography } from '@material-ui/core';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { getServerSideProps } from './logout';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// TODO LIST :
// FiX HOME PAGE MAKE IT NICE BABY !!!!!!!!!!!!!
// Preview of saved document that is State Active Clickable Sidebar (iframe?) //
// CREATE A COMPONENT
// Add link to edit document ( go to save and brings you back to document list )
// link that redirects you the payment page of the post (puppeteer)
// END TO END TESTS, UNIT TEST and 5 Typescript files

// Additional Features:
// instead of payment form of post but to stripe then Puppeteer runs everything once
// Pay to post from stripe from own account

export default function AppComponent() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [optionalAddress, setOptionalAddress] = useState('');
  const [ort, setOrt] = useState('');
  const [plz, setPlz] = useState();
  const [staat, setStaat] = useState('');
  const [body, setBody] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  async function createDocument() {
    const response = await fetch('/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        address: address,
        optionalAddress: optionalAddress,
        ort: ort,
        plz: plz,
        staat: staat,
        sender: sender,
        recipient: recipient,
        date: date,
        body: body,
      }),
    });
    if (!process.browser) return;
    var docDefinition = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        // using a { text: '...' } object lets you set styling properties
        { text: name, fontSize: 10, margin: [400, 2, 10, 0] },
        {
          text: address,
          fontSize: 10,
          style: 'header',
          margin: [400, 2, 10, 0],
        },
        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        { text: ort, fontSize: 10, margin: [400, 2, 10, 0] },
        { text: plz, fontSize: 10, margin: [400, 2, 10, 0] },
        { text: staat, fontSize: 10, margin: [400, 2, 10, 10] },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 400 - 2 * 40,
              y2: 5,
              lineWidth: 0.5,
            },
          ],
        },
        { text: sender, fontSize: 10, margin: [40, 0, 10, 0] },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 400 - 2 * 40,
              y2: 5,
              lineWidth: 0.5,
            },
          ],
        },
        { text: recipient, fontSize: 15, margin: [40, 30, 10, 0], bold: false },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 400 - 2 * 40,
              y2: 5,
              lineWidth: 0.5,
            },
          ],
        },
        { text: date, fontSize: 10, margin: [450, 30, 10, 0] },
        { text: body, fontSize: 12, margin: [40, 40, 10, 0] },
      ],
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getDataUrl(setUrl);

    router.push('/documents');
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ paddingLeft: '100px', paddingTop: '50px' }}>
          <Paper
            sx={{
              height: '29.7cm',
              width: '21cm',
              margin: '0 auto',
              paddingTop: '10px',
            }}
            elevation={6}
          >
            <div
              style={{
                height: '6.5cm',
                display: 'block',
                marginLeft: '570px',
              }}
            >
              <ul style={{ 'list-style-type': 'none' }}>
                <li>
                  <input
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'transparent',
                    }}
                    placeholder="First and Last Name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    label="Vor/Nachname"
                    id="standard-size-small"
                    size="small"
                  />
                </li>
                <li>
                  <input
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'transparent',
                    }}
                    placeholder="address"
                    value={address}
                    onChange={(event) => setAddress(event.currentTarget.value)}
                    label="Adresse und Hausnummer"
                    id="standard-size-small"
                    size="small"
                  />
                </li>
                <li>
                  <input
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'transparent',
                    }}
                    placeholder="Optional Address"
                    value={optionalAddress}
                    onChange={(event) =>
                      setOptionalAddress(event.currentTarget.value)
                    }
                    label="Tür/Stiege/Stock/Block"
                    id="standard-size-small"
                    size="small"
                  />
                </li>
                <li>
                  <input
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'transparent',
                    }}
                    placeholder="Ort"
                    value={ort}
                    onChange={(event) => setOrt(event.currentTarget.value)}
                    label="Ort"
                    id="standard-size-small"
                    size="small"
                  />
                </li>
                <li>
                  <input
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'transparent',
                    }}
                    placeholder="PLZ"
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
                </li>
                <li>
                  <input
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'transparent',
                    }}
                    placeholder="Staat"
                    value={staat}
                    onChange={(event) => setStaat(event.currentTarget.value)}
                    label="Staat"
                    id="standard-size-small"
                    size="small"
                  />
                </li>
              </ul>
            </div>
            <form>
              <hr
                style={{
                  marginLeft: '20px',
                  width: '50%',
                  marginTop: '0',
                }}
              />
              <input
                placeholder="Sender"
                value={sender}
                onChange={(event) => setSender(event.currentTarget.value)}
                size="small"
                // className={classes.inputField}
                style={{
                  marginLeft: '30px',
                  marginTop: '0px',
                  width: '400px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'transparent',
                }}
                id="outlined-basic"
                label="sender"
                variant="outlined"
              />
            </form>
            <form>
              <hr style={{ marginLeft: '20px', width: '50%' }} />
              <textarea
                placeholder="Recipient"
                value={recipient}
                onChange={(event) => setRecipient(event.currentTarget.value)}
                style={{
                  marginLeft: '30px',
                  height: '100px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'transparent',
                }}
                id="outlined-multiline-static"
                label="recipient"
                multiline
                variant="outlined"
              />
            </form>
            <form
              style={{
                marginLeft: '550px',
                // marginTop: '20px',
                background: 'transparent',
                border: 'none',
                outline: 'transparent',
              }}
              noValidate
            >
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.currentTarget.value)}
                id="date"
                label="Datum"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <hr style={{ marginLeft: '20px', width: '50%' }} />
            <form>
              <textarea
                placeholder="body"
                value={body}
                onChange={(event) => setBody(event.currentTarget.value)}
                id="outlined-full-width"
                label="Body"
                style={{
                  width: '700px',
                  height: '600px',
                  marginLeft: '30px',
                  padding: '5px',
                  marginTop: '40px',
                  // outline: 'transparent',
                  background: 'transparent',
                  // border: 'none',
                  'border-radius': '5px',
                }}
                rows={50}
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
          <Typography
            style={{ marginTop: '200px', marginLeft: '90px' }}
            align="center"
            color="textSecondary"
            component="p"
          >
            Here you can easily just enter your informations
            <br /> and anything you need to have in your letter, we will take
            care of the Layout for you so the letter fits the rules of Windowed
            Letter
          </Typography>
          <Button
            variant="contained"
            color="primary"
            align="center"
            style={{ marginLeft: '370px', marginTop: '100px' }}
            onClick={createDocument}
          >
            Save & Preview
          </Button>
        </div>
      </div>
    </div>
  );
}