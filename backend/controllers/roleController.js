const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  const { name, permissions } = req.body;
  
  try {
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).send(role);
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyPattern.name) {
      res.status(400).send({ error: 'Role name must be unique' });
    } else {
      res.status(400).send(error);
    }
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  const { name, permissions } = req.body;
  
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true, runValidators: true });
    if (!role) {
      return res.status(404).send({ error: 'Role not found' });
    }
    res.send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).send({ error: 'Role not found' });
    }
    res.send(role);
  } catch (error) {
    res.status(500).send(error);
  }
};
