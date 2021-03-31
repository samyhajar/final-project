import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Counter } from './Counter';

export function Product({ clickHandler, productPrices, id }) {
  const [quantity, setQuantity] = useState(1);
  const currencySymbol = {
    euro: '€',
    us: '$',
  };

  console.log('log', productPrices);
  return (
    <div>
      <div style={{ marginLeft: '110px', marginBottom: '10px' }}>
        <div style={{ marginLeft: '110px', marginTop: '30px' }}>
          <Counter currentValue={quantity} newValueSetter={setQuantity} />
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: '100px' }}
            onClick={() =>
              clickHandler('payment', productPrices[0].envVarKey, quantity)
            }
          >
            Buy {currencySymbol[productPrices[0].currency]}{' '}
            {(productPrices[0].unitAmount / 100) * quantity}
          </Button>
        </div>
      </div>
    </div>
  );
}
