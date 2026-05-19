export default function Education() {
  return (
    <>
      <div className="mb-2">
        <p className="text-xl font-bold">Education:</p>
        <span>
          Masters Degree in{" "}
          <strong className="pb-1 inline-block bg-yellow">
            Computer Science
          </strong>
        </span>
      </div>
      <div className="mb-2">
        <p className="text-xl font-bold">Languages spoken</p>
        <ul>
          <li>
            English - C1<span> (TEFL certified)</span>
          </li>
          <li>
            Polish - fluent<span> (~B2)</span>
          </li>
          <li>Ukrainian - native</li>
        </ul>
      </div>
    </>
  );
}
