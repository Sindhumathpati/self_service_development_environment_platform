import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { Documentation } from '@/entities';

export default function DocumentationPage() {
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadDocumentation();
  }, []);

  const loadDocumentation = async () => {
    try {
      const result = await BaseCrudService.getAll<Documentation>('documentation');
      setDocs(result.items);
    } catch (error) {
      console.error('Failed to load documentation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(docs.map(doc => doc.category).filter(Boolean)))];

  const filteredDocs = docs.filter((doc) => {
    const matchesSearch = doc.articleTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.contentBody?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.keywords?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-primary-foreground uppercase tracking-wider mb-6">
              DOCUMENTATION
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/80 mb-8">
              Everything you need to know about managing development environments
            </p>
            
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-background border-gridline h-12 text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full bg-background border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-paragraph text-sm uppercase tracking-wider px-4 py-2 border transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-gridline hover:border-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Articles */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-12 min-h-[500px]">
        {isLoading ? null : filteredDocs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredDocs.map((doc, index) => (
              <motion.article
                key={doc._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-background border border-gridline p-8 hover:border-foreground transition-colors"
                id={doc.slug || undefined}
              >
                <div className="flex items-start gap-4 mb-4">
                  <BookOpen className="h-6 w-6 text-foreground flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {doc.category && (
                        <span className="font-paragraph text-xs text-subtletext uppercase tracking-wider">
                          {doc.category}
                        </span>
                      )}
                      {doc.lastUpdatedDate && (
                        <>
                          <span className="text-subtletext">•</span>
                          <span className="font-paragraph text-xs text-subtletext">
                            Updated {formatDate(doc.lastUpdatedDate)}
                          </span>
                        </>
                      )}
                    </div>
                    <h2 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-4">
                      {doc.articleTitle}
                    </h2>
                    <div className="font-paragraph text-base text-subtletext leading-relaxed">
                      {doc.contentBody}
                    </div>
                    {doc.keywords && (
                      <div className="mt-4 pt-4 border-t border-gridline">
                        <p className="font-paragraph text-xs text-subtletext">
                          <span className="uppercase tracking-wider">Keywords:</span> {doc.keywords}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-subtletext">
              {searchQuery || selectedCategory !== 'all'
                ? 'No documentation articles match your search.'
                : 'No documentation available at the moment.'}
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
