import LicensePlan from '../models/LicensePlan.js';

export const getPlans = async (req, res) => {
  try {
    const { type, all } = req.query;
    const filter = {};
    if (!all) filter.isActive = true;
    if (type) filter.type = type;
    const plans = await LicensePlan.find(filter).sort('sortOrder');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const plan = await LicensePlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await LicensePlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const plan = await LicensePlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
