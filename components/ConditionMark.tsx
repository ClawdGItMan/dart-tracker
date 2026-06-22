/**
 * The condition mark: five small circles, filled solid ink (with a 1px ink
 * ring) up to `mark`, then empty white with a faint 1px ring beyond. The one
 * place a rating is expressed — and still strictly black on white.
 */
export function ConditionMark({
  mark,
  size = 7,
  gap = 5,
}: {
  mark: number;
  size?: number;
  gap?: number;
}) {
  return (
    <div className="flex" style={{ gap }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= mark;
        return (
          <span
            key={n}
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: filled ? "#000" : "#fff",
              border: filled ? "1px solid #000" : "1px solid #C9C9C9",
            }}
          />
        );
      })}
    </div>
  );
}
