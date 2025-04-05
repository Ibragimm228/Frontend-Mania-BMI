
import BMICalculator from "@/components/BMICalculator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-100 via-purple-50 to-white">
      <div className="w-full max-w-4xl relative">
        {/* Декоративные элементы */}
        <div className="absolute top-[-120px] left-[-100px] w-64 h-64 bg-purple-200 opacity-30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-80px] right-[-60px] w-48 h-48 bg-purple-300 opacity-20 rounded-full blur-2xl -z-10"></div>
        <div className="absolute bottom-[20%] left-[15%] w-32 h-32 bg-purple-100 opacity-20 rounded-full blur-xl -z-10"></div>
        <div className="absolute top-[30%] right-[10%] w-40 h-40 bg-purple-100 opacity-30 rounded-full blur-xl -z-10"></div>
        
        <header className="text-center mb-10 fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 drop-shadow-sm bg-clip-text bg-gradient-to-r from-purple-800 to-purple-600 text-transparent">
            Калькулятор Индекса Массы Тела
          </h1>
          <div className="flex items-center justify-center mt-3">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Рассчитайте свой ИМТ и определите, соответствует ли ваш вес норме. 
              Индекс массы тела — простой показатель соотношения веса и роста.
            </p>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="ml-2 text-purple-600 hover:bg-purple-50 p-1 rounded-full transition-colors">
                  <InfoIcon className="h-4 w-4" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 bg-white border border-purple-100 shadow-lg p-4">
                <h3 className="font-medium text-purple-800 mb-2">О калькуляторе ИМТ</h3>
                <p className="text-sm text-gray-600">
                  Индекс массы тела (ИМТ) — величина, позволяющая оценить соответствие массы человека и его роста и определить, является ли масса недостаточной, нормальной или избыточной.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </header>
        
        <main>
          <BMICalculator />
        </main>
        
        <footer className="mt-16 text-center text-gray-500 text-sm fade-in">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <p className="hover:text-purple-600 transition-colors">
           Frontend Mania 
            </p>
            <span className="hidden md:inline">•</span>
            <p>{new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
