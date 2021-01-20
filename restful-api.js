const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const jsonParser = bodyParser.json()
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbname = "user";


// 解决跨域问题
app.all("*", function (req, res, next) {
    if (!req.get("Origin")) return next();
    // use "*" here to accept any origin
    res.set("Access-Control-Allow-Origin","*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    if ("OPTIONS" === req.method) return res.sendStatus(200);
    next();
})

// 搜索
app.get('/', (req, res) => {
    const client = new MongoClient(url);

    try {
        client.connect(function (err) {
            if (err) throw err;
            console.log("连接数据库成功");
            client
                .db(dbname)
                .collection("users")
                .find({})
                .toArray((err, result) => {
                    if (err) throw err;
                    // 发送json数据
                    res.status(200).send({result : result})
                    client.close();
                });
        })
    } catch (e) {
        console.log(e)
        res.status(500).send("搜索错误")
    }

});

// 添加
app.post("/", jsonParser, (req, res) => {
    const data = req.body;
    const client = new MongoClient(url);

    try {
        client.connect(function (err) {
            if (err) throw err;
            console.log("连接数据库成功");
            client
                .db(dbname)
                .collection('users')
                .insertOne(data, (err, result) => {
                    if (err) throw err;
                    client.close();
                })
        });
    } catch (e) {
        console.log(e)
        res.status(500).send("添加错误")
    }
    res.status(200).send("添加成功")


})

// 修改
app.put("/", jsonParser, (req, res) => {
    const data = req.body;
    const client = new MongoClient(url);

    try {
        client.connect(function (err) {
            if (err) throw err;
            console.log("连接数据库成功");
            client
                .db(dbname)
                .collection('users')
                .updateOne(
                    {'name': data.name},
                    {$set: {"age": data.age, "address": data.address}},
                    (err, result) => {
                        if (err) throw err;
                        // console.log(result)

                        client.close();
                    })
        });
    } catch (e) {
        console.log(e)
        res.status(500).send("修改错误")
    }
    res.status(200).send('修改成功!');
})

// 删除
app.delete("/", jsonParser, (req, res) => {
    const data = req.body;
    const client = new MongoClient(url);

    try {
        client.connect(function (err) {
            if (err) throw err;
            console.log("连接数据库成功");
            client
                .db(dbname)
                .collection('users')
                .deleteOne(
                    {'name': data.name},
                    (err, result) => {
                        if (err) throw err;
                        // console.log(result);
                        client.close();
                    });
        });
    } catch (e) {
        console.log(e)
        res.status(500).send("删除错误")
    }
    res.status(200).send('删除成功!');
})

app.listen(port, () => {
    console.log(`端口号运行成功，端口${port}`);
});