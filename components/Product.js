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
      <div>
        <br />
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: '60%',
              color: '#8D2B0B',
              backgroundColor: '#F7C948',
            }}
            onClick={() =>
              clickHandler('payment', productPrices.envVarKey, quantity)
            }
          >
            Buy {currencySymbol[productPrices.currency]}{' '}
            {/* {(productPrices.unitAmount / 100) * quantity} */}
          </Button>
        </div>
      </div>
    </div>
  );
}
