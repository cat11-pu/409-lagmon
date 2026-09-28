// lagmon.js：延迟、陈旧的那批与更新样本（基线：一律给零与空表与原表）
export function lagOf(born, seen) {
  return 0;
}

export function staleOf(rows, limit) {
  return [];
}

export function updatedInto(samples, target, born, seen) {
  return samples;
}
