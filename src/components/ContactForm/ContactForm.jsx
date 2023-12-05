import { useState } from "react";

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChangeName = ({ target }) => {
    setName(target.value);
  };
  const handleChangeNumber = ({ target }) => {
    setNumber(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(name, number);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="inputName">
          Name
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          id="inputName"
          required
          value={name}
          onChange={handleChangeName}
        />
        <label className="form-label" htmlFor="inputNumber">
          {" "}
          Number
        </label>
        <input
          name="number"
          type="telephone"
          className="form-control"
          id="inputNumber"
          required
          value={number}
          onChange={handleChangeNumber}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};
