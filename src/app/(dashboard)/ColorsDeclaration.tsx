export default function ColorsDeclaration() {
  return (
    <div className="hidden">
      {[
        "bg-card-green",
        "bg-card-green-light",
        "bg-card-blue",
        "bg-card-blue-light",
        "border-red-500",
        "border-yellow-500",
        "border-blue-500",
      ].map((color) => (
        <div key={color} className={color}></div>
      ))}
    </div>
  );
}
