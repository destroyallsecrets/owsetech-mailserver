import * as React from "react";

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  // Use initials for avatar
  const initials = name
    .split(/[@.]/)
    .filter(Boolean)
    .map(s => s[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
  // Simple color hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const color = `hsl(${hash % 360}, 60%, 70%)`;
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.45,
        color: "#333",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}
      title={name}
    >
      {initials}
    </div>
  );
}
