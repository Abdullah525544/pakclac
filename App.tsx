
import React, { useState } from 'react';
import Layout from './components/Layout';
import CalculatorList from './components/CalculatorList';
import ToolsDirectory from './components/ToolsDirectory';
import { Calculator, View } from './types';
import { 
  IncomeTaxTool, ZakatTool, EMITool, ProfitMarginTool, BMICalcTool, 
  InvestmentReturnTool, RetirementTool, PFTool, GratuityTool, 
  FreelancerTool, UnitConverterTool, RealEstateROITool 
} from './components/Tools';
import { FBRSlabsPage, ZakatInfoPage, ContactPage, PrivacyPage, TermsPage, DisclaimerPage } from './components/InfoPages';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedCalc, setSelectedCalc] = useState<Calculator | null>(null);
  const [isUrdu, setIsUrdu] = useState(false);

  const handleSelectTool = (calc: Calculator) => {
    setSelectedCalc(calc);
    setView('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (newView: View) => {
    setView(newView);
    setSelectedCalc(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <CalculatorList isUrdu={isUrdu} onSelect={handleSelectTool} onNavigate={handleNavigate} />;
      case 'all-tools':
        return <ToolsDirectory isUrdu={isUrdu} onSelect={handleSelectTool} />;
      case 'slabs':
        return <FBRSlabsPage isUrdu={isUrdu} />;
      case 'zakat-info':
        return <ZakatInfoPage isUrdu={isUrdu} />;
      case 'contact':
        return <ContactPage isUrdu={isUrdu} />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      case 'tool':
        return renderTool();
      default:
        return <CalculatorList isUrdu={isUrdu} onSelect={handleSelectTool} onNavigate={handleNavigate} />;
    }
  };

  const renderTool = () => {
    if (!selectedCalc) return null;

    let ToolComponent;
    switch (selectedCalc.id) {
      case 'income-tax': ToolComponent = <IncomeTaxTool isUrdu={isUrdu} />; break;
      case 'zakat': ToolComponent = <ZakatTool />; break;
      case 'loan-emi': ToolComponent = <EMITool />; break;
      case 'profit-margin': ToolComponent = <ProfitMarginTool />; break;
      case 'bmi': ToolComponent = <BMICalcTool />; break;
      case 'investment-return': ToolComponent = <InvestmentReturnTool />; break;
      case 'retirement-plan': ToolComponent = <RetirementTool />; break;
      case 'real-estate-roi': ToolComponent = <RealEstateROITool />; break;
      case 'provident-fund': ToolComponent = <PFTool />; break;
      case 'gratuity': ToolComponent = <GratuityTool />; break;
      case 'freelancer-tax': ToolComponent = <FreelancerTool />; break;
      case 'unit-converter': ToolComponent = <UnitConverterTool />; break;
      default:
        return (
          <div className="bg-white p-20 rounded-[3rem] border border-slate-200 text-center shadow-xl">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🛠️</div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Coming Soon!</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">This tool is currently being updated with the latest regulations.</p>
            <button onClick={() => setView('home')} className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold">Back to Home</button>
          </div>
        );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <button 
              onClick={() => setView('all-tools')}
              className="group inline-flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-wide"
            >
              <div className="w-8 h-8 rounded-full border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              </div>
              {isUrdu ? 'تمام ٹولز' : 'All Tools'}
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl">
                  {selectedCalc.icon}
              </div>
              <div>
                  <h2 className={`text-4xl font-black text-slate-900 tracking-tight ${isUrdu ? 'urdu' : ''}`}>
                      {isUrdu ? selectedCalc.nameUrdu : selectedCalc.name}
                  </h2>
                  <p className="text-slate-500 font-medium">Free Financial Utility Tool</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-16">
          {ToolComponent}
        </div>
        
        {/* AI Banner */}
        <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-500/30">AI-Powered Analysis</div>
              <h4 className="text-3xl font-black mb-4 leading-tight">Need expert financial advice?</h4>
              <p className="text-slate-400 leading-relaxed">Our AI assistant analyzes your results in real-time to provide localized strategies for efficiency and growth in Pakistan.</p>
            </div>
            <div className="flex justify-end">
              <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md w-full max-w-sm">
                <div className="flex gap-4 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 text-xl">✨</div>
                  <p className="text-sm font-medium italic text-slate-200">"Every calculation matters. Use our localized tools to optimize your savings."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout 
      isUrdu={isUrdu} 
      setIsUrdu={setIsUrdu}
      onNavigate={handleNavigate}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
