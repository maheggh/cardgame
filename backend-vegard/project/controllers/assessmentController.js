const mongoose = require('mongoose');


const assessmentCardSchema = new mongoose.Schema({
    'card-id': Number,
    'card-type': String,
    'card-category': String,
    'card-name': String,
    'card-description': String,
    'card-details': String
}, { timestamps: true });

const AssessmentCard = mongoose.model('AssessmentCard', assessmentCardSchema, 'assessment-cards');


const assessmentController = {
    getAllAssessments: async (req, res) => {
        try {
            let cardCategories = await AssessmentCard.distinct('card-category');
            const assessments = [];


            cardCategories = cardCategories.sort(() => Math.random() - 0.5);

            for (let i = 0; i < cardCategories.length; i++) {
                const randomAssessment = await AssessmentCard.aggregate([
                    { $match: { 'card-category': cardCategories[i] } },
                    { $sample: { size: 1 } }
                ]);
                if (randomAssessment.length) {
                    assessments.push(randomAssessment[0]);
                }
                if (assessments.length === 6) break;
            }

            res.json(assessments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    /* Couldnt get to work properly
    ,
        search: async (req, res) => {
            try {
                const { 'card-type': cardType, 'card-category': cardCategory, random, exclude } = req.query;
                let excludeIds = exclude ? JSON.parse(exclude) : [];

                let query = {
                    'card-type': cardType,
                    'card-category': cardCategory,
                    'card-id': { $nin: excludeIds }
                };

                let assessments;
                if (random) {
                    assessments = await AssessmentCard.aggregate([
                        { $match: query },
                        { $sample: { size: parseInt(random) } }
                    ]);
                } else {
                    assessments = await AssessmentCard.find(query);
                }

                res.json(assessments);
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: err.message });
            }
        }
    */

};

module.exports = assessmentController;