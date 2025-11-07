import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, ArrowRight, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface UserDetailsFormProps {
  onComplete: (details: UserDetails) => void;
}

export interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  upiId: string;
}

export default function UserDetailsForm({ onComplete }: UserDetailsFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    upiId: ''
  });
  
  const [errors, setErrors] = useState<Partial<UserDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDetails> = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    // UPI ID validation
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!formData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!upiRegex.test(formData.upiId)) {
      newErrors.upiId = 'Please enter a valid UPI ID (e.g., name@paytm)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    localStorage.setItem('userDetails', JSON.stringify(formData));
    
    toast.success('Details saved successfully!');
    
    setIsSubmitting(false);
    onComplete(formData);
  };

  const handleChange = (field: keyof UserDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity 
            }}
            className="text-6xl mb-4"
          >
            🎁
          </motion.div>
          <h1 className="text-3xl md:text-4xl text-white mb-2">
            Claim Your Reward
          </h1>
          <p className="text-white/80">
            Enter your details to receive your prize money
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 space-y-6"
        >
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 bg-green-50 border-2 border-green-200 rounded-2xl p-3">
            <Shield className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">
              Your information is secure and encrypted
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* UPI ID */}
            <div className="space-y-2">
              <Label htmlFor="upiId" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                UPI ID
              </Label>
              <Input
                id="upiId"
                type="text"
                placeholder="yourname@paytm / @googlepay / @phonepe"
                value={formData.upiId}
                onChange={(e) => handleChange('upiId', e.target.value.toLowerCase())}
                className={errors.upiId ? 'border-red-500' : ''}
              />
              {errors.upiId && (
                <p className="text-red-500 text-sm">{errors.upiId}</p>
              )}
              <p className="text-xs text-gray-500">
                Enter your UPI ID to receive instant payment
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Continue to Claim
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
            <p className="text-xs text-gray-700 text-center">
              💡 Your reward will be transferred to your UPI ID within 24-48 hours after verification
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-white/70 text-sm">
            🔒 SSL Encrypted | 🛡️ Data Protected | ⚡ Instant Processing
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
