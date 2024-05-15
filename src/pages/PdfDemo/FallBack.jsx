import React from "react";

function FallBack({ error, resetErrorBoundary }) {
  return (
    <div className="p-5">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button className="btn btn-danger btn-sm" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default FallBack;