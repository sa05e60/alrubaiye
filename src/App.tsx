import { useState, useEffect } from 'react';
import { Upload, Mic, Lock, FileText, DollarSign, Package, Palette, ChevronDown, X, Sparkles, Shield, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../imports/logo.png';

const services = [
  { value: 'business-cards', label: 'بطاقات عمل', icon: '💼', multiplier: 1.0 },
  { value: 'brochures', label: 'كتيبات', icon: '📖', multiplier: 1.5 },
  { value: 'banners', label: 'لافتات', icon: '🏷️', multiplier: 2.5 },
  { value: 'posters', label: 'ملصقات', icon: '📋', multiplier: 2.0 },
  { value: 'stickers', label: 'ستيكرات', icon: '🏷️', multiplier: 0.8 },
  { value: 'packaging', label: 'تغليف', icon: '📦', multiplier: 3.0 },
];

const features = [
  { icon: Shield, title: 'جودة مضمونة', desc: 'أعلى معايير الطباعة' },
  { icon: Clock, title: 'تسليم سريع', desc: 'خلال 24-48 ساعة' },
  { icon: Star, title: 'خبرة عريقة', desc: '+15 سنة في السوق' },
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
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-section'));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
  };

  const calculatePrice = (data: typeof formData) => {
    let basePrice = 50;
    const service = services.find((s) => s.value === data.serviceType);
    if (service) {
      basePrice *= service.multiplier;
    }
    basePrice += uploadedFiles.length * 10;
    setEstimatedPrice(basePrice);
  };

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
    <div dir="rtl" className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Almarai', sans-serif" }}>
      {/* Brand stripe at top */}
      <div className="brand-stripe fixed top-0 left-0 right-0 z-50" />

      {/* Decorative background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]" 
          style={{ background: 'radial-gradient(circle, #C41E30 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]" 
          style={{ background: 'radial-gradient(circle, #D4A950 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.02]" 
          style={{ background: 'radial-gradient(circle, #0B3D6F 0%, transparent 70%)' }} />
      </div>

      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(214, 162, 83, 0.15) 35px, rgba(214, 162, 83, 0.15) 70px)`
      }} />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 pt-6">
        {/* Header with logo */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center"
        >
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-brand-navy/5 rounded-3xl blur-xl scale-110" />
            <div className="relative bg-white/90 backdrop-blur-xl px-10 py-5 rounded-2xl shadow-xl border border-brand-gold/20">
              <img src={logo} alt="Al-Rubeiy Group" className="h-14 mix-blend-multiply" />
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-brand-navy mb-1"
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

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-card rounded-2xl p-3 text-center card-hover group cursor-default"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-brand-navy/10 to-brand-crimson/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 text-brand-navy" />
              </div>
              <p className="text-xs font-bold text-foreground leading-tight">{feature.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          {['معلومات', 'تصاميم', 'تسعير'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeSection >= i
                  ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">{i + 1}</span>
                {label}
              </div>
              {i < 2 && (
                <div className={`w-6 h-0.5 rounded-full transition-colors duration-300 ${
                  activeSection > i ? 'bg-brand-navy' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Main Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Order Information Card */}
          <motion.div
            data-section="0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-6 shadow-xl card-hover"
            style={{ borderTop: '3px solid #0B3D6F' }}
          >
            <h2 className="text-xl font-bold text-brand-navy mb-5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-navy/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-brand-navy" />
              </div>
              معلومات الطلب
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div className="group">
                <label className="block text-sm font-bold text-foreground mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-input-background border border-input rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none text-sm"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              {/* Phone */}
              <div className="group">
                <label className="block text-sm font-bold text-foreground mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-input-background border border-input rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none text-sm"
                  placeholder="+964 XXX XXX XXXX"
                  dir="ltr"
                  required
                />
              </div>

              {/* Service Type - Custom Select */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">نوع الخدمة</label>
                <div className="relative">
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full bg-input-background border border-input rounded-xl px-4 py-3.5 text-foreground focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none appearance-none text-sm"
                    required
                  >
                    <option value="">اختر نوع الخدمة</option>
                    {services.map(s => (
                      <option key={s.value} value={s.value}>{s.icon} {s.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">وصف الطلب</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-input-background border border-input rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all outline-none resize-none text-sm"
                  placeholder="اشرح تفاصيل طلبك هنا... (الكمية، الحجم، الألوان المطلوبة)"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Upload Assets Card */}
          <motion.div
            data-section="1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-6 shadow-xl card-hover"
            style={{ borderTop: '3px solid #C41E30' }}
          >
            <h2 className="text-xl font-bold text-brand-crimson mb-5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-crimson/10 flex items-center justify-center">
                <Palette className="w-4 h-4 text-brand-crimson" />
              </div>
              تحميل التصاميم
            </h2>

            <label className="block cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="border-2 border-dashed border-brand-crimson/30 rounded-2xl p-8 text-center hover:border-brand-crimson/50 hover:bg-brand-crimson/5 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-brand-crimson/10 to-brand-gold/10 flex items-center justify-center">
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
                  className="mt-4 space-y-2"
                >
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2 bg-brand-crimson/5 rounded-xl px-3 py-2.5 border border-brand-crimson/10 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-crimson/10 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-brand-crimson" />
                      </div>
                      <span className="text-sm text-foreground flex-1 truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="w-6 h-6 rounded-full hover:bg-brand-crimson/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-brand-crimson" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pricing Algorithm Card */}
          <motion.div
            data-section="2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl p-6 shadow-xl card-hover overflow-hidden relative"
            style={{ 
              borderTop: '3px solid #D4A950',
              background: 'linear-gradient(135deg, rgba(212, 169, 80, 0.06) 0%, rgba(212, 169, 80, 0.02) 100%)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Decorative shimmer */}
            <div className="absolute inset-0 shimmer pointer-events-none" />

            <div className="relative">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#B8942E' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212, 169, 80, 0.12)' }}>
                  <DollarSign className="w-4 h-4" style={{ color: '#D4A950' }} />
                </div>
                السعر المتوقع
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">السعر الأساسي</span>
                  <span className="text-foreground font-bold">50 د.ع</span>
                </div>
                
                <AnimatePresence>
                  {formData.serviceType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-muted-foreground">
                        نوع الخدمة ({services.find(s => s.value === formData.serviceType)?.label})
                      </span>
                      <span style={{ color: '#D4A950' }} className="font-bold">
                        +{((estimatedPrice - 50 - uploadedFiles.length * 10) || 0).toFixed(0)} د.ع
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {uploadedFiles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-muted-foreground">الملفات ({uploadedFiles.length})</span>
                      <span style={{ color: '#D4A950' }} className="font-bold">+{uploadedFiles.length * 10} د.ع</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="border-t border-brand-gold/20 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">المجموع</span>
                    <motion.span
                      key={estimatedPrice}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-extrabold gold-gradient-text"
                    >
                      {estimatedPrice.toFixed(0)} د.ع
                    </motion.span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 text-left">* السعر تقديري وقد يتغير حسب التفاصيل النهائية</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Voice Ordering (Locked) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative glass-card rounded-3xl p-6 shadow-xl overflow-hidden"
            style={{ borderTop: '3px solid #0B3D6F' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-crimson/5 pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy/10 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-brand-navy" />
                  </div>
                  الطلب الصوتي بالذكاء الاصطناعي
                </h2>
                <div className="bg-brand-navy/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-brand-navy" />
                  <span className="text-xs text-brand-navy font-bold">قريباً</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                اطلب خدماتك بالصوت باستخدام تقنية الذكاء الاصطناعي المتقدمة
              </p>

              <div className="bg-input-background rounded-2xl p-5 border border-brand-navy/10">
                <div className="flex items-center justify-center gap-4 opacity-35">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-navy to-brand-crimson flex items-center justify-center shadow-lg">
                    <Mic className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex gap-1.5 items-end">
                    {[8, 6, 10, 7, 9, 5, 8].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-brand-navy animate-pulse"
                        style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }}
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
            whileHover={{ scale: 1.02, boxShadow: '0 12px 40px -8px rgba(196, 30, 48, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 text-white relative overflow-hidden disabled:opacity-70"
            style={{
              background: 'linear-gradient(135deg, #C41E30 0%, #E8364A 50%, #C41E30 100%)',
              boxShadow: '0 8px 32px -8px rgba(196, 30, 48, 0.3)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Package className="w-5 h-5" />
                تقديم الطلب
                <Sparkles className="w-4 h-4 opacity-60" />
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
              className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto z-50 glass-card rounded-2xl p-4 shadow-2xl flex items-center gap-3"
              style={{ borderRight: '4px solid #2A9D8F' }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">تم تقديم الطلب بنجاح!</p>
                <p className="text-muted-foreground text-xs">سيتم التواصل معك خلال 24 ساعة</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 text-center pb-8"
        >
          <div className="w-16 h-0.5 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, #0B3D6F, #D4A950, #C41E30)' }} />
          <p className="text-muted-foreground text-xs">© 2026 Al-Rubeiy Group</p>
          <p className="text-muted-foreground/60 text-[10px] mt-1">مجموعة الربيعي - جميع الحقوق محفوظة</p>
        </motion.footer>
      </div>
    </div>
  );
}