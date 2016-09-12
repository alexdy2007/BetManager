/**
 * Created by ayoung on 08/09/16.
 */
var format = require('string-format');
var conn = require('./../../db/queryDB');

var GENERICS = {};

GENERICS.getAll = function(tableName) {
    return function(req, res) {
        var sql = format("SELECT * FROM {}", tableName);
        conn.queryDB(sql)
            .then(function (results) {
                return res.json(results.results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    }
};

GENERICS.delete = function(tableName) {
    return function(req, res) {
        var id = req.params.id;
        var sql = format("DELETE FROM {} WHERE id={} RETURNING *", tableName, id);
        conn.queryDB(sql)
            .then(function (data) {
                return res.json(data.results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        })
    }
};

GENERICS.getOne = function(tableName){
    return function(req, res) {
        var id = req.params.id;
        var sql = format("SELECT * FROM {} WHERE id = {}", tableName, id);
        conn.queryDB(sql)
            .then(function (data) {
                if(data.results.length == 0){
                    res.status(204).json();
                }
                return res.json(data.results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        })
    }
};


GENERICS.create = function(tableName, sql){
    return function(req, res) {
        var data = req.body;
        var columnValues = [];
        var columnNames = Object.keys(req.body);
        for (idx in columnNames){
            columnValues.push("'" + data[columnNames[idx]] +"'")
        }
        sql = "INSERT INTO " + tableName + "(" + columnNames.toString() + ") values(" + columnValues.toString() + ") RETURNING *";
        conn.queryDB(sql)
            .then(function (results) {
                return res.status(201).json(results.results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    }
};


module.exports = GENERICS;