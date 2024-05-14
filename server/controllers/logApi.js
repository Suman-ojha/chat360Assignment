const logSchema = require('../models/logSchema');
const {Validator} = require('node-input-validator')

module.exports={
    insertLog : async (req, res) => {
        try {

            const v = new Validator(req.body , {
                level :"required",
                log_string :"required",
                // timestamp:"required"
            })
            const matched = await v.check();
            if (!matched) {
                return resp.status(200).send({ 
                    status: 'val_err', 
                    message: "Validation error", 
                    val_msg: v.errors 
                });
            }
            const {level , log_string  } = req.body;
            
            let count =1;
            let result = await logSchema.find({});
            count+=result.length
            let doc ={
                level ,log_string, 
                timestamp :req.body.timestamp ?? Date.now(),
                metadata: { source: `log${count}.log` }
                
            }

            const data = await logSchema.create(doc)
            // Insert data into MongoDB
            // const result = await logSchema.insertMany(logArray);
    
            // Create indexes on all specified fields
            const fieldsToIndex = ['level', 'message',  'timestamp', 'metadata.source'];
    
            fieldsToIndex.forEach((field) => {
                const indexSpec = {};
                indexSpec[field] = 1;
    
                logSchema.collection.createIndex(indexSpec, { background: true }, (err, indexes) => {
                    if (err) {
                        console.error(`Error creating index for ${field}:`, err);
                    } else {
                        console.log(`Index for ${field} created successfully`);
                    }
                });
            });
    
            return res.status(200).send({ 
                status: 'success',
                message :'log data inserted successfully',
                data : data  
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ 
                status :'error',
                message: error?.message ?? 'Internal Server Error' 
            });
        }
    },
    index : async (req, res) => {
        const { level, message,  startDate, endDate,  source } = req.body;
        // console.log(startDate, endDate);
        // console.log("2023-09-15T08:00 2023-10-18T22:53".length);
    
        try {
            // Check if all constants are empty
            if (!level && !message && !startDate && !endDate  && !source) {
                return res.status(200).json([]);
            }
            // query based on non-empty constants
            const search_details = {};
            if (level) search_details.level = { $regex: level, $options: 'i' };
            if (message) search_details.log_string = { $regex: message, $options: 'i' };
            // if (resourceId) query.resourceId = { $regex: resourceId, $options: 'i' };
            // if (spanId) query.spanId = { $regex: spanId, $options: 'i' };
            // if (commit) query.commit = { $regex: commit, $options: 'i' };
            if (source) search_details["metadata.source"] = { $regex: source, $options: 'i' };
            // if (traceId) query.traceId = { $regex: traceId, $options: 'i' };
            if (startDate && endDate) {
                // Convert startDate and endDate to mongoose DateStrings (just date part without time)
                const mongooseStartDate = new Date(startDate).toISOString().split('T')[0];
                const mongooseEndDate = new Date(endDate).toISOString().split('T')[0];
                
                // Update the format of startDate and endDate to include seconds and milliseconds
                search_details.timestamp = { $gte: new Date(`${mongooseStartDate}T00:00:00.000Z`), $lt: new Date(`${mongooseEndDate}T23:59:59.999Z`) };
            }
            
    
            const result = await logSchema.find(search_details);
            const stats = await logSchema.find(search_details).explain("executionstats")
            console.log(stats);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: "Error while fetching data" });
        }
    },

}

// Indexing
// nReturned: 14,
//     executionTimeMillisEstimate: 0,
//         works: 48,
//             advanced: 14,
//                 needTime: 33,
//                     needYield: 0,
//                         saveState: 0,
//                             restoreState: 0,
//                                 isEOF: 1,
//                                     docsExamined: 14,

// Without Indexing
// nReturned: 14,
// executionTimeMillisEstimate: 0,
//     works: 48,
//         advanced: 14,
//             needTime: 33,
//                 needYield: 0,
//                     saveState: 0,
//                         restoreState: 0,
//                             isEOF: 1,
//                                 direction: 'forward',
//                                     docsExamined: 47