import useMutation from "../api/useMutation";

export default function DepartmentForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/departments", ["departments"]);

  const addDepartment = (formData) => {
    const name = formData.get("name");
    const area = formData.get("area");
    add({ name, area });
  };

  return (
    <>
      <h2>Feel left out? Add a new department.</h2>
      <form action={addDepartment}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Area
          <input type="text" name="area" />
        </label>
        <button>{loading ? "Adding..." : "Add department"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}