import { useState, useEffect } from "react";
import { Calculator, Weight, ArrowDown, ArrowUp, Info, LayoutGrid, Activity, RefreshCw, Medal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BMIResult from "./BMIResult";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const BMICalculator = () => {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { toast } = useToast();

  const calculateBMI = () => {
    if (height <= 0 || weight <= 0) {
      toast({
        title: "Неверные данные",
        description: "Рост и вес должны быть больше нуля",
        variant: "destructive",
      });
      return;
    }

  
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(1)));
    setShowResult(true);
    
    toast({
      title: "ИМТ рассчитан",
      description: `Ваш индекс массы тела: ${bmiValue.toFixed(1)} кг/м²`,
    });
  };

  const handleHeightChange = (value: number[]) => {
    setHeight(value[0]);
    if (showResult) setShowResult(false);
  };

  const handleWeightChange = (value: number[]) => {
    setWeight(value[0]);
    if (showResult) setShowResult(false);
  };

  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setHeight(value);
      if (showResult) setShowResult(false);
    }
  };

  const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setWeight(value);
      if (showResult) setShowResult(false);
    }
  };

  const resetCalculator = () => {
    setHeight(170);
    setWeight(70);
    setBmi(null);
    setShowResult(false);
    toast({
      title: "Сброс выполнен",
      description: "Значения сброшены до начальных",
    });
  };

  useEffect(() => {
   
    calculateBMI();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border-none shadow-xl rounded-xl bg-white dark:bg-zinc-900">
          <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 opacity-20"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 backdrop-blur-xl rounded-full"></div>
            <div className="absolute top-10 -left-10 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Калькулятор ИМТ</h1>
                <p className="text-indigo-100 mt-1 flex items-center gap-1.5 text-sm">
                  <Activity className="h-4 w-4" />
                  Измерьте свой индекс массы тела
                </p>
              </div>
              
              <div className="bg-white/15 p-3 rounded-full backdrop-blur-md">
                <Calculator className="h-7 w-7" />
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-8 bg-gradient-to-b from-white to-indigo-50/50 dark:from-zinc-900 dark:to-zinc-800/50">
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-indigo-500" />
                  Рост (см)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={height}
                    onChange={handleHeightInputChange}
                    className="w-24 text-right pr-8 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 font-medium rounded-lg"
                    min={0}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">см</span>
                </div>
              </div>
              
              <div className="pt-2">
                <Slider
                  value={[height]}
                  min={100}
                  max={250}
                  step={1}
                  onValueChange={handleHeightChange}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500 px-1">
                  <span>100 см</span>
                  <span>250 см</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 bg-indigo-50/50 dark:bg-zinc-800/50 p-3 rounded-lg border border-indigo-100/50 dark:border-zinc-700/50">
                <Info className="h-4 w-4 text-indigo-500" /> 
                <span>Средний рост взрослого: 165-175 см</span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Weight className="h-4 w-4 text-indigo-500" />
                  Вес (кг)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={weight}
                    onChange={handleWeightInputChange}
                    className="w-24 text-right pr-8 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 font-medium rounded-lg"
                    min={0}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">кг</span>
                </div>
              </div>
              
              <div className="pt-2">
                <Slider
                  value={[weight]}
                  min={30}
                  max={200}
                  step={1}
                  onValueChange={handleWeightChange}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500 px-1">
                  <span>30 кг</span>
                  <span>200 кг</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2 bg-indigo-50/50 dark:bg-zinc-800/50 p-3 rounded-lg border border-indigo-100/50 dark:border-zinc-700/50">
                <Medal className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                <span>
                  Нормальный вес зависит от роста и телосложения. 
                  <br />ИМТ в диапазоне 18.5–24.9 считается нормальным
                </span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={calculateBMI} 
                className="flex-1 h-12 shadow-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Рассчитать
              </Button>
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="flex-1 h-12 border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-all duration-300 rounded-lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Сбросить
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {showResult && bmi !== null && <BMIResult bmi={bmi} />}
    </div>
  );
};

export default BMICalculator;
