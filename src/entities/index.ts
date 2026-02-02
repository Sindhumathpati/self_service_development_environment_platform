/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: documentation
 * Interface for Documentation
 */
export interface Documentation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  articleTitle?: string;
  /** @wixFieldType text */
  contentBody?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType datetime */
  lastUpdatedDate?: Date | string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  keywords?: string;
}


/**
 * Collection ID: environments
 * Interface for DevelopmentEnvironments
 */
export interface DevelopmentEnvironments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  environmentName?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  environmentType?: string;
  /** @wixFieldType text */
  configurationDetails?: string;
  /** @wixFieldType text */
  recentLogs?: string;
  /** @wixFieldType datetime */
  provisionedDate?: Date | string;
  /** @wixFieldType text */
  owner?: string;
  /** @wixFieldType url */
  accessUrl?: string;
}


/**
 * Collection ID: environmenttypes
 * Interface for EnvironmentTypes
 */
export interface EnvironmentTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  typeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  defaultConfigSpecs?: string;
  /** @wixFieldType text */
  defaultVersion?: string;
  /** @wixFieldType number */
  estimatedProvisioningTimeMinutes?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: platformfeatures
 * Interface for PlatformFeatures
 */
export interface PlatformFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featureImage?: string;
  /** @wixFieldType text */
  callToActionText?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}
