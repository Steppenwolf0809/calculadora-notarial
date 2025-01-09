import { useState } from 'react'
import Calculadora from './components/Calculadora'
import Certificaciones from './components/Certificaciones'

const TABS = {
  CALCULADORA: 'calculadora',
  CERTIFICACIONES: 'certificaciones'
};

function App() {
  const [tabActiva, setTabActiva] = useState(TABS.CALCULADORA);

  const TabButton = ({ tab, label }) => (
    <button
      className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
        tabActiva === tab
          ? 'bg-white text-blue-600 border-t border-x border-gray-200'
          : 'text-gray-600 hover:text-blue-600'
      }`}
      onClick={() => setTabActiva(tab)}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Calculadora Notarial
          </h1>
          <p className="mt-2 text-gray-600">
            Tarifas vigentes 2025
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <TabButton tab={TABS.CALCULADORA} label="Calculadora" />
          <TabButton tab={TABS.CERTIFICACIONES} label="Certificaciones" />
        </div>
        
        {/* Contenido */}
        <div className="max-w-4xl mx-auto">
          {tabActiva === TABS.CALCULADORA && <Calculadora />}
          {tabActiva === TABS.CERTIFICACIONES && <Certificaciones />}
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Los valores mostrados son referenciales y pueden variar según el caso específico.</p>
        </footer>
      </div>
    </main>
  )
}

export default App
