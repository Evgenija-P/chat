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
    <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 p-4 ">
      <div className="text-center text-white text-xl">
        <h1 className="text-3xl mb-3">Join</h1>
        <form className="p-8 flex flex-col gap-y-2 bg-indigo-900 rounded-xl">
          <div className="">
            <input
              type="text"
              name="name"
              value={values[NAME]}
              placeholder="Name"
              onChange={handleChange}
              autoComplete="off"
              required
              className="text-indigo-800 rounded-lg px-2 py-1 outline-none"
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
              className="text-indigo-800 rounded-lg px-2 py-1 outline-none"
            />
          </div>
          <Link
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
            onClick={handleClick}
          >
            <button
              type="submit"
              className="bg-white w-full rounded-lg text-2xl text-indigo-800 py-1 mt-2 hover:shadow-[0_5px_20px_-5px_rgba(241,232,249,0.3)] focus:shadow-[0_5px_20px_-5px_rgba(241,232,249,0.3)]"
            >
              Sing In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
