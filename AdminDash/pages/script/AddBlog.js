const textEditor = document.getElementById("editor");
textEditor.addEventListener("change", (event) => {
  const { value } = event.target;
  console.log("textEditor output", value);
  let Result = JSON.stringify(value);
  localStorage.setItem("name", Result);
});
