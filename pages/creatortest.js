import pdfMake from 'pdfmake/build/pdfmake';
import { Paper, input, Button, Typography, TextField } from '@material-ui/core';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { compareAsc, format } from 'date-fns';
import AddressInfo from '../components/addressInfo';

// import { getServerSideProps } from './logout';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function AppComponent() {
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [sender, setSender] = useState({
    name: '',
    address: '',
    optionalAddress: '',
    ort: '',
    plz: '',
    staat: '',
  });
  const [recipient, setRecipient] = useState({
    name: '',
    address: '',
    optionalAddress: '',
    ort: '',
    plz: '',
    staat: '',
  });
  const router = useRouter();

  async function createDocument() {
    const response = await fetch('/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender,
        recipient,
        body,
        date,
      }),
    });
    if (!process.browser) return;
    const docDefinition = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        // using a { text: '...' } object lets you set styling properties
        { text: sender.name, fontSize: 10, margin: [400, 2, 10, 0] },
        {
          text: sender.address,
          fontSize: 10,
          style: 'header',
          margin: [400, 2, 10, 0],
        },
        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        { text: sender.ort, fontSize: 10, margin: [400, 2, 10, 0] },
        { text: sender.plz, fontSize: 10, margin: [400, 2, 10, 0] },
        { text: sender.staat, fontSize: 10, margin: [400, 2, 10, 10] },
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
        {
          text: recipient.name,
          fontSize: 15,
          margin: [40, 20, 10, 0],
          bold: false,
        },
        {
          text: recipient.address,
          fontSize: 15,
          margin: [40, 20, 10, 0],
          bold: false,
        },
        {
          text: recipient.optionalAddress,
          fontSize: 15,
          margin: [40, 20, 10, 0],
          bold: false,
        },
        {
          text: recipient.ort,
          fontSize: 15,
          margin: [40, 20, 10, 0],
          bold: false,
        },
        {
          text: recipient.plz,
          fontSize: 15,
          margin: [40, 20, 10, 0],
          bold: false,
        },
        {
          text: recipient.staat,
          fontSize: 15,
          margin: [40, 20, 10, 0],
          bold: false,
        },
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
        { text: date, fontSize: 10, margin: [320, 10, 10, 0] },
        { text: body, fontSize: 12, margin: [40, 40, 10, 0] },
      ],
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getDataUrl(setUrl);

    router.push('/documents/doctest');
  }

  const mapSenderAddress = () => {
    return sender.name + ', ' + sender.ort;
  };

  return (
    <div className="creator">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#F5F7FA',
        }}
      >
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
              <AddressInfo address={sender} setAddress={setSender} />
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
                value={mapSenderAddress()}
                readonly
                size="small"
                // className={classes.inputField}
                style={{
                  marginLeft: '30px',
                  marginTop: '0px',
                  width: '400px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'transparent',
                  userSelect: 'none',
                }}
                id="outlined-basic"
                label="sender"
                variant="outlined"
              />
            </form>
            <form>
              <hr style={{ marginLeft: '20px', width: '50%' }} />
              <AddressInfo address={recipient} setAddress={setRecipient} />
              {/* <TextField
                placeholder="Recipient"
                value={recipient.name + recipient}
                onChange={(event) => setRecipient(event.currentTarget.value)}
                style={{
                  marginLeft: '30px',
                  height: '100px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'transparent',
                }}
                id="outlined-multiline-static"
                rows={5}
                rowsMax={5}
                multiline
                className="recipient-input"
              /> */}
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
                style={{
                  border: '1px solid',
                  borderRadius: '5px',
                  borderDecoration: 'none',
                }}
                type="date"
                value={date}
                onChange={(event) => setDate(event.currentTarget.value)}
                id="date"
                label="Datum"
                inputlabelprops={{
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
                  height: '400px',
                  marginLeft: '30px',
                  padding: '5px',
                  marginTop: '40px',
                  background: '#F5F7FA',
                  borderRadius: '5px',
                  borderColor: 'transparent',
                }}
                rows={50}
                margin="normal"
                multiline
                inputlabelprops={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </form>
          </Paper>
        </div>
        <div>
          {/* <Typography
            style={{ marginTop: '200px', marginLeft: '70px' }}
            align="center"
            color="textSecondary"
            component="p"
          >
            Here you can easily just enter your informations
            <br /> and anything you need to have in your letter, we will take
            care of the Layout for you so the letter fits the rules of Windowed
            Letter
          </Typography> */}
          <Button
            variant="contained"
            align="center"
            style={{
              marginLeft: '70px',
              marginTop: '50px',
              backgroundColor: '#F7C948',
              color: '#8D2B0B',
              height: '46px',
              fontSize: '15px',
            }}
            onClick={createDocument}
          >
            Save & Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
