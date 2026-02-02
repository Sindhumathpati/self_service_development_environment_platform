import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Circle, Search, Filter, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { DevelopmentEnvironments } from '@/entities';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DashboardPage() {
  const [environments, setEnvironments] = useState<DevelopmentEnvironments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadEnvironments();
  }, []);

  const loadEnvironments = async () => {
    try {
      const result = await BaseCrudService.getAll<DevelopmentEnvironments>('environments');
      setEnvironments(result.items);
    } catch (error) {
      console.error('Failed to load environments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEnvironments = environments.filter((env) => {
    const matchesSearch = env.environmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         env.owner?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || env.status === statusFilter;
    const matchesType = typeFilter === 'all' || env.environmentType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dashboard Header */}
      <section className="w-full bg-primary border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="font-heading text-4xl lg:text-6xl text-primary-foreground uppercase tracking-wider mb-2">
                DASHBOARD
              </h1>
              <p className="font-paragraph text-base text-primary-foreground/80">
                Manage your development environments
              </p>
            </div>
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/request-environment">
                <Plus className="mr-2 h-5 w-5" /> REQUEST ENVIRONMENT
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full bg-background border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-subtletext" />
              <Input
                type="text"
                placeholder="Search environments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-gridline"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-background border-gridline">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Stopped">Stopped</SelectItem>
                <SelectItem value="Provisioning">Provisioning</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-background border-gridline">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Environments List */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-12 min-h-[500px]">
        {isLoading ? null : filteredEnvironments.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {filteredEnvironments.map((env, index) => (
              <motion.div
                key={env._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={`/environment/${env._id}`}
                  className="block bg-background border border-gridline p-6 hover:border-foreground transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Name & Type */}
                    <div>
                      <h3 className="font-heading text-lg text-foreground uppercase tracking-wider mb-1">
                        {env.environmentName}
                      </h3>
                      <p className="font-paragraph text-sm text-subtletext">
                        {env.environmentType}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <Circle className={`h-3 w-3 fill-current ${getStatusColor(env.status)}`} />
                      <span className={`font-paragraph text-sm uppercase tracking-wider ${getStatusColor(env.status)}`}>
                        {env.status}
                      </span>
                    </div>

                    {/* Owner */}
                    <div>
                      <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                        OWNER
                      </p>
                      <p className="font-paragraph text-sm text-foreground">
                        {env.owner}
                      </p>
                    </div>

                    {/* Access URL */}
                    <div className="text-right">
                      {env.accessUrl && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-gridline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a href={env.accessUrl} target="_blank" rel="noopener noreferrer">
                            ACCESS
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-subtletext mb-4">
              {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'No environments match your filters.'
                : 'No environments found.'}
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/request-environment">
                <Plus className="mr-2 h-5 w-5" /> REQUEST YOUR FIRST ENVIRONMENT
              </Link>
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
