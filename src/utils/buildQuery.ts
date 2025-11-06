export function buildQuery(params: Record<string, unknown>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      query.append(key, value.join(","));
    } else {
      query.append(key, String(value));
    }
  });

  return query.toString();
}
