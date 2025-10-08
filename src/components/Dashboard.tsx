import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { EmergencySOS } from './EmergencySOS';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Shield, 
  Clock,
  Users,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Award,
  Target
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAlerts } from './shared/AlertContext';
import { getInstitutionById } from './shared/institutionsData';

interface DashboardProps {
  userData?: {
    schoolName: string;
    schoolCode: string;
    studentName: string;
    age: string;
    institutionType: 'school' | 'college';
  } | null;
}

// Type for alert mapping
type AlertType = 'fire' | 'earthquake' | 'medical' | 'other';
type AlertSeverity = 'high' | 'medium' | 'low';

export function Dashboard({ userData }: DashboardProps) {
  const { t } = useLanguage();
  const { addAlert } = useAlerts();
  
  // Refs for cleanup
  const sosTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const incidentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lazy initialization for alerts - only compute once
  const alerts = useMemo(() => [
    {
      id: 1,
      type: 'warning' as const,
      title: t('dashboard.alerts.heavyRainfall'),
      description: t('dashboard.alerts.rainfallDesc'),
      time: t('dashboard.alerts.timeAgo2h'),
      region: t('dashboard.alerts.chennaiDistrict')
    },
    {
      id: 2,
      type: 'warning' as const,
      title: t('dashboard.alerts.earthquakeTremors'),
      description: t('dashboard.alerts.seismicDesc'),
      time: t('dashboard.alerts.timeAgo6h'),
      region: t('TamilNadu Region')
    }
  ], [t]);

  // Student's learning progress data - memoized
  const studentProgress = useMemo(() => ({
    overallProgress: 72,
    modulesCompleted: 4,
    totalModules: 6,
    vrTrainingsCompleted: 2,
    totalVrTrainings: 3,
    latestQuizScore: 85
  }), []);

  // Emergency contacts data - memoized
  const emergencyContacts = useMemo(() => [
    { id: 'fire', name: t('dashboard.emergencyContacts.fire'), number: '101', icon: '🔥' },
    { id: 'police', name: t('dashboard.emergencyContacts.police'), number: '100', icon: '👮' },
    { id: 'medical', name: t('dashboard.emergencyContacts.medical'), number: '108', icon: '🚑' },
    { id: 'disaster', name: t('dashboard.emergencyContacts.disaster'), number: '1070', icon: '🌊' }
  ], [t]);

  // Modal and panel states
  const [contactsSheetOpen, setContactsSheetOpen] = useState(false);
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [sosConfirmed, setSosConfirmed] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  // Incident form state
  const [incidentForm, setIncidentForm] = useState({
    type: '',
    location: '',
    description: ''
  });

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (sosTimeoutRef.current) clearTimeout(sosTimeoutRef.current);
      if (incidentTimeoutRef.current) clearTimeout(incidentTimeoutRef.current);
    };
  }, []);

  // Memoized alert type mapping with proper types
  const alertTypeMap = useMemo(() => ({
    fire: 'Fire Alert' as const,
    earthquake: 'Earthquake Alert' as const,
    medical: 'Medical Emergency' as const,
    other: 'General Emergency' as const
  }), []);

  // Optimized SOS handler with proper cleanup
  const handleSosConfirm = useCallback(() => {
    // Clear any existing timeout
    if (sosTimeoutRef.current) {
      clearTimeout(sosTimeoutRef.current);
    }

    const institution = getInstitutionById(userData?.schoolCode || '');
    
    if (institution && userData) {
      // Add real SOS alert to AlertContext
      addAlert({
        institution: institution.name,
        institutionId: institution.id,
        district: institution.district,
        state: institution.state,
        studentName: userData.studentName,
        type: 'General Emergency',
        status: 'active',
        location: 'Student Dashboard',
        severity: 'high' as AlertSeverity,
        description: `Emergency SOS alert triggered by student ${userData.studentName}`,
        coordinates: institution.coordinates
      });
    }
    
    setSosConfirmed(true);
    
    // Reset after 3 seconds with proper cleanup
    sosTimeoutRef.current = setTimeout(() => {
      setSosConfirmed(false);
      sosTimeoutRef.current = null;
    }, 3000);
  }, [userData, addAlert]);

  // Optimized incident submit handler
  const handleIncidentSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing timeout
    if (incidentTimeoutRef.current) {
      clearTimeout(incidentTimeoutRef.current);
    }

    const institution = getInstitutionById(userData?.schoolCode || '');
    
    if (institution && userData && incidentForm.type && incidentForm.location && incidentForm.description) {
      const incidentType = incidentForm.type as AlertType;
      const severity: AlertSeverity = (incidentType === 'fire' || incidentType === 'medical') ? 'high' : 'medium';
      
      // Add incident report as alert to AlertContext
      addAlert({
        institution: institution.name,
        institutionId: institution.id,
        district: institution.district,
        state: institution.state,
        studentName: userData.studentName,
        type: alertTypeMap[incidentType] || 'General Emergency',
        status: 'pending',
        location: incidentForm.location,
        severity,
        description: incidentForm.description,
        coordinates: institution.coordinates
      });
    }
    
    setIncidentSubmitted(true);
    setIncidentModalOpen(false);
    setIncidentForm({ type: '', location: '', description: '' });
    
    // Reset after 3 seconds with proper cleanup
    incidentTimeoutRef.current = setTimeout(() => {
      setIncidentSubmitted(false);
      incidentTimeoutRef.current = null;
    }, 3000);
  }, [userData, incidentForm, addAlert, alertTypeMap]);

  // Optimized call handler
  const handleCall = useCallback((number: string) => {
    // In a real app, this would trigger the device's call functionality
    window.open(`tel:${number}`, '_self');
  }, []);

  // Optimized form field updaters
  const handleIncidentTypeChange = useCallback((value: string) => {
    setIncidentForm(prev => ({ ...prev, type: value }));
  }, []);

  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIncidentForm(prev => ({ ...prev, location: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIncidentForm(prev => ({ ...prev, description: e.target.value }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 break-words">{t('dashboard.welcome')}</h1>
          <p className="text-gray-600 dark:text-gray-400 break-words">{t('dashboard.overview')}</p>
        </div>

        {/* Emergency Tools - Optimized with smooth transitions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <EmergencySOS onConfirm={handleSosConfirm} variant="dashboard">
            <Button 
              className="h-16 sm:h-20 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex flex-col items-center justify-center space-y-1 sm:space-y-2 shadow-lg w-full transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Emergency SOS Alert"
            >
              <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="font-semibold text-sm sm:text-base">{t('landing.sos')}</span>
            </Button>
          </EmergencySOS>
          
          <Button 
            onClick={() => setContactsSheetOpen(true)}
            variant="outline" 
            className="h-16 sm:h-20 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Quick Emergency Contacts"
          >
            <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="font-semibold text-sm sm:text-base">{t('landing.contacts')}</span>
          </Button>
          
          <Button 
            onClick={() => setIncidentModalOpen(true)}
            variant="outline" 
            className="h-16 sm:h-20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Report Incident"
          >
            <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="font-semibold text-sm sm:text-base">{t('landing.report')}</span>
          </Button>
        </div>

        {/* Success Messages with smooth animations */}
        {sosConfirmed && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 shadow-sm">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
                ✅ {t('dashboard.sos.success')}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {incidentSubmitted && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 shadow-sm">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
                ✅ {t('dashboard.incident.success')}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Alerts - Optimized rendering */}
            <Card className="bg-card dark:bg-card border-border dark:border-border transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground dark:text-card-foreground">
                  <AlertTriangle className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                  <span className="break-words">{t('dashboard.alerts.title')}</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground dark:text-muted-foreground break-words">
                  {t('dashboard.alerts.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => {
                  const isWarning = alert.type === 'warning';
                  return (
                    <Alert 
                      key={alert.id} 
                      className={`transition-all duration-200 hover:shadow-sm ${
                        isWarning 
                          ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20' 
                          : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {isWarning ? (
                          <AlertCircle className="h-5 w-5 text-orange-500 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-foreground dark:text-foreground break-words flex-1">{alert.title}</h4>
                            <Badge variant="outline" className="text-xs shrink-0 whitespace-nowrap">
                              <MapPin className="h-3 w-3 mr-1" />
                              {alert.region}
                            </Badge>
                          </div>
                          <AlertDescription className="text-sm text-muted-foreground dark:text-muted-foreground break-words">{alert.description}</AlertDescription>
                          <div className="flex items-center text-xs text-muted-foreground dark:text-muted-foreground mt-2">
                            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    </Alert>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Access - Optimized with smooth interactions */}
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{t('dashboard.quickAccess.title')}</CardTitle>
                <CardDescription>{t('dashboard.quickAccess.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                    aria-label="Safety Protocols"
                  >
                    <Shield className="h-6 w-6" />
                    <span className="text-xs sm:text-sm text-center">{t('dashboard.quickAccess.safetyProtocols')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                    aria-label="Evacuation Routes"
                  >
                    <MapPin className="h-6 w-6" />
                    <span className="text-xs sm:text-sm text-center">{t('dashboard.quickAccess.evacuationRoutes')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                    aria-label="Emergency Directory"
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-xs sm:text-sm text-center">{t('dashboard.quickAccess.emergencyDirectory')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                    aria-label="Incident Reports"
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-xs sm:text-sm text-center">{t('dashboard.quickAccess.incidentReports')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Student's Learning Progress - Optimized */}
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span>{t('dashboard.learningProgress')}</span>
                </CardTitle>
                <CardDescription>{t('dashboard.progressDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 tabular-nums">
                    {studentProgress.overallProgress}%
                  </div>
                  <Progress 
                    value={studentProgress.overallProgress} 
                    className="w-full h-2 transition-all duration-500" 
                    aria-label={`Learning progress: ${studentProgress.overallProgress}%`}
                  />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-muted/50">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="break-words">{t('dashboard.modulesCompleted')}</span>
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium tabular-nums">
                      {studentProgress.modulesCompleted}/{studentProgress.totalModules}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-muted/50">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                      <span className="break-words">{t('dashboard.vrTrainingsCompleted')}</span>
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium tabular-nums">
                      {studentProgress.vrTrainingsCompleted}/{studentProgress.totalVrTrainings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-muted/50">
                    <span className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                      <span className="break-words">{t('dashboard.latestQuizScore')}</span>
                    </span>
                    <span className="text-orange-600 dark:text-orange-400 font-medium tabular-nums">
                      {studentProgress.latestQuizScore}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity - Student Centric - Optimized */}
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
                <CardDescription>{t('dashboard.recentActivityDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-2 rounded-lg transition-colors hover:bg-muted/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" role="presentation"></div>
                  <div className="text-sm flex-1 min-w-0">
                    <p className="font-medium break-words">{t('dashboard.recentActivity.module4')}</p>
                    <p className="text-gray-500 dark:text-gray-400 break-words">{t('dashboard.recentActivity.keepProgress')}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('dashboard.recentActivity.timeAgo1h')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 rounded-lg transition-colors hover:bg-muted/50">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" role="presentation"></div>
                  <div className="text-sm flex-1 min-w-0">
                    <p className="font-medium break-words">{t('dashboard.recentActivity.vrFire')}</p>
                    <p className="text-gray-500 dark:text-gray-400 break-words">{t('dashboard.recentActivity.evacuationTime')}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('dashboard.recentActivity.timeAgo2d')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 rounded-lg transition-colors hover:bg-muted/50">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" role="presentation"></div>
                  <div className="text-sm flex-1 min-w-0">
                    <p className="font-medium break-words">{t('dashboard.recentActivity.quizEarthquake')}</p>
                    <p className="text-gray-500 dark:text-gray-400 break-words">{t('dashboard.recentActivity.performance')}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('dashboard.recentActivity.timeAgo3d')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts - Optimized with better interactions */}
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>{t('dashboard.emergencyContacts')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-muted/50">
                    <span className="text-sm font-medium break-words flex-1">{contact.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCall(contact.number)}
                      className="transition-all hover:scale-105 active:scale-95 shrink-0 ml-2"
                      aria-label={`Call ${contact.name} at ${contact.number}`}
                    >
                      {contact.number}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>



      {/* Quick Contacts Sheet */}
      <Sheet open={contactsSheetOpen} onOpenChange={setContactsSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-orange-500" />
              <span>{t('dashboard.emergencyContacts')}</span>
            </SheetTitle>
            <SheetDescription>
              {t('dashboard.emergencyContacts.tapToCall')}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className="p-4 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl" role="img" aria-label={contact.name}>{contact.icon}</span>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{contact.number}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(contact.number)}
                    className="bg-green-600 hover:bg-green-700 text-white transition-colors"
                    aria-label={`Call ${contact.name} at ${contact.number}`}
                  >
                    📞 {t('dashboard.emergencyContacts.call')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Report Incident Modal */}
      <Dialog open={incidentModalOpen} onOpenChange={setIncidentModalOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby="incident-dialog-description">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>{t('dashboard.incident.title')}</span>
            </DialogTitle>
            <DialogDescription id="incident-dialog-description">
              {t('dashboard.incident.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleIncidentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="incident-type">{t('dashboard.incident.type')}</Label>
              <Select
                value={incidentForm.type}
                onValueChange={handleIncidentTypeChange}
              >
                <SelectTrigger id="incident-type">
                  <SelectValue placeholder={t('dashboard.incident.selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">{t('dashboard.incident.fire')}</SelectItem>
                  <SelectItem value="earthquake">{t('dashboard.incident.earthquake')}</SelectItem>
                  <SelectItem value="medical">{t('dashboard.incident.medical')}</SelectItem>
                  <SelectItem value="other">{t('dashboard.incident.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('dashboard.incident.location')}</Label>
              <Input
                id="location"
                placeholder={t('dashboard.incident.locationPlaceholder')}
                value={incidentForm.location}
                onChange={handleLocationChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('dashboard.incident.descriptionLabel')}</Label>
              <Textarea
                id="description"
                placeholder={t('dashboard.incident.descriptionPlaceholder')}
                value={incidentForm.description}
                onChange={handleDescriptionChange}
                required
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('dashboard.incident.submit')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIncidentModalOpen(false)}
              >
                {t('common.cancel')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}