export function DellAlert({ children }) {
  return (
    <div className="alert alert-danger" role="alert">
      Contact: {children} - deleted!
    </div>
  );
}
