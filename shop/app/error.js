"use client";

export default function Error(error, reset) {
  return (
    <div>
      <h2>{error.message}</h2>

      <button onClick={() => reset()}>reset</button>
    </div>
  );
}
