import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AlertCircle, TrendingUp, MapPin, Calendar } from 'lucide-react';

interface Incident {
  id: number;
  title: string;
  location: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

export function RecentIncidents() {

  const incidents: Incident[] = [
    {
      id: 1,
      title: 'Earthquake Preparedness - Chennai Case Study',
      location: 'Chennai, Tamil Nadu',
      date: 'September 2025',
      severity: 'high',
      description: 'Successful evacuation drill conducted across 50+ schools, reaching 15,000 students.'
    },
    {
      id: 2,
      title: 'Flood Response Training - Kerala',
      location: 'Kochi, Kerala',
      date: 'August 2025',
      severity: 'high',
      description: 'Community-wide flood preparedness training with VR simulations completed.'
    },
    {
      id: 3,
      title: 'Fire Safety Workshop - Mumbai',
      location: 'Mumbai, Maharashtra',
      date: 'July 2025',
      severity: 'medium',
      description: 'Inter-school fire safety competition and emergency response training.'
    },
    {
      id: 4,
      title: 'Cyclone Preparedness - Odisha',
      location: 'Bhubaneswar, Odisha',
      date: 'June 2025',
      severity: 'high',
      description: 'Pre-monsoon cyclone preparedness initiative across coastal educational institutions.'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 mr-2" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Recent Initiatives & Case Studies
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore successful disaster preparedness programs and learn from real-world implementations across India
          </p>
        </div>

        {/* Incidents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {incidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-base sm:text-lg break-words flex-1 dark:text-white">
                    {incident.title}
                  </CardTitle>
                  <Badge className={`${getSeverityColor(incident.severity)} ml-2 shrink-0`}>
                    {incident.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1 shrink-0" />
                    <span className="break-words">{incident.location}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1 shrink-0" />
                    <span>{incident.date}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base break-words dark:text-gray-300">
                  {incident.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-start">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 mr-3 mt-1 shrink-0" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Impact Metrics
              </h3>
              <p className="text-sm sm:text-base text-green-800 dark:text-green-200">
                These initiatives have collectively trained over <strong>60,000+ students</strong> and 
                <strong> 1,500+ educators</strong> across India, significantly improving institutional 
                disaster preparedness and response capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}