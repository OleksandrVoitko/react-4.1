export function Filter({ filter, onChange }) {
  return (
    <>
      <label className="form-label" htmlFor="inputFilter">
        Find contacts by name:
      </label>
      <input
        name="filter"
        type="text"
        className="form-control"
        id="inputFilter"
        required
        value={filter}
        onChange={onChange}
      />
    </>
  );
}
