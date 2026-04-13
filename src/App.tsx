import { useState, useEffect } from 'react';
import { Upload, Mic, Lock, FileText, DollarSign, Package, Palette, ChevronDown, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import logo from '../imports/logo.png';

const services = [
  { value: 'business-cards', label: 'بطاقات عمل', icon: '💼', multiplier: 1.0 },
  { value: 'brochures', label: 'كتيبات', icon: '📖', multiplier: 1.5 },
  { value: 'banners', label: 'لافتات', icon: '🏷️', multiplier: 2.5 },
  { value: 'posters', label: 'ملصقات', icon: '📋', multiplier: 2.0 },
  { value: 'stickers', label: 'ستيكرات', icon: '🏷️', multiplier: 0.8 },
  { value: 'packaging', label: 'تغليف', icon: '📦', multiplier: 3.0 },
];

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    description: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Interactive mouse glow background
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 500);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  const backgroundGlow = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(11, 61, 111, 0.15), transparent 80%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    calculatePrice({ ...formData, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    // Recalculate price after setting files (using timeout to let state update, or calculating with new array directly)
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    let basePrice = 5000;
    const service = services.find((s) => s.value === formData.serviceType);
    if (service) basePrice *= service.multiplier;
    basePrice += updatedFiles.length * 1000;
    setEstimatedPrice(basePrice);
  };

  const calculatePrice = (data: typeof formData) => {
    let basePrice = 5000;
    const service = services.find((s) => s.value === data.serviceType);
    if (service) {
      basePrice *= service.multiplier;
    }
    basePrice += uploadedFiles.length * 1000; // Adjusted file cost to 1000 IQD to match base 5000
    setEstimatedPrice(basePrice);
  };

  // Recalculate initially and on file changes
  useEffect(() => {
    calculatePrice(formData);
  }, [uploadedFiles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground overflow-x-hidden relative" style={{ fontFamily: "'Almarai', sans-serif" }}>
      {/* Brand stripe at top */}
      <div className="brand-stripe fixed top-0 left-0 right-0 z-50" />

      {/* Dynamic colorful background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F8FAFC]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #C41E30 0%, transparent 70%)' }} 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #D4A950 0%, transparent 70%)' }} 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, #0B3D6F 0%, transparent 70%)' }} 
        />
      </div>

      {/* Interactive mouse tracking background glow */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 mix-blend-color-burn" 
        style={{ background: backgroundGlow }} 
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 pt-10">
        {/* Header with logo */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-brand-navy/5 rounded-3xl blur-xl scale-110" />
            <div className="relative bg-white/90 backdrop-blur-xl px-10 py-5 rounded-2xl shadow-xl border border-brand-gold/30">
              <img src={logo} alt="Al-Rubeiy Group" className="h-16 mix-blend-multiply" />
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-brand-navy mb-2"
          >
            خدمات الطباعة الاحترافية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground text-sm"
          >
            أطلب خدماتك بسهولة واحصل على تسعير فوري
          </motion.p>
        </motion.header>

        {/* Main Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Order Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-6 shadow-xl card-hover relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-brand-navy transition-all duration-300 opacity-50 group-hover:opacity-100" />
            
            <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center transition-transform group-hover:scale-110">
                <FileText className="w-5 h-5 text-brand-navy" />
              </div>
              معلومات الطلب
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div className="group/input">
                <label className="block text-sm font-bold text-foreground mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/50 backdrop-blur-sm border border-input rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none text-sm shadow-sm"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              {/* Phone */}
              <div className="group/input">
                <label className="block text-sm font-bold text-foreground mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white/50 backdrop-blur-sm border border-input rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none text-sm shadow-sm"
                  placeholder="+964 XXX XXX XXXX"
                  dir="ltr"
                  required
                />
              </div>

              {/* Service Type - Custom Select */}
              <div className="group/input">
                <label className="block text-sm font-bold text-foreground mb-2">نوع الخدمة</label>
                <div className="relative">
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full bg-white/50 backdrop-blur-sm border border-input rounded-xl px-4 py-3.5 text-foreground focus:bg-white focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none appearance-none text-sm shadow-sm"
                    required
                  >
                    <option value="">اختر نوع الخدمة</option>
                    {services.map(s => (
                      <option key={s.value} value={s.value}>{s.icon} {s.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div className="group/input">
                <label className="block text-sm font-bold text-foreground mb-2">وصف الطلب</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-white/50 backdrop-blur-sm border border-input rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none resize-none text-sm shadow-sm"
                  placeholder="اشرح تفاصيل طلبك هنا... (الكمية، الحجم، الألوان المطلوبة)"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Upload Assets Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-6 shadow-xl card-hover relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-brand-crimson transition-all duration-300 opacity-50 group-hover:opacity-100" />
            
            <h2 className="text-xl font-bold text-brand-crimson mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-crimson/10 flex items-center justify-center transition-transform group-hover:scale-110">
                <Palette className="w-5 h-5 text-brand-crimson" />
              </div>
              تحميل التصاميم
            </h2>

            <label className="block cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="border-2 border-dashed border-brand-crimson/30 rounded-2xl p-8 text-center bg-white/40 hover:border-brand-crimson/50 hover:bg-brand-crimson/5 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-crimson/10 to-brand-gold/10 flex items-center justify-center shadow-inner">
                  <Upload className="w-8 h-8 text-brand-crimson" />
                </div>
                <p className="text-brand-crimson font-bold mb-1">انقر لتحميل ملفات التصميم</p>
                <p className="text-muted-foreground text-xs">PDF, PNG, JPG, AI, PSD</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.ai,.psd"
                />
              </motion.div>
            </label>

            <AnimatePresence>
              {uploadedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 space-y-2"
                >
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-xl px-4 py-3 border border-brand-crimson/10 group/file shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-crimson/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-brand-crimson" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center opacity-0 group-hover/file:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pricing Algorithm Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl p-6 shadow-xl card-hover overflow-hidden relative"
            style={{ 
              borderTop: '3px solid #D4A950',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(32px)',
              boxShadow: '0 8px 32px 0 rgba(212, 169, 80, 0.1)',
            }}
          >
            {/* Decorative shimmer */}
            <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />

            <div className="relative">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#B8942E' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-gold/10">
                  <DollarSign className="w-5 h-5" style={{ color: '#D4A950' }} />
                </div>
                السعر المتوقع
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm bg-white/50 px-4 py-3 border border-brand-gold/10 rounded-xl">
                  <span className="text-muted-foreground font-bold">السعر الأساسي</span>
                  <span className="text-foreground font-bold">5000 د.ع</span>
                </div>
                
                <AnimatePresence>
                  {formData.serviceType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className="flex justify-between items-center text-sm px-4 py-2"
                    >
                      <span className="text-muted-foreground">
                        نوع الخدمة ({services.find(s => s.value === formData.serviceType)?.label})
                      </span>
                      <span style={{ color: '#D4A950' }} className="font-bold">
                        +{((estimatedPrice - 5000 - uploadedFiles.length * 1000) || 0).toFixed(0)} د.ع
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {uploadedFiles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className="flex justify-between items-center text-sm px-4 py-2"
                    >
                      <span className="text-muted-foreground">الملفات ({uploadedFiles.length})</span>
                      <span style={{ color: '#D4A950' }} className="font-bold">+{uploadedFiles.length * 1000} د.ع</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="border-t border-brand-gold/20 pt-5 mt-5">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-xl font-bold text-foreground">المجموع</span>
                    <motion.span
                      key={estimatedPrice}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-extrabold gold-gradient-text drop-shadow-sm"
                    >
                      {estimatedPrice.toFixed(0)} د.ع
                    </motion.span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center opacity-80">* السعر تقديري وقد يتغير حسب التفاصيل النهائية</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Voice Ordering (Locked) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative glass-card rounded-3xl p-6 shadow-xl overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-brand-navy via-brand-crimson to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-crimson/5 pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-brand-navy flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-brand-navy" />
                  </div>
                  الطلب الصوتي بالذكاء الاصطناعي
                </h2>
                <div className="bg-brand-navy/10 px-4 py-1.5 rounded-full flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-navy" />
                  <span className="text-xs text-brand-navy font-bold">قريباً</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-5 pr-2">
                اطلب خدماتك بالصوت باستخدام تقنية الذكاء الاصطناعي المتقدمة
              </p>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-navy/10 shadow-inner">
                <div className="flex items-center justify-center gap-6 opacity-40">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-navy to-brand-crimson flex items-center justify-center shadow-lg">
                    <Mic className="w-8 h-8 text-white relative z-10" />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                  </div>
                  <div className="flex gap-2 items-end">
                    {[10, 8, 14, 9, 12, 7, 10].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 rounded-full bg-brand-navy animate-pulse"
                        style={{ height: `${h * 3.5}px`, animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 40px -8px rgba(196, 30, 48, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-3 text-white relative overflow-hidden disabled:opacity-70 mt-4"
            style={{
              background: 'linear-gradient(135deg, #C41E30 0%, #E8364A 50%, #C41E30 100%)',
              boxShadow: '0 8px 32px -8px rgba(196, 30, 48, 0.3)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Package className="w-6 h-6" />
                تقديم الطلب الآن
                <Sparkles className="w-5 h-5 opacity-60 ml-2" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto z-50 glass-card rounded-2xl p-5 shadow-2xl flex items-center gap-4 bg-white/90"
              style={{ borderRight: '5px solid #2A9D8F' }}
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-brand-navy text-base">تم تقديم الطلب بنجاح!</p>
                <p className="text-muted-foreground text-sm mt-0.5">سيتم التواصل معك خلال 24 ساعة لتأكيد التفاصيل</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center pb-8"
        >
          <div className="w-20 h-0.5 mx-auto mb-5 rounded-full opacity-60" style={{ background: 'linear-gradient(90deg, #0B3D6F, #D4A950, #C41E30)' }} />
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-wider mb-2">Al-Rubeiy Group</p>
          <p className="text-muted-foreground/60 text-xs">مجموعة الربيعي للطباعة - جميع الحقوق محفوظة © 2026</p>
        </motion.footer>
      </div>
    </div>
  );
}