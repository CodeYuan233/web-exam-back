
var mysql = require("mysql");
module.exports = {
  //数据库配置
  config: {
    host: "localhost",
    user: "root",
    password: "usbw",
    database: "web_exam",
  },
  //mysql连接池连接数据库
  sqlConnect: function (sql, sqlArr, callBack) {
    var p = new Promise((resolve, reject) => {
      var pool = mysql.createPool(this.config);
      pool.getConnection((err, connect) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          //事件驱动回调
          connect.query(sql, sqlArr, callBack);
          //释放连接
          connect.release();
          resolve();
        }
      });
    });
    return p;
  },
  //查询全部方法
  async query({ model_name = "", data = {}, callBack }) {
    try {
      let { id } = data;
      var sql = "select * from " + model_name;
      var sqlArr = [id];
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "查询失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "查询成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },
  //条件查询
  async queryby({ model_name = "", data = {}, callBack }) {
    try {
      var keyArr = Object.keys(data);
      var valueArr = Object.values(data);
      var field = "";
      //   console.log(data);
      //   console.log(valueArr);
      for (let i = 0; i < keyArr.length; i++) {
        if (i == keyArr.length - 1) {
          field += keyArr[i] + "='" + valueArr[i] + "'";
        } else {
          field += keyArr[i] + "='" + valueArr[i] + "' and ";
        }
      }
      var sql = "select * from " + model_name + " where " + field;
    //   console.log(sql);
      var sqlArr;
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "查询失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "查询成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },
  //根据id批量查询
  async queryMany({ model_name = "", data = {}, callBack } = {}) {
    try {
      var dataLength = Object.keys(data.list).length;
      var list = data.list;
      var field = "";
      for (let i = 0; i < dataLength; i++) {
        if (i == dataLength - 1) {
          field += "id" + "=" + list[i];
        } else {
          field += "id" + "=" + list[i] + " or ";
        }
      }

      var sql = "select * from " + model_name + " where " + field;
      var sqlArr;
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "查询失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "查询成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },

  //分页查询
  async pagenation({
    model_name = "",
    currpage = 1, //起始页
    limit = 5, //每页的容量
    callBack,
  } = {}) {
    try {
      var start = limit * (currpage - 1);
      var sql =
        "select * from " + model_name + " limit " + limit + " offset " + start;
      var sqlArr;
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "查询失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "查询成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },
  //插入数据
  async insert({ model_name = "", data = {}, callBack } = {}) {
    try {
      var dataArr = Object.keys(data);
      var valueArr = Object.values(data);
      var field = "";
      var value = "";
      for (var i = 0; i < dataArr.length; i++) {
        if (i == dataArr.length - 1) {
          field += dataArr[i];
        } else {
          field += dataArr[i] + ",";
        }
      }
      for (var i = 0; i < valueArr.length; i++) {
        if (i == valueArr.length - 1) {
          value += "'" + valueArr[i] + "'";
        } else {
          value += "'" + valueArr[i] + "',";
        }
      }
      var sql =
        "insert into " + model_name + " (" + field + ") values (" + value + ")";
      var sqlArr;
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "添加失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "添加成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },
  //删除数据
  async deleteby({ model_name = "", data = {}, callBack }) {
    try {
      var keyArr = Object.keys(data);
      var valueArr = Object.values(data);
      var field = "";
      //   console.log(data);
      //   console.log(valueArr);
      for (let i = 0; i < keyArr.length; i++) {
        if (i == keyArr.length - 1) {
          field += keyArr[i] + "='" + valueArr[i] + "'";
        } else {
          field += keyArr[i] + "='" + valueArr[i] + "' and ";
        }
      }
      var sql = "delete  from " + model_name + " where " + field;
      var sqlArr;
      console.log(sql);
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "删除失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "删除成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },
  async delete({ model_name = "", data = {}, callBack }) {
    try {
      let key = Object.keys(data);
      let value = Object.values(data);
      var sql =
        "delete  from " + model_name + " where " + key[0] + "=" + value[0];
      var sqlArr;
      console.log(sql);
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "删除失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "删除成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },

  //修改数据
  async update({ model_name = "", query = {}, data = {}, callBack } = {}) {
    try {
      var dataArr = Object.keys(data);
      var valueArr = Object.values(data);
      var field = "";
      console.log(data);
      //从[1],也就是第二个开始，id不能修改
      // 拼串，让方法尽量能够复用
      for (let i = 0; i < dataArr.length; i++) {
        if (i == dataArr.length - 1) {
          field += dataArr[i] + "='" + valueArr[i] + "'";
        } else {
          field += dataArr[i] + "='" + valueArr[i] + "',";
        }
      }
      var sql =
        "update " +
        model_name +
        " set " +
        field +
        " where " +
        Object.keys(query)[0] +
        "='" +
        Object.values(query)[0] +
        "'";
      console.log(sql);
      var sqlArr;
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "修改失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "修改成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },
  //分页条件查询
  async pagenationby({
    model_name = "",
    data = {},
    query = {},
    callBack,
  } = {}) {
    try {
      let {
        currpage = 1, //起始页
        limit = 5, //每页的容量
      } = data;
      let key = Object.keys(query)[0];
      let val = Object.values(query)[0];
      var start = limit * (currpage - 1);
      var sql =
        "select * from " +
        model_name +
        " where " +
        key +
        " = " +
        val +
        " limit " +
        limit +
        " offset " +
        start;
      var sqlArr;
      await this.sqlConnect(sql, sqlArr, (err, connect) => {
        if (err) {
          callBack({ error_code: 101, reason: "查询失败", result: err });
        } else {
          callBack({ error_code: 0, reason: "查询成功", result: connect });
        }
      });
    } catch (err) {
      callBack({ error_code: 102, reason: "连接失败", result: err });
    }
  },
};
