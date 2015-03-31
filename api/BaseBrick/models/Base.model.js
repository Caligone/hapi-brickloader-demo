'use strict';

module.exports = function (mongoose) {
    /* Dependencies and constants*/
    var Schema = mongoose.Schema;

    /* Schema */
    var baseSchema = new Schema({
      label: {
        type: String,
        required: true
      }
    });

    /* Model */
    var baseModel = mongoose.model('Base', baseSchema);

    return baseModel;
};