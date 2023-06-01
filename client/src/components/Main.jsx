import { useState } from 'react';
import { Link } from 'react-router-dom';

const FIELDS = {
  NAME: 'name',
  ROOM: 'room',
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = e => {
    const isDisabled = Object.values(values).some(value => !value);
    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div>
        <h1>Join</h1>
        <form>
          <div>
            <input
              type="text"
              name="name"
              value={values[NAME]}
              placeholder="Name"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="room"
              value={values[ROOM]}
              placeholder="Room"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <Link
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
            onClick={handleClick}
          >
            <button type="submit">Sing In</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
