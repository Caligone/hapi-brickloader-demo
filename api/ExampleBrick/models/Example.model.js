'use strict';

module.exports = function (mongoose) {
    /* Dependencies and constants*/
    var Schema = mongoose.Schema;

    /* Schema */
    var exampleSchema = new Schema({
      label: {
        type: String,
        required: true
      }
    });

    /* Model */
    var exampleModel = mongoose.model('Example', exampleSchema);

    return exampleModel;
};