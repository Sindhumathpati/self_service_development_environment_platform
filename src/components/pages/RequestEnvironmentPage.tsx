import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BaseCrudService } from '@/integrations';
import { EnvironmentTypes } from '@/entities';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function RequestEnvironmentPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [environmentTypes, setEnvironmentTypes] = useState<EnvironmentTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    environmentName: '',
    environmentType: '',
    owner: '',
    configurationDetails: '',
  });

  useEffect(() => {
    loadEnvironmentTypes();
  }, []);

  const loadEnvironmentTypes = async () => {
    try {
      const result = await BaseCrudService.getAll<EnvironmentTypes>('environmenttypes');
      setEnvironmentTypes(result.items.filter(type => type.isActive));
    } catch (error) {
      console.error('Failed to load environment types:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create('environments', {
        _id: crypto.randomUUID(),
        environmentName: formData.environmentName,
        environmentType: formData.environmentType,
        owner: formData.owner,
        configurationDetails: formData.configurationDetails,
        status: 'Provisioning',
        provisionedDate: new Date().toISOString(),
        recentLogs: 'Environment provisioning initiated...',
      });

      toast({
        title: 'REQUEST SUBMITTED',
        description: 'Your environment is being provisioned. You will be notified when it is ready.',
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Failed to create environment:', error);
      toast({
        title: 'REQUEST FAILED',
        description: 'Failed to submit environment request. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-12">
        {/* Back Button */}
        <Button asChild variant="outline" className="mb-8 border-gridline">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-5 w-5" /> BACK TO DASHBOARD
          </Link>
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl lg:text-6xl text-foreground uppercase tracking-wider mb-4">
            REQUEST ENVIRONMENT
          </h1>
          <p className="font-paragraph text-base text-subtletext max-w-2xl">
            Fill out the form below to request a new development environment. Your request will be processed automatically.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <form onSubmit={handleSubmit} className="bg-background border border-gridline p-8 space-y-8">
            {/* Environment Name */}
            <div>
              <Label htmlFor="environmentName" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                ENVIRONMENT NAME *
              </Label>
              <Input
                id="environmentName"
                type="text"
                required
                value={formData.environmentName}
                onChange={(e) => handleChange('environmentName', e.target.value)}
                placeholder="my-dev-environment"
                className="bg-background border-gridline"
              />
            </div>

            {/* Environment Type */}
            <div>
              <Label htmlFor="environmentType" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                ENVIRONMENT TYPE *
              </Label>
              {isLoading ? (
                <div className="h-10 bg-secondary border border-gridline animate-pulse" />
              ) : (
                <Select value={formData.environmentType} onValueChange={(value) => handleChange('environmentType', value)} required>
                  <SelectTrigger className="bg-background border-gridline">
                    <SelectValue placeholder="Select environment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {environmentTypes.map((type) => (
                      <SelectItem key={type._id} value={type.typeName || ''}>
                        <div>
                          <div className="font-heading text-sm uppercase">{type.typeName}</div>
                          {type.description && (
                            <div className="font-paragraph text-xs text-subtletext">{type.description}</div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Owner */}
            <div>
              <Label htmlFor="owner" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                OWNER / REQUESTER *
              </Label>
              <Input
                id="owner"
                type="text"
                required
                value={formData.owner}
                onChange={(e) => handleChange('owner', e.target.value)}
                placeholder="your.email@company.com"
                className="bg-background border-gridline"
              />
            </div>

            {/* Configuration Details */}
            <div>
              <Label htmlFor="configurationDetails" className="font-heading text-sm text-foreground uppercase tracking-wider mb-2 block">
                CONFIGURATION DETAILS
              </Label>
              <Textarea
                id="configurationDetails"
                value={formData.configurationDetails}
                onChange={(e) => handleChange('configurationDetails', e.target.value)}
                placeholder="Additional configuration requirements or notes..."
                rows={6}
                className="bg-background border-gridline"
              />
              <p className="font-paragraph text-xs text-subtletext mt-2">
                Optional: Specify any custom configuration requirements
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST'} <Send className="ml-2 h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="border-gridline"
              >
                CANCEL
              </Button>
            </div>
          </form>

          {/* Info Section */}
          <div className="mt-8 bg-primary border border-gridline p-6">
            <h3 className="font-heading text-lg text-primary-foreground uppercase tracking-wider mb-3">
              WHAT HAPPENS NEXT?
            </h3>
            <ul className="space-y-2 font-paragraph text-sm text-primary-foreground/80">
              <li>• Your environment will be provisioned automatically</li>
              <li>• You will receive access credentials via email</li>
              <li>• Typical provisioning time: 5-15 minutes</li>
              <li>• You can monitor the status from your dashboard</li>
            </ul>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
