var pool = require('mysql').createPool({
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'zc',
    connectionLimit: 20
})
module.exports = function(sql, arr, fn) {
    pool.getConnection(function(error, con) {
        if (error) {
            fn(error)
        }
        con.query(sql, arr, function(error, results) {
            if (error) {
                fn(error)
            }
            fn(null, results)
        })
    })
}