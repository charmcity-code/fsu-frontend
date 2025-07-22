import useMutation from "../api/useMutation";

export default function ProfessorForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/professors", ["professors"]);

  const addProfessor = (formData) => {
    const name = formData.get("name");
    const area = formData.get("area");
    add({ name, area });
  };

  return (
    <>
      <h2>Feel left out? Add yourself or a colleague to the faculty.</h2>
      <form action={addProfessor}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Department
          <input type="text" name="department" />
        </label>
        <button>{loading ? "Adding..." : "Add professor"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}