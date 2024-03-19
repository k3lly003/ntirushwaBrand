function Button({ text }) {
  return (
    <>
      <div>
        <button>{text}</button>
      </div>
    </>
  );
}
ReactDOM.render(<Button />, document.querySelector("."));
