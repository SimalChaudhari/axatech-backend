import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../auth/User.js';
import HomeContent from '../home/HomeContent.js';
import Service from '../services/Service.js';
import Category from '../categories/Category.js';
import LicensePlan from '../licenses/LicensePlan.js';
import CloudPlan from '../cloud/CloudPlan.js';
import Product from '../products/Product.js';
import Blog from '../blog/Blog.js';
import Enquiry from '../enquiries/Enquiry.js';

const dropFirst = process.env.DROP === '1' || process.argv.includes('--drop');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  if (dropFirst) {
    await Promise.all([
      User.deleteMany({}),
      HomeContent.deleteMany({}),
      Service.deleteMany({}),
      Category.deleteMany({}),
      LicensePlan.deleteMany({}),
      CloudPlan.deleteMany({}),
      Product.deleteMany({}),
      Blog.deleteMany({}),
      Enquiry.deleteMany({}),
    ]);
    console.log('Dropped all collections.');
  }

  // 1. Admin & customer users
  let admin = await User.findOne({ email: 'admin@axatech.com' });
  if (!admin) {
    admin = await User.create({
      name: 'Axatech Admin',
      email: 'admin@axatech.com',
      password: 'Admin@123',
      role: 'admin',
      phone: '+91 9876543210',
      company: 'Axatech',
    });
    console.log('Admin created: admin@axatech.com / Admin@123');
  }

  if ((await User.countDocuments({ role: 'customer' })) === 0) {
    await User.insertMany([
      { name: 'Rahul Sharma', email: 'rahul@example.com', password: 'Customer@1', role: 'customer', phone: '+91 9123456789', company: 'Sharma Traders' },
      { name: 'Priya Mehta', email: 'priya@example.com', password: 'Customer@1', role: 'customer', phone: '+91 9988776655', company: 'Mehta & Co' },
    ]);
    console.log('Customer users created.');
  }

  // 2. Home content (all fields)
  let home = await HomeContent.findOne();
  if (!home) {
    home = await HomeContent.create({
      heroTitle: 'Your Trusted Tally & Business Solutions Partner',
      heroSubtitle: 'Licenses, Add-ons, Cloud Hosting & Integration Services',
      heroImage: '',
      introTitle: 'About Axatech',
      introText: 'We deliver Tally licenses, automation add-ons, and cloud hosting solutions to help your business grow. Trusted by hundreds of businesses across India.',
      whyChooseTitle: 'Why Choose Axatech',
      whyChooseItems: [
        { title: 'Expert Support', description: 'Dedicated support for Tally and integrations. Our team is just a call away.' },
        { title: 'Secure Cloud', description: 'Reliable cloud hosting with 99.9% uptime. Your data is safe with us.' },
        { title: 'Custom Solutions', description: 'Tailored automation and API services to fit your workflow.' },
      ],
      featuredAddonsTitle: 'Featured Add-ons',
      cloudOverviewTitle: 'Cloud Hosting',
      cloudOverviewText: 'Host your Tally on secure, fast cloud servers. Choose from shared or dedicated VPS plans with daily backups and 24/7 monitoring.',
      contactTitle: 'Get in Touch',
      metaTitle: 'Axatech - Tally Licenses, Add-ons & Cloud Hosting',
      metaDescription: 'Axatech offers Tally licenses, add-ons, cloud hosting, WhatsApp & Zoho integration. Building solutions for your business.',
      metaKeywords: 'Tally, Tally license, cloud hosting, Tally add-ons, Axatech',
    });
    console.log('Home content seeded.');
  }

  // 3. Services (all fields)
  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
      { title: 'Tally Customization', slug: 'tally-customization', shortDescription: 'Customize Tally to match your workflow.', description: 'We tailor Tally Prime to your business processes. Custom reports, vouchers, and workflows so you work faster.', icon: '', image: '', isActive: true, sortOrder: 1 },
      { title: 'Cloud Hosting', slug: 'cloud-hosting', shortDescription: 'Shared and VPS hosting for Tally.', description: 'Host Tally on our secure cloud. Shared and VPS plans with backups, SSL, and remote access.', icon: '', image: '', isActive: true, sortOrder: 2 },
      { title: 'WhatsApp Integration', slug: 'whatsapp-integration', shortDescription: 'Connect Tally with WhatsApp.', description: 'Send invoices, reports, and alerts via WhatsApp directly from Tally. Automate notifications.', icon: '', image: '', isActive: true, sortOrder: 3 },
      { title: 'Zoho & Zakya Integration', slug: 'zoho-zakya-integration', shortDescription: 'Integrate with Zoho and Zakya.', description: 'Sync data between Tally and Zoho Books, Zakya, or CRM. One source of truth for your business.', icon: '', image: '', isActive: true, sortOrder: 4 },
      { title: 'API & Automation Services', slug: 'api-automation', shortDescription: 'APIs and automation for your business.', description: 'REST APIs, webhooks, and automation scripts to connect Tally with your apps and reduce manual work.', icon: '', image: '', isActive: true, sortOrder: 5 },
    ]);
    console.log('Services seeded.');
  }

  // 4. Categories
  let categories = await Category.find();
  if (categories.length === 0) {
    const catDocs = await Category.insertMany([
      { name: 'Inventory', slug: 'inventory', description: 'Add-ons for inventory and stock management.', image: '', isActive: true, sortOrder: 1 },
      { name: 'Invoicing', slug: 'invoicing', description: 'Billing and invoice automation.', image: '', isActive: true, sortOrder: 2 },
      { name: 'Reporting', slug: 'reporting', description: 'Reports and analytics for Tally.', image: '', isActive: true, sortOrder: 3 },
      { name: 'Integration', slug: 'integration', description: 'Connect Tally with other apps.', image: '', isActive: true, sortOrder: 4 },
    ]);
    categories = catDocs;
    console.log('Categories seeded.');
  }

  // 5. License plans (single + multi)
  if ((await LicensePlan.countDocuments()) === 0) {
    await LicensePlan.insertMany([
      { planName: 'Tally Prime Single User', type: 'single', price: 54000, currency: 'INR', description: 'For one user. Full Tally Prime features.', features: ['Single user access', 'Unlimited companies', 'GST compliant', '1 year support'], isActive: true, sortOrder: 1 },
      { planName: 'Tally Prime 2 Users', type: 'single', price: 72000, currency: 'INR', description: 'Two user license.', features: ['2 concurrent users', 'Unlimited companies', 'GST compliant', '1 year support'], isActive: true, sortOrder: 2 },
      { planName: 'Tally Prime Multi User (5)', type: 'multi', price: 180000, currency: 'INR', description: 'Five user multi-user license.', features: ['5 concurrent users', 'Centralized data', 'Role-based access', '1 year support'], isActive: true, sortOrder: 3 },
      { planName: 'Tally Prime Multi User (10)', type: 'multi', price: 320000, currency: 'INR', description: 'Ten user multi-user license.', features: ['10 concurrent users', 'Centralized data', 'Role-based access', 'Priority support'], isActive: true, sortOrder: 4 },
    ]);
    console.log('License plans seeded.');
  }

  // 6. Cloud plans (shared + vps)
  let cloudPlansList = await CloudPlan.find();
  if (cloudPlansList.length === 0) {
    cloudPlansList = await CloudPlan.insertMany([
      { planName: 'Starter Shared', type: 'shared', price: 499, currency: 'INR', period: 'month', description: 'Ideal for small businesses.', features: ['5 GB storage', 'Daily backup', 'Email support', '99.9% uptime'], isActive: true, sortOrder: 1 },
      { planName: 'Business Shared', type: 'shared', price: 999, currency: 'INR', period: 'month', description: 'For growing businesses.', features: ['20 GB storage', 'Daily backup', 'Priority support', '99.9% uptime'], isActive: true, sortOrder: 2 },
      { planName: 'VPS Basic', type: 'vps', price: 2499, currency: 'INR', period: 'month', description: 'Dedicated resources.', features: ['2 vCPU', '4 GB RAM', '50 GB SSD', '24/7 monitoring'], isActive: true, sortOrder: 3 },
      { planName: 'VPS Pro', type: 'vps', price: 4999, currency: 'INR', period: 'month', description: 'High performance.', features: ['4 vCPU', '8 GB RAM', '100 GB SSD', 'Dedicated support'], isActive: true, sortOrder: 4 },
    ]);
    console.log('Cloud plans seeded.');
  }

  // 7. Products (need category refs)
  if ((await Product.countDocuments()) === 0) {
    const invCat = categories.find((c) => c.slug === 'inventory') || categories[0];
    const invCatId = invCat?._id;
    await Product.insertMany([
      { name: 'Stock Alert Pro', slug: 'stock-alert-pro', shortDescription: 'Get alerts when stock is low.', description: 'Automated low-stock alerts via email and SMS. Set reorder levels per item. Reduces stockouts.', category: invCatId, demoVideoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', featured: true, isActive: true, sortOrder: 1 },
      { name: 'Smart Invoicer', slug: 'smart-invoicer', shortDescription: 'Create and send invoices from Tally.', description: 'Generate professional invoices and send them by email or WhatsApp directly from Tally.', category: categories.find((c) => c.slug === 'invoicing')?._id || invCatId, demoVideoLink: '', featured: true, isActive: true, sortOrder: 2 },
      { name: 'Tally Dashboard', slug: 'tally-dashboard', shortDescription: 'Visual dashboards for Tally data.', description: 'Charts and KPIs for sales, purchases, and inventory. Export to PDF or share link.', category: categories.find((c) => c.slug === 'reporting')?._id || invCatId, demoVideoLink: '', featured: false, isActive: true, sortOrder: 3 },
      { name: 'Excel Sync', slug: 'excel-sync', shortDescription: 'Two-way sync with Excel.', description: 'Import and export data between Tally and Excel. Schedule syncs and map columns easily.', category: categories.find((c) => c.slug === 'integration')?._id || invCatId, demoVideoLink: '', featured: true, isActive: true, sortOrder: 4 },
      { name: 'Multi-Branch Manager', slug: 'multi-branch-manager', shortDescription: 'Manage multiple branches in Tally.', description: 'Consolidate data from multiple branches. Inter-branch transfers and consolidated reports.', category: invCatId, demoVideoLink: '', featured: false, isActive: true, sortOrder: 5 },
    ]);
    console.log('Products seeded.');
  }

  // 8. Blogs
  if ((await Blog.countDocuments()) === 0) {
    await Blog.insertMany([
      { title: 'Getting Started with Tally Prime', slug: 'getting-started-tally-prime', excerpt: 'A quick guide to setting up Tally Prime for your business.', content: 'Tally Prime is the latest version of Tally. In this post we cover installation, creating a company, and basic configuration. You can start recording transactions within minutes.', author: 'Axatech Team', published: true, publishedAt: new Date('2024-01-15'), metaTitle: 'Getting Started with Tally Prime', metaDescription: 'Setup and configure Tally Prime for your business.', image: '' },
      { title: 'Why Move Tally to the Cloud?', slug: 'why-move-tally-to-cloud', excerpt: 'Benefits of hosting Tally on cloud servers.', content: 'Cloud hosting gives you access from anywhere, automatic backups, and no server maintenance. We explain the benefits and how to choose a plan.', author: 'Axatech Team', published: true, publishedAt: new Date('2024-02-01'), metaTitle: 'Why Move Tally to the Cloud?', metaDescription: 'Benefits of Tally cloud hosting.', image: '' },
      { title: 'GST Tips for Tally Users', slug: 'gst-tips-tally-users', excerpt: 'Best practices for GST in Tally.', content: 'Keep your GST compliance smooth with these tips: correct HSN codes, timely returns, and reconciliation. Tally makes it easier when configured right.', author: 'Axatech Team', published: true, publishedAt: new Date('2024-02-20'), metaTitle: 'GST Tips for Tally Users', metaDescription: 'GST best practices in Tally.', image: '' },
      { title: 'Draft: New Add-on Launch', slug: 'draft-new-addon-launch', excerpt: 'Coming soon.', content: 'We are launching a new add-on next month. Stay tuned for updates.', author: 'Axatech', published: false, publishedAt: null, metaTitle: '', metaDescription: '', image: '' },
    ]);
    console.log('Blogs seeded.');
  }

  // 9. Enquiries (all types and statuses, with refs)
  if ((await Enquiry.countDocuments()) === 0) {
    const products = await Product.find().limit(2);
    const services = await Service.find().limit(2);
    const licensePlans = await LicensePlan.find().limit(1);
    const cloudPlansForEnquiry = await CloudPlan.find().limit(1);
    await Enquiry.insertMany([
      { type: 'contact', name: 'Vikram Singh', email: 'vikram@company.com', phone: '+91 9876512345', company: 'Singh Enterprises', message: 'I need information about Tally licensing for our new branch.', status: 'New', adminNotes: '' },
      { type: 'product', name: 'Anita Desai', email: 'anita@retail.com', phone: '+91 8765432109', company: 'Desai Retail', message: 'Interested in Stock Alert Pro for our warehouse.', product: products[0]?._id, status: 'Contacted', adminNotes: 'Called and sent quote.' },
      { type: 'service', name: 'Rajesh Kumar', email: 'rajesh@tech.in', phone: '+91 7654321098', company: 'Kumar Tech', message: 'We need WhatsApp integration for Tally.', service: services[0]?._id, status: 'New', adminNotes: '' },
      { type: 'license', name: 'Sneha Patel', email: 'sneha@patel.com', phone: '+91 6543210987', company: 'Patel & Co', message: 'Please quote for 5-user Tally Prime license.', licensePlan: licensePlans[0]?._id, status: 'Closed', adminNotes: 'Deal closed. Invoice sent.' },
      { type: 'cloud', name: 'Mohit Agarwal', email: 'mohit@agarwal.in', phone: '+91 5432109876', company: 'Agarwal Traders', message: 'Need VPS plan for Tally. 3 users.', cloudPlan: cloudPlansForEnquiry[0]?._id, status: 'New', adminNotes: '' },
    ]);
    console.log('Enquiries seeded.');
  }

  console.log('\n✅ Seed completed.');
  console.log('Admin login: admin@axatech.com / Admin@123');
  console.log('Customer login (example): rahul@example.com / Customer@1\n');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
