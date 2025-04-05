import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ArrowDown, Info, Heart, AlertTriangle, Sparkles, ArrowRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface BMIResultProps {
  bmi: number;
}

const BMIResult = ({ bmi }: BMIResultProps) => {
 
  const categories = [
    { name: "Сильный дефицит", range: "< 16", min: 0, max: 16, color: "#3b82f6", icon: <AlertTriangle className="h-4 w-4" />, description: "Требуется консультация врача" },
    { name: "Недостаточный вес", range: "16 - 18.4", min: 16, max: 18.5, color: "#60a5fa", icon: <AlertTriangle className="h-4 w-4" />, description: "Рекомендуется набрать вес" },
    { name: "Нормальный вес", range: "18.5 - 24.9", min: 18.5, max: 25, color: "#10b981", icon: <Heart className="h-4 w-4" />, description: "Отличный показатель! Поддерживайте текущий вес" },
    { name: "Избыточный вес", range: "25 - 29.9", min: 25, max: 30, color: "#f59e0b", icon: <AlertTriangle className="h-4 w-4" />, description: "Рекомендуется снизить вес" },
    { name: "Ожирение I", range: "30 - 34.9", min: 30, max: 35, color: "#ef4444", icon: <AlertTriangle className="h-4 w-4" />, description: "Необходимо снизить вес" },
    { name: "Ожирение II", range: "35 - 39.9", min: 35, max: 40, color: "#dc2626", icon: <AlertTriangle className="h-4 w-4" />, description: "Рекомендуется обратиться к врачу" },
    { name: "Ожирение III", range: "> 40", min: 40, max: 50, color: "#b91c1c", icon: <AlertTriangle className="h-4 w-4" />, description: "Необходима консультация специалиста" },
  ];


  const bmiCategory = useMemo(() => {
    return categories.find(
      (category) => bmi >= category.min && bmi < category.max
    );
  }, [bmi, categories]);

  
  const indicatorPosition = useMemo(() => {
 
    const clampedBmi = Math.min(Math.max(bmi, 10), 50);
  
    return ((clampedBmi - 10) / 40) * 100;
  }, [bmi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-8 mt-10 shadow-xl rounded-xl bg-white dark:bg-zinc-900 border-none overflow-hidden">
        <div className="relative pb-6">
          <div className="absolute right-0 top-0 w-40 h-40 bg-indigo-50 dark:bg-indigo-900/20 rounded-full opacity-60 blur-2xl -translate-x-10 -translate-y-20 z-0"></div>
          <h2 className="text-2xl font-bold text-center relative z-10 text-indigo-900 dark:text-indigo-100 mb-2">
            Ваш результат ИМТ
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mx-auto"></div>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              {bmi}
            </div>
            
          </div>
        </div>
        
        {bmiCategory && (
          <div className="mb-8">
            <div 
              className="text-center font-semibold text-lg mb-2 flex items-center justify-center gap-2 tracking-tight" 
              style={{ color: bmiCategory.color }}
            >
              {bmiCategory.icon}
              {bmiCategory.name}
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm px-4">{bmiCategory.description}</div>
          </div>
        )}
        
     
        <div className="mb-8">
          <div className="relative h-10 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-600 mb-3 shadow-inner overflow-hidden">
      
            <div className="absolute inset-0 flex justify-between items-center px-[2%] pointer-events-none">
              {categories.map((cat, index) => (
                <div 
                  key={index} 
                  className="h-full w-px bg-white/30"
                  style={{ 
                    left: `${((cat.min - 10) / 40) * 100}%`,
                    display: index === 0 ? 'none' : 'block'
                  }}
                ></div>
              ))}
            </div>
            
           
            <motion.div 
              className="absolute top-0 transform -translate-x-1/2"
              style={{ left: `${indicatorPosition}%` }}
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className="flex flex-col items-center">
                <ArrowDown className="w-4 h-4 text-indigo-900 dark:text-white drop-shadow-md" />
                <div className="bg-white dark:bg-zinc-800 font-bold rounded-full shadow-lg px-2.5 py-0.5 text-xs border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                  {bmi}
                </div>
              </div>
            </motion.div>
          </div>
          
         
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1 mb-1">
            <div className="font-medium">10</div>
            <div>20</div>
            <div>30</div>
            <div>40</div>
            <div className="font-medium">50</div>
          </div>
        </div>
       
        <div className="rounded-xl border border-indigo-100 dark:border-indigo-800/20 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 p-4">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-2">
              <Activity className="h-4 w-4 text-indigo-500" />
              Категории ИМТ
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Классификация индекса массы тела</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-zinc-900/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                    bmiCategory?.name === category.name 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 shadow-sm' 
                      : 'bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div 
                    className="w-4 h-4 rounded-full mr-3 flex items-center justify-center"
                    style={{ backgroundColor: category.color }}
                  >
                    {bmiCategory?.name === category.name && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.range}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 bg-indigo-50/50 dark:bg-zinc-800/50 p-5 rounded-xl border border-indigo-100/80 dark:border-indigo-800/20 relative">
          <div className="absolute -top-3 left-5 px-2 py-1 bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-md shadow-sm border border-indigo-100 dark:border-indigo-800/30">
            Важно
          </div>
          <div className="pt-1">
            <p className="flex items-start gap-3">
              <Info className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" /> 
              <span>
                ИМТ — это скрининговый инструмент, а не диагностика здоровья. 
                Для получения полной оценки состояния организма рекомендуется 
                проконсультироваться с врачом.
              </span>
            </p>
            <div className="absolute bottom-3 right-3 text-indigo-200 dark:text-indigo-800 opacity-30">
              <Heart className="h-10 w-10" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
          <a href="https://www.who.int/ru/news-room/fact-sheets/detail/obesity-and-overweight" 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium"
          >
            Подробнее о ИМТ на сайте ВОЗ
            <ArrowRight className="h-3 w-3 ml-1.5" />
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default BMIResult;
