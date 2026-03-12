import CloudPlan from '../models/CloudPlan.js';

export const getCloudPlans = async (req, res) => {
  try {
    const { type, all } = req.query;
    const filter = {};
    if (!all) filter.isActive = true;
    if (type) filter.type = type;
    const plans = await CloudPlan.find(filter).sort('sortOrder');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCloudPlan = async (req, res) => {
  try {
    const plan = await CloudPlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCloudPlan = async (req, res) => {
  try {
    const plan = await CloudPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCloudPlan = async (req, res) => {
  try {
    const plan = await CloudPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
