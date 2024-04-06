const mongoose = require('mongoose');


const missionCardSchema = new mongoose.Schema({
  'card-id': Number,
  'card-type': String,
  'card-name': String,
  'card-description': String,
}, { timestamps: true });

const MissionCard = mongoose.model('MissionCard', missionCardSchema, 'mission-cards');

const missionController = {
  getRandomMissions: async (req, res) => {
    try {
      const missions = await MissionCard.aggregate([
        { $sample: { size: 3 } }
      ]);
      res.json(missions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = missionController;
