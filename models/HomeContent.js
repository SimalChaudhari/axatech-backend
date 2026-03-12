import mongoose from 'mongoose';

const homeContentSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Your Trusted Tally & Business Solutions Partner' },
  heroSubtitle: { type: String, default: 'Licenses, Add-ons, Cloud Hosting & Integration Services' },
  heroImage: String,
  introTitle: { type: String, default: 'About Axatech' },
  introText: { type: String, default: 'We deliver Tally licenses, automation add-ons, and cloud hosting solutions.' },
  whyChooseTitle: { type: String, default: 'Why Choose Axatech' },
  whyChooseItems: [{ title: String, description: String }],
  featuredAddonsTitle: { type: String, default: 'Featured Add-ons' },
  cloudOverviewTitle: { type: String, default: 'Cloud Hosting' },
  cloudOverviewText: String,
  contactTitle: { type: String, default: 'Get in Touch' },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
}, { timestamps: true });

export default mongoose.model('HomeContent', homeContentSchema);
