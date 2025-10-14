import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Building2,
  Users,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Shield,
  Zap,
  BarChart3,
  Calendar,
  FileText,
  Download,
  LogOut,
  Bell,
  Activity,
  Flame,
  Wind,
  Droplets,
  AlertCircle
} from 'lucide-react';
import { getInstitutionById } from './shared/institutionHelpers';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface InstitutionAdminData {
  institutionId: string;
  adminName: string;
  role: string;
}

interface InstitutionAdminDashboardProps {
  adminData: InstitutionAdminData | null;
  onLogout: () => void;
}

export function InstitutionAdminDashboard({ adminData, onLogout }: InstitutionAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Get institution data
  const institution = useMemo(() => {
    if (!adminData?.institutionId) return null;
    return getInstitutionById(adminData.institutionId);
  }, [adminData?.institutionId]);

  if (!institution || !adminData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Dashboard</CardTitle>
            <CardDescription>Unable to load institution data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onLogout} variant="outline" className="w-full">
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate statistics
  const compliancePercentage = institution.compliance.complianceScore;
  const trainingCompletion = (institution.compliance.trainingModulesCompleted / institution.compliance.totalTrainingModules) * 100;
  const drillCompletion = (institution.compliance.safetyDrillsCompleted / institution.compliance.requiredSafetyDrills) * 100;

  // Mock data for student performance
  const studentProgressData = [
    { range: '0-20%', count: 12 },
    { range: '21-40%', count: 45 },
    { range: '41-60%', count: 156 },
    { range: '61-80%', count: 398 },
    { range: '81-100%', count: 639 }
  ];

  // Monthly drill participation
  const drillParticipationData = [
    { month: 'Aug', participation: 85, target: 90 },
    { month: 'Sep', participation: 88, target: 90 },
    { month: 'Oct', participation: 92, target: 90 },
    { month: 'Nov', participation: 89, target: 90 },
    { month: 'Dec', participation: 95, target: 90 },
    { month: 'Jan', participation: 93, target: 90 }
  ];

  // Module completion by category
  const moduleCompletionData = [
    { name: 'Fire Safety', value: 92 },
    { name: 'Earthquake', value: 88 },
    { name: 'Flood Response', value: 85 },
    { name: 'First Aid', value: 90 },
    { name: 'Evacuation', value: 95 }
  ];

  // Readiness assessment
  const readinessData = [
    { subject: 'Training', A: institution.avgProgress, fullMark: 100 },
    { subject: 'Drills', A: drillCompletion, fullMark: 100 },
    { subject: 'Equipment', A: 85, fullMark: 100 },
    { subject: 'Staff', A: 90, fullMark: 100 },
    { subject: 'Response', A: 88, fullMark: 100 }
  ];

  const COLORS = ['#2563eb', '#f97316', '#10b981', '#8b5cf6', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Mobile-Optimized Header */}
  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl sticky top-0 z-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="px-3 sm:px-4 py-3 relative">
          {/* Top row: Icon, Name, Logout */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Enhanced Icon with Glow Effect */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-white rounded-xl blur-md opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-white/90 to-white/70 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/30">
                  <Building2 className="w-6 h-6 text-blue-700" />
                </div>
                {/* Decorative Corner Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Institution Info with Better Typography */}
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-bold text-white truncate drop-shadow-sm">
                  {institution.name}
                </h1>
                <p className="text-xs text-white/80 truncate flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-white/60 rounded-full"></span>
                  {institution.district}, {institution.state}
                </p>
              </div>
            </div>

            {/* Enhanced Logout Button */}
            <Button 
              onClick={onLogout} 
              size="sm" 
              className="gap-1.5 flex-shrink-0 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
              variant="outline"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>

          {/* Bottom row: Enhanced Stats and Notifications */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Students Badge with Gradient */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <Badge className="relative bg-white/95 hover:bg-white text-blue-700 border-0 gap-1.5 text-xs px-2.5 py-1 shadow-md">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">{institution.students.toLocaleString()}</span>
                </Badge>
              </div>

              {/* Code Badge with Gradient */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <Badge className="relative bg-white/95 hover:bg-white text-purple-700 border-0 gap-1.5 text-xs px-2.5 py-1 shadow-md font-mono font-semibold">
                  {institution.code}
                </Badge>
              </div>
            </div>

            {/* Enhanced Notification Bell */}
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-lg blur-sm opacity-30"></div>
              <Button 
                size="sm" 
                className="relative h-9 w-9 p-0 bg-white/10 hover:bg-white/20 border-white/30 backdrop-blur-sm"
                variant="outline"
              >
                <Bell className="w-4 h-4 text-white" />
                {institution.activeAlerts > 0 && (
                  <>
                    {/* Pulsing glow effect */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">
                      {institution.activeAlerts}
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom accent line with gradient */}
        <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-4 py-4">
        {/* Welcome Message - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Welcome, {adminData.adminName.split(' ')[0]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {adminData.role} • Institution Admin Dashboard
          </p>
        </motion.div>

        {/* Key Metrics Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-blue-600 text-xs px-1.5 py-0.5">
                    {compliancePercentage >= 90 ? 'Excellent' : compliancePercentage >= 75 ? 'Good' : 'Alert'}
                  </Badge>
                </div>
                <h3 className="text-xs text-slate-600 mb-0.5">Compliance Score</h3>
                <p className="text-2xl font-bold text-slate-900 mb-1.5">{compliancePercentage}%</p>
                <Progress value={compliancePercentage} className="h-1.5" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-green-600 text-xs px-1.5 py-0.5">
                    {institution.compliance.trainingModulesCompleted}/{institution.compliance.totalTrainingModules}
                  </Badge>
                </div>
                <h3 className="text-xs text-slate-600 mb-0.5">Training Modules</h3>
                <p className="text-2xl font-bold text-slate-900 mb-1.5">{Math.round(trainingCompletion)}%</p>
                <Progress value={trainingCompletion} className="h-1.5 bg-green-200" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-orange-600 text-xs px-1.5 py-0.5">
                    {institution.compliance.safetyDrillsCompleted}/{institution.compliance.requiredSafetyDrills}
                  </Badge>
                </div>
                <h3 className="text-xs text-slate-600 mb-0.5">Safety Drills</h3>
                <p className="text-2xl font-bold text-slate-900 mb-1.5">{Math.round(drillCompletion)}%</p>
                <Progress value={drillCompletion} className="h-1.5 bg-orange-200" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-purple-600 text-xs px-1.5 py-0.5">Avg</Badge>
                </div>
                <h3 className="text-xs text-slate-600 mb-0.5">Student Progress</h3>
                <p className="text-2xl font-bold text-slate-900 mb-1.5">{institution.avgProgress}%</p>
                <Progress value={institution.avgProgress} className="h-1.5 bg-purple-200" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs for detailed views - Mobile Optimized */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="gap-1 px-2 py-2 flex-col sm:flex-row text-xs">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-1 px-2 py-2 flex-col sm:flex-row text-xs">
              <Users className="w-4 h-4" />
              <span className="text-xs">Students</span>
            </TabsTrigger>
            <TabsTrigger value="drills" className="gap-1 px-2 py-2 flex-col sm:flex-row text-xs">
              <Activity className="w-4 h-4" />
              <span className="text-xs">Drills</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-1 px-2 py-2 flex-col sm:flex-row text-xs">
              <Award className="w-4 h-4" />
              <span className="text-xs">Cert</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Readiness Radar Chart */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4 text-blue-600" />
                    Disaster Readiness
                  </CardTitle>
                  <CardDescription className="text-xs">Overall preparedness across key areas</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={readinessData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="Readiness" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Student Progress Distribution */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="w-4 h-4 text-purple-600" />
                    Student Progress
                  </CardTitle>
                  <CardDescription className="text-xs">Students in each progress range</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={studentProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="w-4 h-4 text-green-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    {[
                      { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Fire drill completed', time: '2h ago' },
                      { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', text: '45 students completed Module 4', time: '5h ago' },
                      { icon: Award, color: 'text-purple-600', bg: 'bg-purple-100', text: 'Certificate renewed', time: '1d ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className={`w-8 h-8 rounded-lg ${activity.bg} flex items-center justify-center flex-shrink-0`}>
                          <activity.icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900">{activity.text}</p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    {institution.activeAlerts > 0 ? (
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-900">Heavy Rainfall Alert</p>
                            <p className="text-xs text-slate-600 mt-0.5">Review flood preparedness</p>
                            <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-xs text-slate-600">No active alerts</p>
                      </div>
                    )}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Bell className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-900">Upcoming Drill</p>
                          <p className="text-xs text-slate-600 mt-0.5">Earthquake drill on Jan 25</p>
                          <p className="text-xs text-slate-500 mt-1">5 days remaining</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Student Performance</CardTitle>
                <CardDescription className="text-xs">Progress and participation breakdown</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-slate-600 mb-0.5">Total</p>
                      <p className="text-lg font-bold text-slate-900">{institution.students}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-slate-600 mb-0.5">Active</p>
                      <p className="text-lg font-bold text-slate-900">{Math.round(institution.students * 0.92)}</p>
                      <p className="text-xs text-green-600">92%</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-slate-600 mb-0.5">Certified</p>
                      <p className="text-lg font-bold text-slate-900">{Math.round(institution.students * 0.68)}</p>
                      <p className="text-xs text-purple-600">68%</p>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={studentProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#8b5cf6" name="Students" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Module Completion */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Module Completion</CardTitle>
                <CardDescription className="text-xs">Completion rates by category</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-3">
                  {moduleCompletionData.map((module, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-700">{module.name}</span>
                        <span className="text-xs font-bold text-slate-900">{module.value}%</span>
                      </div>
                      <Progress value={module.value} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drills Tab */}
          <TabsContent value="drills" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Drill Participation</CardTitle>
                <CardDescription className="text-xs">Monthly rates vs target</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={drillParticipationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="participation" stroke="#2563eb" strokeWidth={2} name="Participation %" />
                    <Line type="monotone" dataKey="target" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" name="Target %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Drills */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Drills</CardTitle>
                <CardDescription className="text-xs">History and performance</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2">
                  {[
                    { type: 'Fire Drill', date: 'Jan 15', participation: 98, avgTime: '3:45', icon: Flame, color: 'orange' },
                    { type: 'Earthquake', date: 'Dec 20', participation: 95, avgTime: '4:20', icon: Activity, color: 'purple' },
                    { type: 'Flood Evac', date: 'Nov 10', participation: 92, avgTime: '5:10', icon: Droplets, color: 'blue' }
                  ].map((drill, index) => (
                    <div key={index} className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className={`w-8 h-8 bg-${drill.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <drill.icon className={`w-4 h-4 text-${drill.color}-600`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-900 truncate">{drill.type}</p>
                            <p className="text-xs text-slate-500">{drill.date}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="text-xs font-medium text-slate-900">{drill.participation}%</p>
                          <p className="text-xs text-slate-500">{drill.avgTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="w-4 h-4 text-blue-600" />
                  Compliance Certificate
                </CardTitle>
                <CardDescription className="text-xs">Current certification status</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="min-w-0 flex-1">
                        <Badge className="bg-green-600 mb-2 text-xs">
                          {institution.compliance.certificateStatus === 'issued' ? 'Active' : 'Pending'}
                        </Badge>
                        <h3 className="text-sm font-bold text-slate-900">Disaster Readiness Certificate</h3>
                        <p className="text-xs text-slate-600 mt-1 truncate">ID: {institution.compliance.certificateId}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1.5 flex-shrink-0">
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-xs">Download</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className="text-xs text-slate-500">Issue Date</p>
                        <p className="text-xs font-medium text-slate-900">{institution.compliance.certificateIssueDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Expiry Date</p>
                        <p className="text-xs font-medium text-slate-900">{institution.compliance.certificateExpiryDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Requirements */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-medium text-slate-900">Training Modules</h4>
                        <Badge variant="outline" className="text-xs">{institution.compliance.trainingModulesCompleted}/{institution.compliance.totalTrainingModules}</Badge>
                      </div>
                      <Progress value={(institution.compliance.trainingModulesCompleted / institution.compliance.totalTrainingModules) * 100} className="h-1.5" />
                      <p className="text-xs text-slate-500 mt-1.5">All required modules completed</p>
                    </div>

                    <div className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-medium text-slate-900">Safety Drills</h4>
                        <Badge variant="outline" className="text-xs">{institution.compliance.safetyDrillsCompleted}/{institution.compliance.requiredSafetyDrills}</Badge>
                      </div>
                      <Progress value={(institution.compliance.safetyDrillsCompleted / institution.compliance.requiredSafetyDrills) * 100} className="h-1.5" />
                      <p className="text-xs text-slate-500 mt-1.5">Quarterly drills completed</p>
                    </div>
                  </div>

                  {/* Last Audit Info */}
                  <Card className="bg-slate-50">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-900">Last Audit</p>
                          <p className="text-xs text-slate-600">{institution.compliance.lastAuditDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
