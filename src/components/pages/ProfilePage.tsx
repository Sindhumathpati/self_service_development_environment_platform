import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member, actions } = useMember();

  const formatDate = (date?: Date) => {
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

      <div className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-primary border border-gridline p-8 mb-8">
            <h1 className="font-heading text-4xl lg:text-6xl text-primary-foreground uppercase tracking-wider mb-2">
              PROFILE
            </h1>
            <p className="font-paragraph text-base text-primary-foreground/80">
              Manage your account information
            </p>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-background border border-gridline p-8 text-center">
                {member?.profile?.photo?.url ? (
                  <Image src={member.profile.photo.url} alt={member.profile.nickname || 'Profile'} className="w-32 h-32 mx-auto mb-6 border-2 border-gridline" />
                ) : (
                  <div className="w-32 h-32 mx-auto mb-6 bg-secondary border-2 border-gridline flex items-center justify-center">
                    <User className="h-16 w-16 text-subtletext" />
                  </div>
                )}
                <h2 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-2">
                  {member?.profile?.nickname || 'USER'}
                </h2>
                {member?.profile?.title && (
                  <p className="font-paragraph text-sm text-subtletext mb-4">
                    {member.profile.title}
                  </p>
                )}
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="w-full border-gridline mt-4"
                >
                  SIGN OUT
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Information */}
              <div className="bg-background border border-gridline p-8">
                <h3 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-6">
                  ACCOUNT INFORMATION
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-gridline">
                    <Mail className="h-5 w-5 text-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                        EMAIL
                      </p>
                      <p className="font-paragraph text-base text-foreground">
                        {member?.loginEmail || 'Not provided'}
                      </p>
                      {member?.loginEmailVerified && (
                        <p className="font-paragraph text-xs text-green-600 mt-1">
                          ✓ Verified
                        </p>
                      )}
                    </div>
                  </div>

                  {member?.contact?.firstName && (
                    <div className="flex items-start gap-4 pb-4 border-b border-gridline">
                      <User className="h-5 w-5 text-foreground flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                          NAME
                        </p>
                        <p className="font-paragraph text-base text-foreground">
                          {member.contact.firstName} {member.contact.lastName}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 pb-4 border-b border-gridline">
                    <Shield className="h-5 w-5 text-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                        STATUS
                      </p>
                      <p className="font-paragraph text-base text-foreground uppercase">
                        {member?.status || 'UNKNOWN'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-paragraph text-xs text-subtletext uppercase tracking-wider mb-1">
                        MEMBER SINCE
                      </p>
                      <p className="font-paragraph text-base text-foreground">
                        {formatDate(member?._createdDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="bg-background border border-gridline p-8">
                <h3 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-6">
                  RECENT ACTIVITY
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gridline">
                    <span className="font-paragraph text-sm text-foreground">Last Login</span>
                    <span className="font-paragraph text-sm text-subtletext">
                      {formatDate(member?.lastLoginDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gridline">
                    <span className="font-paragraph text-sm text-foreground">Profile Updated</span>
                    <span className="font-paragraph text-sm text-subtletext">
                      {formatDate(member?._updatedDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
