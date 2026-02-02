import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { PlatformFeatures } from '@/entities';
import { Link } from 'react-router-dom';

export default function FeaturesPage() {
  const [features, setFeatures] = useState<PlatformFeatures[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      const result = await BaseCrudService.getAll<PlatformFeatures>('platformfeatures');
      setFeatures(result.items);
    } catch (error) {
      console.error('Failed to load features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-8 lg:px-16 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-6xl lg:text-8xl text-foreground uppercase tracking-wider mb-8">
            PLATFORM FEATURES
          </h1>
          <p className="font-paragraph text-lg text-subtletext leading-relaxed">
            Discover the powerful capabilities that make environment management effortless for development teams
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-16 min-h-[400px]">
        {isLoading ? null : features.length > 0 ? (
          <div className="space-y-24">
            {features.map((feature, index) => (
              <motion.div
                key={feature._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] bg-secondary border border-gridline overflow-hidden">
                    {feature.featureImage && (
                      <Image
                        src={feature.featureImage}
                        alt={feature.featureTitle || 'Platform feature'}
                        className="w-full h-full object-cover"
                        width={800}
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="font-heading text-3xl lg:text-5xl text-foreground uppercase tracking-wider mb-6">
                    {feature.featureTitle}
                  </h2>
                  <p className="font-paragraph text-base text-subtletext leading-relaxed mb-8">
                    {feature.description}
                  </p>
                  {feature.callToActionUrl && feature.callToActionText && (
                    <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <a href={feature.callToActionUrl} target="_blank" rel="noopener noreferrer">
                        {feature.callToActionText} <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-subtletext">
              No features available at the moment.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary p-12 lg:p-20 text-center border border-gridline"
        >
          <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground uppercase tracking-wider mb-6">
            EXPERIENCE THE PLATFORM
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
            Start managing your development environments with ease
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/dashboard">
              GO TO DASHBOARD <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
