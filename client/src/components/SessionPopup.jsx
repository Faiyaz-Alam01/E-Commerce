{showSessionPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

    <div className="bg-white p-6 rounded-lg">
      <h1 className="font-semibold text-lg">
        Session Expired 😔
      </h1>

      <button
        onClick={refreshSession}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh Session
      </button>
    </div>

  </div>
)}
