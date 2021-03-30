import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Counter } from './Counter';

export function Product({ clickHandler, productPrice }) {
  const [quantity, setQuantity] = useState(1);
  const currencySymbol = {
    euro: '€',
    us: '$',
  };
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: '50%',
          marginTop: '80px',
          marginLeft: '200px',
          'box-shadow': '0px 0px 11px -2px rgba(184,180,184,1)',
          width: '800px',
          height: '800px',
        }}
      >
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
          style={{ marginTop: '350px' }}
        >
          Here you can choose the amount of time you want to send his letter
        </Typography>
      </div>
      <div
        style={{
          marginTop: '80px',
          // 'border-left': '1px solid grey',
          'box-shadow': '0px 0px 11px -2px rgba(184,180,184,1)',
          width: '800px',
          height: '800px',
        }}
      >
        <div
          style={{
            paddingLeft: '20px',
            marginTop: '200px',
            marginLeft: '200px',
          }}
        >
          <h2 style={{ 'font-size': '20px', color: 'grey' }}>
            In-Country Letter
          </h2>
          <img
            alt="letter"
            src="/images/mail.png"
            width="350px"
            height="250px"
          />
          <div style={{ marginLeft: '110px', marginBottom: '10px' }}>
            <Counter currentValue={quantity} newValueSetter={setQuantity} />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: '100px' }}
            onClick={() =>
              clickHandler('payment', productPrice.priceId, quantity)
            }
          >
            Buy {currencySymbol[productPrice.currency]}{' '}
            {(productPrice.unitAmount / 100) * quantity}
          </Button>
        </div>
      </div>
    </div>
  );
}
