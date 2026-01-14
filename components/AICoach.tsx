
import React, { useState, useRef } from 'react';
import { Camera, Send, Loader2, Dumbbell, Utensils, Info, Zap } from 'lucide-react';
import { analyzeGymImage, getWorkoutAdvice } from '../services/geminiService';

const AICoach: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!prompt && !image) return;
    setLoading(true);
    setResponse(null);
    try {
      if (image) {
        const res = await analyzeGymImage(image, prompt || "ماذا يوجد في هذه الصورة وكيف يمكن تحسين تمرين هذا الجهاز أو جودة هذه الوجبة؟");
        setResponse(res || null);
      } else {
        const res = await getWorkoutAdvice(prompt);
        setResponse(res || null);
      }
    } catch (error) {
      setResponse("عذراً، حدث خطأ في معالجة طلبك. تأكد من تفعيل مفتاح API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl text-black shadow-lg">
        <h3 className="text-2xl font-bold mb-2">المدرب الذكي Nano Banana</h3>
        <p className="opacity-90">يمكنني تحليل صور معدات النادي، وضعيات التمارين، وحتى وجباتك الغذائية لمساعدتك في إدارة النادي بكفاءة.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Input */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <label className="block text-sm font-medium text-slate-300">ارفع صورة (جهاز، تمرين، وجبة)</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-yellow-500 transition-colors bg-slate-800/50"
            >
              {image ? (
                <img src={`data:image/jpeg;base64,${image}`} alt="Preview" className="max-h-32 rounded-lg" />
              ) : (
                <>
                  <Camera className="text-slate-500" size={32} />
                  <span className="text-xs text-slate-500">اضغط للاختيار</span>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">اسأل المدرب</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثلاً: صمم لي جدول تمرين للمبتدئين..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || (!prompt && !image)}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              <span>إرسال الطلب</span>
            </button>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex gap-3">
              <Info className="text-yellow-500 shrink-0" size={20} />
              <p className="text-xs text-slate-400">نصيحة: استخدم صوراً واضحة للحصول على أفضل النتائج من تقنية Nano Banana.</p>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="md:col-span-2">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 h-full min-h-[500px] flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
              <Zap className="text-yellow-500" size={20} />
              <h4 className="font-semibold">استجابة الذكاء الاصطناعي</h4>
            </div>
            
            <div className="flex-1 p-6 overflow-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                  <Loader2 className="animate-spin" size={48} />
                  <p>جاري التحليل بواسطة Nano Banana...</p>
                </div>
              ) : response ? (
                <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 opacity-30">
                  <Dumbbell size={64} />
                  <p className="text-center">ابدأ المحادثة أو ارفع صورة للحصول على تحليلات ذكية لعملك في النادي.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
