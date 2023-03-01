const Member = require("../models/Members.mongo");

const getMembers = async (req, res) => {
  const users = await Member.find({}).select("-passwordHash");
  if (!users) {
    return res.status(400).json({ message: "cant get members" });
  }
  return res.status(200).json(users);
};

const addMember = async (req, res) => {
  let member = new Member({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    cin: req.body.cin,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    email: req.body.email,
    adresse: req.body.adresse,
  });
  await member.save();
  if (!member) {
    return res.status(500).json({ message: "cant add member" });
  }
  return res.status(201).json(member);
};

const deleteMember = (req, res) => {
  const id = req.params.id;
  Member.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        return res.status(200).json({ success: true, message: "User deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "cant find User" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

const getActiveMembers = async (req, res) => {
  const count = await Member.aggregate([
    {
      $bucket: {
        groupBy: "$isactive",
        boundaries: [false, true],
        default: true,
        output: {
          count: {
            $sum: 1,
          },
          members: {
            $push: {
              name: {
                $concat: ["$firstname", " ", "$lastname"],
              },
              birthdate: "$birthdate",
            },
          },
        },
      },
    },
  ]);
  if (!count) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(count);
};

const getGenders = async (req, res) => {
  const genders = await Member.aggregate([
    {
      $bucket: {
        groupBy: "$gender",
        boundaries: ["female", "male", "other"],
        default: "other",
        output: {
          count: {
            $sum: 1,
          },
          members: {
            $push: {
              name: {
                $concat: ["$firstname", " ", "$lastname"],
              },
              birthdate: "$birthdate",
            },
          },
        },
      },
    },
  ]);
  if (!genders) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(genders);
};



const getAgeCategories = async (req,res)=>{
  const cats = await Member.aggregate([
    {
      '$addFields': {
        'age': {
          '$dateDiff': {
            'startDate': '$birthdate', 
            'endDate': '$$NOW', 
            'unit': 'year'
          }
        }
      }
    }, {
      '$project': {
        'name': 1, 
        'category': {
          '$switch': {
            'branches': [
              {
                'case': {
                  '$and': [
                    {
                      '$gte': [
                        '$age', 17
                      ]
                    }, {
                      '$lt': [
                        '$age', 22
                      ]
                    }
                  ]
                }, 
                'then': 'Young adult'
              }, {
                'case': {
                  '$and': [
                    {
                      '$gte': [
                        '$age', 22
                      ]
                    }, {
                      '$lt': [
                        '$age', 40
                      ]
                    }
                  ]
                }, 
                'then': 'Adult'
              }, {
                'case': {
                  '$gte': [
                    '$age', 40
                  ]
                }, 
                'then': 'Old man'
              }
            ], 
            'default': 'Teen'
          }
        }
      }
    }, {
      '$group': {
        '_id': '$category', 
        'count': {
          '$count': {}
        }
      }
    }
  ]);
  if (!cats) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(cats);
}

module.exports = {
  getMembers,
  addMember,
  deleteMember,
  getActiveMembers,
  getGenders,
  getAgeCategories
};
