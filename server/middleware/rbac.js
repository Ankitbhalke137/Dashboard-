const rbac = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};

const clubPresidentAccess = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.user.role === 'admin') return next();

  const clubId = req.params.clubId || req.body.clubId;
  if (!clubId) {
    return res.status(400).json({ message: 'Club ID required' });
  }

  const hasAccess = req.user.clubAssignments?.some(
    a => a.clubId.toString() === clubId && a.role === 'president'
  );
  if (!hasAccess) {
    return res.status(403).json({ message: 'Not authorized for this club' });
  }
  next();
};

module.exports = { rbac, clubPresidentAccess };
