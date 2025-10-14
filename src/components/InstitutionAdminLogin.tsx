import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Building2, 
  School, 
  ArrowLeft,
  Lock,
  User,
  Mail,
  Shield,
  CheckCircle
} from 'lucide-react';
import { schools, colleges } from './shared/institutionsData';

interface InstitutionAdminLoginProps {
  onLogin: (data: {
    institutionId: string;
    adminName: string;
    role: string;
  }) => void;
  onBack: () => void;
}

export function InstitutionAdminLogin({ onLogin, onBack }: InstitutionAdminLoginProps) {
  const [step, setStep] = useState<'type' | 'select' | 'credentials'>('type');
  const [institutionType, setInstitutionType] = useState<'school' | 'college'>('school');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [credentials, setCredentials] = useState({
    adminName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const allInstitutions = institutionType === 'school' ? schools : colleges;

  const handleInstitutionTypeSelect = (type: 'school' | 'college') => {
    setInstitutionType(type);
    setStep('select');
  };

  const handleInstitutionSelect = (institutionId: string) => {
    setSelectedInstitution(institutionId);
    setStep('credentials');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!credentials.adminName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!credentials.email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!credentials.password) {
      setError('Please enter your password');
      return;
    }

    // For demo purposes, accept any password with at least 4 characters
    if (credentials.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    const institution = allInstitutions.find(inst => inst.id === selectedInstitution);
    
    onLogin({
      institutionId: selectedInstitution,
      adminName: credentials.adminName,
      role: institutionType === 'school' ? 'School Principal' : 'College Director'
    });
  };

  const getSelectedInstitution = () => {
    return allInstitutions.find(inst => inst.id === selectedInstitution);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center p-4 py-8 sm:py-12 overflow-y-auto">
      <div className="w-full max-w-2xl h-fit">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Institution Admin Portal</h1>
          <p className="text-slate-600">Access your institution's disaster preparedness dashboard</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 'type' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
          }`}>
            {step !== 'type' ? <CheckCircle className="w-5 h-5" /> : '1'}
          </div>
          <div className={`w-16 h-1 ${step !== 'type' ? 'bg-blue-600' : 'bg-slate-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 'select' ? 'bg-blue-600 text-white' : step === 'credentials' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400'
          }`}>
            {step === 'credentials' ? <CheckCircle className="w-5 h-5" /> : '2'}
          </div>
          <div className={`w-16 h-1 ${step === 'credentials' ? 'bg-blue-600' : 'bg-slate-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 'credentials' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
          }`}>
            3
          </div>
        </div>

        {/* Step 1: Institution Type */}
        {step === 'type' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <Card className="border-2 border-blue-200 hover:border-blue-400 cursor-pointer transition-all" onClick={() => handleInstitutionTypeSelect('school')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <School className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">School Administrator</h3>
                    <p className="text-slate-600 mt-1">Access school preparedness dashboard</p>
                  </div>
                  <Badge className="bg-blue-600">{schools.length} Schools</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 cursor-pointer transition-all" onClick={() => handleInstitutionTypeSelect('college')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">College Administrator</h3>
                    <p className="text-slate-600 mt-1">Access college preparedness dashboard</p>
                  </div>
                  <Badge className="bg-purple-600">{colleges.length} Colleges</Badge>
                </div>
              </CardContent>
            </Card>

            <Button onClick={onBack} variant="outline" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Login Type Selection
            </Button>
          </motion.div>
        )}

        {/* Step 2: Select Institution */}
        {step === 'select' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {institutionType === 'school' ? <School className="w-6 h-6 text-blue-600" /> : <Building2 className="w-6 h-6 text-purple-600" />}
                  Select Your {institutionType === 'school' ? 'School' : 'College'}
                </CardTitle>
                <CardDescription>
                  Choose the institution you administer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="institution">Institution Name</Label>
                  <Select value={selectedInstitution} onValueChange={handleInstitutionSelect}>
                    <SelectTrigger id="institution" className="mt-2">
                      <SelectValue placeholder={`Select ${institutionType === 'school' ? 'school' : 'college'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {allInstitutions
                        .sort((a, b) => {
                          // Sort Kolkata institutions first
                          const aKolkata = a.district === 'Kolkata' || a.district === 'Howrah';
                          const bKolkata = b.district === 'Kolkata' || b.district === 'Howrah';
                          if (aKolkata && !bKolkata) return -1;
                          if (!aKolkata && bKolkata) return 1;
                          return a.name.localeCompare(b.name);
                        })
                        .map((institution) => (
                          <SelectItem key={institution.id} value={institution.id}>
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-medium">{institution.name}</span>
                              <span className="text-sm text-slate-500">
                                {institution.district}, {institution.state}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setStep('type')} variant="outline" className="flex-1 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Credentials */}
        {step === 'credentials' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Administrator Login
                </CardTitle>
                <CardDescription>
                  Enter your credentials for {getSelectedInstitution()?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Selected Institution Display */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {institutionType === 'school' ? (
                        <School className="w-8 h-8 text-blue-600" />
                      ) : (
                        <Building2 className="w-8 h-8 text-purple-600" />
                      )}
                      <div>
                        <p className="font-medium text-slate-900">{getSelectedInstitution()?.name}</p>
                        <p className="text-sm text-slate-600">
                          {getSelectedInstitution()?.code} • {getSelectedInstitution()?.district}, {getSelectedInstitution()?.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="adminName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="adminName"
                      type="text"
                      placeholder="Enter your full name"
                      value={credentials.adminName}
                      onChange={(e) => setCredentials({ ...credentials, adminName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@institution.edu"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="mt-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Demo: Any password with 4+ characters</p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button type="button" onClick={() => setStep('select')} variant="outline" className="flex-1 gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Access Dashboard
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
