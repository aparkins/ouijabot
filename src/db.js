model = require('./model.js');

exports.load_states = (db_auth) => {
    // TODO: actually connect to a database. For now, just return hard coded data for testing
    return {
        '650761449542516756' : new model.GameState(
            true,
            1,
            new model.Spirit(
                [
                    "knife",
                    "kitchen",
                    "dark",
                    "storm",
                    "spouse",
                    "dinner",
                    "anniversary",
                ],
                'husband',
            ),
        ),
    };
}
