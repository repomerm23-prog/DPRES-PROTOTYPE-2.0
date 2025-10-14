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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 py-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg mb-2">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Institution Admin Portal</h1>
          <p className="text-sm text-slate-600">Access your institution's disaster preparedness dashboard</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step === 'type' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
          }`}>
            {step !== 'type' ? <CheckCircle className="w-4 h-4" /> : '1'}
          </div>
          <div className={`w-12 h-0.5 ${step !== 'type' ? 'bg-blue-600' : 'bg-slate-200'}`} />
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step === 'select' ? 'bg-blue-600 text-white' : step === 'credentials' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400'
          }`}>
            {step === 'credentials' ? <CheckCircle className="w-4 h-4" /> : '2'}
          </div>
          <div className={`w-12 h-0.5 ${step === 'credentials' ? 'bg-blue-600' : 'bg-slate-200'}`} />
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
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
            className="space-y-3"
          >
            <Card className="border-2 border-blue-200 hover:border-blue-400 cursor-pointer transition-all" onClick={() => handleInstitutionTypeSelect('school')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <School className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">School Administrator</h3>
                    <p className="text-sm text-slate-600">Access school preparedness dashboard</p>
                  </div>
                  <Badge className="bg-blue-600 text-xs">{schools.length} Schools</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 cursor-pointer transition-all" onClick={() => handleInstitutionTypeSelect('college')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">College Administrator</h3>
                    <p className="text-sm text-slate-600">Access college preparedness dashboard</p>
                  </div>
                  <Badge className="bg-purple-600 text-xs">{colleges.length} Colleges</Badge>
                </div>
              </CardContent>
            </Card>

            <Button onClick={onBack} variant="outline" className="w-full gap-2 h-9">
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
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {institutionType === 'school' ? <School className="w-5 h-5 text-blue-600" /> : <Building2 className="w-5 h-5 text-purple-600" />}
                  Select Your {institutionType === 'school' ? 'School' : 'College'}
                </CardTitle>
                <CardDescription className="text-sm">
                  Choose the institution you administer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="institution" className="text-sm">Institution Name</Label>
                  <Select value={selectedInstitution} onValueChange={handleInstitutionSelect}>
                    <SelectTrigger id="institution" className="mt-1.5 h-9">
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
                  <Button onClick={() => setStep('type')} variant="outline" className="flex-1 gap-2 h-9">
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
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Administrator Login
                </CardTitle>
                <CardDescription className="text-sm">
                  Enter your credentials for {getSelectedInstitution()?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-3">
                  {/* Selected Institution Display */}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      {institutionType === 'school' ? (
                        <School className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Building2 className="w-6 h-6 text-purple-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-900">{getSelectedInstitution()?.name}</p>
                        <p className="text-xs text-slate-600">
                          {getSelectedInstitution()?.code} • {getSelectedInstitution()?.district}, {getSelectedInstitution()?.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="adminName" className="flex items-center gap-1.5 text-sm">
                      <User className="w-3.5 h-3.5" />
                      Full Name
                    </Label>
                    <Input
                      id="adminName"
                      type="text"
                      placeholder="Enter your full name"
                      value={credentials.adminName}
                      onChange={(e) => setCredentials({ ...credentials, adminName: e.target.value })}
                      className="mt-1.5 h-9"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1.5 text-sm">
                      <Mail className="w-3.5 h-3.5" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@institution.edu"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      className="mt-1.5 h-9"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="flex items-center gap-1.5 text-sm">
                      <Lock className="w-3.5 h-3.5" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="mt-1.5 h-9"
                    />
                    <p className="text-xs text-slate-500 mt-1">Demo: Any password with 4+ characters</p>
                  </div>

                  {error && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <Button type="button" onClick={() => setStep('select')} variant="outline" className="flex-1 gap-2 h-9">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-9">
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
