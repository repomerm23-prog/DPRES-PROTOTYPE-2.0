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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md">
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
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{institution.name}</h1>
                <p className="text-sm text-slate-600">{institution.district}, {institution.state} • {institution.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <Users className="w-4 h-4" />
                {institution.students} Students
              </Badge>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {institution.activeAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {institution.activeAlerts}
                  </span>
                )}
              </Button>
              <Button onClick={onLogout} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome, {adminData.adminName}
          </h2>
          <p className="text-lg text-slate-600">
            {adminData.role} • Institution Admin Dashboard
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-600">
                    {compliancePercentage >= 90 ? 'Excellent' : compliancePercentage >= 75 ? 'Good' : 'Needs Attention'}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Compliance Score</h3>
                <p className="text-3xl font-bold text-slate-900 mb-2">{compliancePercentage}%</p>
                <Progress value={compliancePercentage} className="h-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-600">
                    {institution.compliance.trainingModulesCompleted}/{institution.compliance.totalTrainingModules}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Training Modules</h3>
                <p className="text-3xl font-bold text-slate-900 mb-2">{Math.round(trainingCompletion)}%</p>
                <Progress value={trainingCompletion} className="h-2 bg-green-200" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-600">
                    {institution.compliance.safetyDrillsCompleted}/{institution.compliance.requiredSafetyDrills}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Safety Drills</h3>
                <p className="text-3xl font-bold text-slate-900 mb-2">{Math.round(drillCompletion)}%</p>
                <Progress value={drillCompletion} className="h-2 bg-orange-200" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-600">Avg Progress</Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Student Progress</h3>
                <p className="text-3xl font-bold text-slate-900 mb-2">{institution.avgProgress}%</p>
                <Progress value={institution.avgProgress} className="h-2 bg-purple-200" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs for detailed views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger value="drills" className="gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Drills</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Readiness Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Disaster Readiness Assessment
                  </CardTitle>
                  <CardDescription>Overall preparedness across key areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={readinessData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Readiness" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Student Progress Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Student Progress Distribution
                  </CardTitle>
                  <CardDescription>Number of students in each progress range</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={studentProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Fire drill completed successfully', time: '2 hours ago' },
                      { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', text: '45 students completed Module 4', time: '5 hours ago' },
                      { icon: Award, color: 'text-purple-600', bg: 'bg-purple-100', text: 'Compliance certificate renewed', time: '1 day ago' },
                      { icon: Users, color: 'text-orange-600', bg: 'bg-orange-100', text: '12 new students enrolled', time: '2 days ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className={`w-10 h-10 rounded-lg ${activity.bg} flex items-center justify-center flex-shrink-0`}>
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">{activity.text}</p>
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Active Alerts & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {institution.activeAlerts > 0 ? (
                      <>
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-slate-900">Heavy Rainfall Alert</p>
                              <p className="text-sm text-slate-600 mt-1">Moderate to heavy rainfall expected. Review flood preparedness.</p>
                              <p className="text-xs text-slate-500 mt-2">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <p className="text-slate-600">No active alerts</p>
                        <p className="text-sm text-slate-500 mt-1">Your institution is all clear</p>
                      </div>
                    )}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900">Upcoming Drill Scheduled</p>
                          <p className="text-sm text-slate-600 mt-1">Earthquake drill scheduled for Jan 25, 2025</p>
                          <p className="text-xs text-slate-500 mt-2">5 days remaining</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Analytics</CardTitle>
                <CardDescription>Detailed breakdown of student progress and participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Total Students</p>
                      <p className="text-2xl font-bold text-slate-900">{institution.students}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Active Learners</p>
                      <p className="text-2xl font-bold text-slate-900">{Math.round(institution.students * 0.92)}</p>
                      <p className="text-xs text-green-600 mt-1">92% engagement</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Certifications Earned</p>
                      <p className="text-2xl font-bold text-slate-900">{Math.round(institution.students * 0.68)}</p>
                      <p className="text-xs text-purple-600 mt-1">68% completion</p>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={studentProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8b5cf6" name="Number of Students" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Module Completion by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Module Completion by Category</CardTitle>
                <CardDescription>Average completion rates across different disaster types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moduleCompletionData.map((module, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{module.name}</span>
                        <span className="text-sm font-bold text-slate-900">{module.value}%</span>
                      </div>
                      <Progress value={module.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drills Tab */}
          <TabsContent value="drills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Drill Participation Trends</CardTitle>
                <CardDescription>Monthly participation rates vs target goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={drillParticipationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="participation" stroke="#2563eb" strokeWidth={3} name="Participation %" />
                    <Line type="monotone" dataKey="target" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" name="Target %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Drills */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Safety Drills</CardTitle>
                <CardDescription>History of conducted drills and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Fire Drill', date: 'Jan 15, 2025', participation: 98, avgTime: '3:45', icon: Flame, color: 'orange' },
                    { type: 'Earthquake Drill', date: 'Dec 20, 2024', participation: 95, avgTime: '4:20', icon: Activity, color: 'purple' },
                    { type: 'Flood Evacuation', date: 'Nov 10, 2024', participation: 92, avgTime: '5:10', icon: Droplets, color: 'blue' },
                    { type: 'Cyclone Drill', date: 'Oct 5, 2024', participation: 89, avgTime: '6:30', icon: Wind, color: 'green' }
                  ].map((drill, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-${drill.color}-100 rounded-lg flex items-center justify-center`}>
                            <drill.icon className={`w-5 h-5 text-${drill.color}-600`} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{drill.type}</p>
                            <p className="text-sm text-slate-500">{drill.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">{drill.participation}% Participation</p>
                          <p className="text-xs text-slate-500">Avg Time: {drill.avgTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  Compliance Certificate Status
                </CardTitle>
                <CardDescription>Current certification and compliance requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge className="bg-green-600 mb-2">
                          {institution.compliance.certificateStatus === 'issued' ? 'Active' : 'Pending'}
                        </Badge>
                        <h3 className="text-xl font-bold text-slate-900">Disaster Readiness Certificate</h3>
                        <p className="text-sm text-slate-600 mt-1">Certificate ID: {institution.compliance.certificateId}</p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-slate-500">Issue Date</p>
                        <p className="text-sm font-medium text-slate-900">{institution.compliance.certificateIssueDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Expiry Date</p>
                        <p className="text-sm font-medium text-slate-900">{institution.compliance.certificateExpiryDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-900">Training Modules</h4>
                        <Badge variant="outline">{institution.compliance.trainingModulesCompleted}/{institution.compliance.totalTrainingModules}</Badge>
                      </div>
                      <Progress value={(institution.compliance.trainingModulesCompleted / institution.compliance.totalTrainingModules) * 100} className="h-2" />
                      <p className="text-xs text-slate-500 mt-2">All required modules completed</p>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-900">Safety Drills</h4>
                        <Badge variant="outline">{institution.compliance.safetyDrillsCompleted}/{institution.compliance.requiredSafetyDrills}</Badge>
                      </div>
                      <Progress value={(institution.compliance.safetyDrillsCompleted / institution.compliance.requiredSafetyDrills) * 100} className="h-2" />
                      <p className="text-xs text-slate-500 mt-2">Quarterly drills completed</p>
                    </div>
                  </div>

                  {/* Last Audit Info */}
                  <Card className="bg-slate-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Last Audit</p>
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
