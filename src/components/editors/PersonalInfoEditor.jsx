import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const PersonalInfoEditor = ({ data, onUpdate }) => {
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('profileImage', e.target.result);
        toast({
          title: "Image uploaded successfully!",
          description: "Your profile picture has been added."
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    handleInputChange('profileImage', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold gradient-text mb-4">Personal Information</h3>
        
        <div className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {data.profileImage ? (
                <div className="relative">
                  <img
                    src={data.profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <Button
                    onClick={removeImage}
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            
            <div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </Button>
              <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={data.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="New York, NY"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={data.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://johndoe.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={data.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              placeholder="Brief overview of your professional background and key achievements..."
              className="mt-1 min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInfoEditor;