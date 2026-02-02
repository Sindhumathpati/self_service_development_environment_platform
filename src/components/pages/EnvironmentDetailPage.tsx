import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Circle, ExternalLink, Calendar, User, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { DevelopmentEnvironments } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function EnvironmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [environment, setEnvironment] = useState<DevelopmentEnvironments | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEnvironment();
  }, [id]);

  const loadEnvironment = async () => {
    if (!id) return;
    try {
      const data = await BaseCrudService.getById<DevelopmentEnvironments>('environments', id);
      setEnvironment(data);
    } catch (error) {
      console.error('Failed to load environment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'stopped':
        return 'text-subtletext';
      case 'provisioning':
        return 'text-yellow-600';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-subtletext';
    }
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-12 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : !environment ? (
          <div className="text-center py-20">
            <h2 className="font-heading text-3xl text-foreground uppercase tracking-wider mb-4">
              ENVIRONMENT NOT FOUND
            </h2>
            <p className="font-paragraph text-base text-subtletext mb-8">
              The environment you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/dashboard">
                <ArrowLeft className="mr-2 h-5 w-5" /> BACK TO DASHBOARD
              </Link>
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Button asChild variant="outline" className="mb-8 border-gridline">
              <Link to="/dashboard">
                <ArrowLeft className="mr-2 h-5 w-5" /> BACK TO DASHBOARD
              </Link>
            </Button>

            {/* Header */}
            <div className="bg-primary border border-gridline p-8 mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <h1 className="font-heading text-4xl lg:text-6xl text-primary-foreground uppercase tracking-wider mb-4">
                    {environment.environmentName}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Circle className={`h-4 w-4 fill-current ${getStatusColor(environment.status)}`} />
                      <span className={`font-paragraph text-base uppercase tracking-wider ${getStatusColor(environment.status)}`}>
                        {environment.status}
                      </span>
                    </div>
                    <span className="text-primary-foreground/40">|</span>
                    <span className="font-paragraph text-base text-primary-foreground/80">
                      {environment.environmentType}
                    </span>
                  </div>
                </div>
                {environment.accessUrl && (
                  <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <a href={environment.accessUrl} target="_blank" rel="noopener noreferrer">
                      ACCESS ENVIRONMENT <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Info Card */}
              <div className="bg-background border border-gridline p-8">
                <h2 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Settings className="h-6 w-6" />
                  ENVIRONMENT INFO
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                      OWNER
                    </p>
                    <p className="font-paragraph text-base text-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {environment.owner}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                      PROVISIONED DATE
                    </p>
                    <p className="font-paragraph text-base text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(environment.provisionedDate)}
                    </p>
                  </div>
                  {environment.accessUrl && (
                    <div>
                      <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                        ACCESS URL
                      </p>
                      <a
                        href={environment.accessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-paragraph text-base text-foreground hover:text-foreground/80 transition-colors break-all"
                      >
                        {environment.accessUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Configuration Card */}
              <div className="bg-background border border-gridline p-8">
                <h2 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-6">
                  CONFIGURATION
                </h2>
                <div className="bg-secondary border border-gridline p-4">
                  <pre className="font-paragraph text-sm text-foreground whitespace-pre-wrap break-words">
                    {environment.configurationDetails || 'No configuration details available'}
                  </pre>
                </div>
              </div>
            </div>

            {/* Logs Section */}
            <div className="bg-background border border-gridline p-8">
              <h2 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-6">
                RECENT LOGS
              </h2>
              <div className="bg-primary border border-gridline p-6 max-h-96 overflow-y-auto">
                <pre className="font-paragraph text-sm text-primary-foreground whitespace-pre-wrap break-words">
                  {environment.recentLogs || 'No recent logs available'}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
