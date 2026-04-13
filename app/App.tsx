import { useState } from 'react';
import { Upload, Mic, Lock, FileText, DollarSign, Package, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import logo from '../imports/logo.png';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    description: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

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

  const calculatePrice = (data: typeof formData) => {
    let basePrice = 50;
    const serviceMultipliers: Record<string, number> = {
      'business-cards': 1.0,
      'brochures': 1.5,
      'banners': 2.5,
      'posters': 2.0,
      'stickers': 0.8,
      'packaging': 3.0
    };

    if (data.serviceType) {
      basePrice *= serviceMultipliers[data.serviceType] || 1;
    }

    basePrice += uploadedFiles.length * 10;
    setEstimatedPrice(basePrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', formData, uploadedFiles);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[hsl(210,25%,97%)] via-[hsl(210,30%,95%)] to-[hsl(210,25%,97%)] text-[hsl(210,50%,10%)] overflow-x-hidden" style={{ fontFamily: 'Almarai, sans-serif' }}>
      {/* Decorative background elements */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(355,72%,44%)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsl(42,60%,56%)] rounded-full blur-3xl"></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 opacity-3 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(214, 162, 83, 0.05) 35px, rgba(214, 162, 83, 0.05) 70px)`
      }}></div>

      <div className="relative z-10 max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center mb-3 bg-white px-8 py-4 rounded-2xl shadow-lg shadow-[hsl(210,80%,24%)]/20">
            <img src={logo} alt="Al-Rubeiy Group" className="h-12 mix-blend-multiply" />
          </div>
          <p className="text-[hsl(210,80%,24%)] font-bold">خدمات الطباعة الاحترافية</p>
        </motion.header>

        {/* Main Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Order Information Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[hsl(42,60%,56%)]/30">
            <h2 className="text-xl font-bold text-[hsl(42,60%,40%)] mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              معلومات الطلب
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[hsl(210,50%,10%)] mb-2 text-sm">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[hsl(210,30%,98%)] border border-[hsl(42,60%,56%)]/30 rounded-xl px-4 py-3 text-[hsl(210,50%,10%)] placeholder-slate-400 focus:border-[hsl(42,60%,56%)] focus:ring-2 focus:ring-[hsl(42,60%,56%)]/20 transition-all outline-none"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[hsl(210,50%,10%)] mb-2 text-sm">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[hsl(210,30%,98%)] border border-[hsl(42,60%,56%)]/30 rounded-xl px-4 py-3 text-[hsl(210,50%,10%)] placeholder-slate-400 focus:border-[hsl(42,60%,56%)] focus:ring-2 focus:ring-[hsl(42,60%,56%)]/20 transition-all outline-none"
                  placeholder="+964 XXX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-[hsl(210,50%,10%)] mb-2 text-sm">نوع الخدمة</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full bg-[hsl(210,30%,98%)] border border-[hsl(42,60%,56%)]/30 rounded-xl px-4 py-3 text-[hsl(210,50%,10%)] focus:border-[hsl(42,60%,56%)] focus:ring-2 focus:ring-[hsl(42,60%,56%)]/20 transition-all outline-none"
                  required
                >
                  <option value="">اختر نوع الخدمة</option>
                  <option value="business-cards">بطاقات عمل</option>
                  <option value="brochures">كتيبات</option>
                  <option value="banners">لافتات</option>
                  <option value="posters">ملصقات</option>
                  <option value="stickers">ستيكرات</option>
                  <option value="packaging">تغليف</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[hsl(210,50%,10%)] mb-2 text-sm">وصف الطلب</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-[hsl(210,30%,98%)] border border-[hsl(42,60%,56%)]/30 rounded-xl px-4 py-3 text-[hsl(210,50%,10%)] placeholder-slate-400 focus:border-[hsl(42,60%,56%)] focus:ring-2 focus:ring-[hsl(42,60%,56%)]/20 transition-all outline-none resize-none"
                  placeholder="اشرح تفاصيل طلبك هنا..."
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Upload Assets Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[hsl(355,72%,44%)]/30"
          >
            <h2 className="text-xl font-bold text-[hsl(355,72%,40%)] mb-5 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              تحميل التصاميم
            </h2>

            <label className="block">
              <div className="border-2 border-dashed border-[hsl(355,72%,44%)]/40 rounded-2xl p-8 text-center cursor-pointer hover:border-[hsl(355,72%,44%)]/60 hover:bg-[hsl(355,72%,95%)]/50 transition-all">
                <Upload className="w-12 h-12 text-[hsl(355,72%,44%)] mx-auto mb-3" />
                <p className="text-[hsl(355,72%,40%)] mb-1">انقر لتحميل ملفات التصميم</p>
                <p className="text-slate-500 text-xs">PDF, PNG, JPG, AI</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.ai,.psd"
                />
              </div>
            </label>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-[hsl(355,72%,95%)] rounded-lg px-3 py-2">
                    <FileText className="w-4 h-4 text-[hsl(355,72%,44%)]" />
                    <span className="text-sm text-[hsl(355,72%,30%)] flex-1 truncate">{file.name}</span>
                    <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Pricing Algorithm Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-[hsl(42,60%,96%)] to-[hsl(42,60%,92%)] backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[hsl(42,60%,56%)]/40"
          >
            <h2 className="text-xl font-bold text-[hsl(42,60%,35%)] mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              السعر المتوقع
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[hsl(42,60%,30%)]">السعر الأساسي</span>
                <span className="text-[hsl(210,50%,10%)] font-bold">50 د.ع</span>
              </div>
              {formData.serviceType && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[hsl(42,60%,30%)]">نوع الخدمة</span>
                  <span className="text-[hsl(42,60%,35%)]">+{((estimatedPrice - 50 - uploadedFiles.length * 10) || 0).toFixed(0)} د.ع</span>
                </div>
              )}
              {uploadedFiles.length > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[hsl(42,60%,30%)]">الملفات ({uploadedFiles.length})</span>
                  <span className="text-[hsl(42,60%,35%)]">+{uploadedFiles.length * 10} د.ع</span>
                </div>
              )}
              <div className="border-t border-[hsl(42,60%,56%)]/40 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[hsl(42,60%,30%)] text-lg font-bold">المجموع</span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(42,60%,40%)] to-[hsl(42,60%,50%)]">
                    {estimatedPrice.toFixed(0)} د.ع
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Voice Ordering (Locked) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[hsl(210,80%,24%)]/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,80%,90%)]/40 to-[hsl(355,72%,95%)]/40"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-[hsl(210,80%,30%)] flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  الطلب الصوتي بالذكاء الاصطناعي
                </h2>
                <div className="bg-[hsl(210,80%,24%)]/15 px-3 py-1 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[hsl(210,80%,30%)]" />
                  <span className="text-xs text-[hsl(210,80%,30%)]">قريباً</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4">
                اطلب خدماتك بالصوت باستخدام تقنية الذكاء الاصطناعي المتقدمة
              </p>

              <div className="bg-[hsl(210,30%,98%)] rounded-2xl p-4 border border-[hsl(210,80%,24%)]/20">
                <div className="flex items-center justify-center gap-3 opacity-40">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(210,80%,24%)] to-[hsl(355,72%,44%)] flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-8 bg-[hsl(210,80%,30%)] rounded-full animate-pulse"></div>
                    <div className="w-1 h-6 bg-[hsl(210,80%,30%)] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-10 bg-[hsl(210,80%,30%)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-7 bg-[hsl(210,80%,30%)] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-1 h-9 bg-[hsl(210,80%,30%)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[hsl(355,72%,44%)] to-[hsl(355,72%,50%)] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[hsl(355,72%,44%)]/30 hover:shadow-[hsl(355,72%,44%)]/50 transition-all flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            تقديم الطلب
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-center text-slate-600 text-xs pb-6"
        >
          <p>© 2026 Al-Rubeiy Group - جميع الحقوق محفوظة</p>
        </motion.footer>
      </div>
    </div>
  );
}