const addressInfo = ({ address, setAddress }) => {
  return (
    <ul style={{ listStyleType: 'none' }}>
      <li>
        <input
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'transparent',
          }}
          placeholder="First and Last Name"
          value={address.name}
          onChange={(event) => {
            setAddress({
              ...address,
              name: event.currentTarget.value,
            });
          }}
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
          value={address.address}
          onChange={(event) => {
            setAddress({
              ...address,
              address: event.currentTarget.value,
            });
          }}
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
          value={address.optionalAddress}
          onChange={(event) => {
            setAddress({
              ...address,
              optionalAddress: event.currentTarget.value,
            });
          }}
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
          value={address.ort}
          onChange={(event) => {
            setAddress({
              ...address,
              ort: event.currentTarget.value,
            });
          }}
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
          value={address.plz}
          onChange={(event) => {
            setAddress({
              ...address,
              plz: event.currentTarget.value,
            });
          }}
          id="standard-number"
          label="PLZ"
          type="number"
          inputlabelprops={{
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
          value={address.staat}
          onChange={(event) => {
            setAddress({
              ...address,
              staat: event.currentTarget.value,
            });
          }}
          label="Staat"
          id="standard-size-small"
          size="small"
        />
      </li>
    </ul>
  );
};

export default addressInfo;
