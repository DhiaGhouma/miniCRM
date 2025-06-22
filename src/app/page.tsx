export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg,rgb(113, 120, 130) 0%,rgb(98, 115, 141) 55%, #2563eb 100%)',
      }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center border border-white/30">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Bienvenue sur Mini CRM
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Gérez vos relations clients avec facilité et efficacité
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
          >
            Commencer
          </a>
        </div>
      </div>
    </div>
  );
}
