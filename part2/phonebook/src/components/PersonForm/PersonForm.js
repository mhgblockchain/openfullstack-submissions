const PersonForm = ({ handleSubmit, name, number, handleChange }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter name:{" "}
          <input
            type="text"
            name="name"
            value={name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter phone number: {""}
          number:{" "}
          <input
            type="text"
            name="number"
            value={number || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default PersonForm;
