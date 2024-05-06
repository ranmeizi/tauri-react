import "./style.less";

export default function ({ text }: any) {
  return (
    <svg viewBox="0 0 1320 300" style={{ height: "1em" }}>
      <symbol id={text}>
        <text text-anchor="middle" x="50%" y="50%" dy=".35em">
          {text}
        </text>
      </symbol>

      <use xlinkHref={`#${text}`} className="text"></use>
      <use xlinkHref={`#${text}`} className="text"></use>
      <use xlinkHref={`#${text}`} className="text"></use>
      <use xlinkHref={`#${text}`} className="text"></use>
      <use xlinkHref={`#${text}`} className="text"></use>
    </svg>
  );
}
