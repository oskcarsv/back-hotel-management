import Bedroom from './bedroom.model.js';

export const addBedroom = async (req, res) =>{

    const {bedroomName, bedroomPrize, bedroomCapacity, bed} = req.body;

    const bedroom = new Bedroom({

        bedroomName,
        bedroomPrize,
        bedroomCapacity,
        bed

    });

    await bedroom.save();

    res.status(200).json({

        msg: `${req.user.username} you successfully regist the bedroom.`

    })

}

export const listBedroom = async(req, res) =>{

    const {limit, from} = req.query;

    const query = {status: { $ne:"CANCEL"}};

    const [total,bedroom] = await Promise.all([

        Bedroom.countDocuments(query),
        Bedroom.find(query)
            .skip(Number(from))
            .limit(Number(limit))

    ]);

    res.status(200).json({

        total,
        bedroom

    })

}

export const deleteBedroom = async(req, res) =>{

    const {bedroomName} = req.body;

    await Bedroom.findOneAndUpdate({bedroomName: bedroomName}, {status: "CANCEL"});

    const bedroom = await Bedroom.findOne({bedroomName: bedroomName});

    res.status(200).json({

        msg: `${req.user.username} your delete the bedroom successfully.`
        
    })

}