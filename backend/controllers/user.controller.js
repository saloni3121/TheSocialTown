const {
  _getUserById,
  _getAllUsers,
  _getAllEnrolledVolunteers,
  _updateVolunteer,
  _getEnrolledVolunteers,
} = require('./handlers/user');

const getUserById = async (req, res, next) => {
  try {
    const user = await _getUserById({ ...req.params });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await _getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getAllEnrolledVolunteers = async (req, res, next) => { 
  try {
    const allEnrolledVolunteers = await _getAllEnrolledVolunteers({
      ...req.params,
    });
    return res.status(200).json(allEnrolledVolunteers);
  } catch (error) {
    next(error);
  }
};

const getEnrolledVolunteers = async(req,res,next) =>{
  try{
    const allEnrolledVolunteers = _getEnrolledVolunteers()
    return res.status(200).json(allEnrolledVolunteers);
  }catch (error) {
    next(error);
  }
}

const updateVolunteer = async (req, res, next)=>{
    try{
        const foundVolunteer = await _updateVolunteer({...req.body})
        return res.status(200).json(foundVolunteer);
    }
    
    catch (error) {
        next(error);
      }
}

module.exports = {
  getUserById,
  getAllUsers,
  getAllEnrolledVolunteers,
  updateVolunteer,
  getEnrolledVolunteers
};
