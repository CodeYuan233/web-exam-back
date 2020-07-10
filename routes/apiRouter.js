var express = require("express");
var router = express.Router();
//引入封装的数据库操作模块
var db = require("../db/sql.js");

const MODLE_LIMIT = "limits"; //权限
const MODLE_ROLE = "roles"; //角色
const MODLE_USER = "users"; //管理用户
const MODLE_CLASS = "classes"; //班级
const MODLE_EXAM = "exams"; //考试
const MODLE_SEL_SUBJECT = "select_subjects"; //选择题表
const MODLE_FILL_SUBJECT = "fill_subjects"; //填空题
const MODLE_JUDGE_SUBJECT = "judge_subjects"; //填空题
const MODLE_RECORD = "records"; //考试记录详细表
const MODLE_USER_RECORD = "user_records"; //考试记录略表
const MODLE_EXAM_SUBJECT = "exam_subject"; //考试题目关系表
const MODLE_CLASS_STUDENT = "class_student"; //班级学生关系表

// 加密密码
function md5(password) {
  let md5hamc = crypto.createHmac("md5", "ikao");
  md5hamc.update(password);
  return md5hamc.digest("hex");
}

/*********************权限接口 *************************/

//查询所有权限
router.get("/getlimitall", function (req, res) {
  db.query({
    model_name: MODLE_LIMIT,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//根据id查询权限
router.get("/getrolebyid", function (req, res) {
  db.queryby({
    data: { id: req.query.id },
    model_name: MODLE_ROLE,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询权限
router.get("/getlimit", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_LIMIT,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//查询权限数量
router.post("/getlimitcount", function (req, res) {
  db.query({
    model_name: MODLE_LIMIT,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});

//新增权限
router.post("/addlimit", function (req, res) {
  let { pid, limitname, title } = req.body;
  db.insert({
    model_name: MODLE_LIMIT,
    data: { pid, limitname, title },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//修改权限
router.post("/updatelimit", function (req, res) {
  console.log(req.body);
  let { id, pid, limitname, title } = req.body;
  db.update({
    model_name: MODLE_LIMIT,
    query: { id },
    data: { pid, limitname, title },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//删除权限
router.post("/deletelimit", function (req, res) {
  let { id } = req.body;
  db.delete({
    model_name: MODLE_LIMIT,
    data: { id },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});

/********************* 角色接口 *************************/

//查询所有角色
router.get("/getroleall", function (req, res) {
  db.query({
    model_name: MODLE_ROLE,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//根据id查询角色
router.get("/getrolebyid", function (req, res) {
  db.queryby({
    data: { id: req.query.id },
    model_name: MODLE_ROLE,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询角色
router.get("/getrole", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_ROLE,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//查询角色数量
router.get("/getrolecount", function (req, res) {
  db.query({
    model_name: MODLE_ROLE,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});

//新增角色
router.post("/addrole", function (req, res) {
  let { rolename, limits } = req.body;
  db.insert({
    model_name: MODLE_ROLE,
    data: { rolename, limits },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//修改角色
router.post("/updaterole", function (req, res) {
  console.log(req.body);
  let { id, rolename, limits } = req.body;
  db.update({
    model_name: MODLE_ROLE,
    data: { rolename, limits },
    query: { id },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//删除角色
router.post("/deleterole", function (req, res) {
  let { id } = req.body;
  db.delete({
    model_name: MODLE_ROLE,
    data: { id },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//批量查询角色
router.post("/getrolemany", function (req, res) {
  db.queryMany({
    data: req.body,
    model_name: MODLE_ROLE,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});

/********************* 用户接口 *************************/

//查询所有用户
router.get("/getuserall", function (req, res) {
  db.query({
    model_name: MODLE_USER,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询用户
router.get("/getuser", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_USER,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//查询权限用户
router.get("/getusercount", function (req, res) {
  db.query({
    model_name: MODLE_USER,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});

//新增用户
router.post("/adduser", function (req, res) {
  let { role_id, username, password, nickname = "管理员", email } = req.body;
  db.insert({
    model_name: MODLE_USER,
    data: { role_id, username, nickname, password, email },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//修改用户
router.post("/updateuser", function (req, res) {
  let { id, role_id, username, password } = req.body;
  db.update({
    model_name: MODLE_USER,
    query: { id },
    data: { role_id, username, password },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//删除用户
router.post("/deleteuser", function (req, res) {
  let { id } = req.body;
  db.delete({
    model_name: MODLE_USER,
    data: { id },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//根据id 查询当前登陆用户的权限信息
router.get("/getuserbyid", function (req, res) {
  let { id } = req.query;
  db.queryby({
    model_name: MODLE_USER,
    data: { id },
    callBack: (rst1) => {
      let role_id = rst1.result[0].role_id;
      //根据用户role—_id 查询角色
      db.queryby({
        model_name: MODLE_ROLE,
        data: { id: role_id },
        callBack: (rst2) => {
          let limits = rst2.result[0].limits;
          limits = limits.split(",");
          //根据角色limits 查询权限列表
          db.queryMany({
            model_name: MODLE_LIMIT,
            data: { list: limits },
            callBack: (rst) => {
              res.send(rst);
            },
          });
        },
      });
    },
  });
});
//根据id 查询当前登录用户的用户信息
router.get("/getuserinfo", function (req, res) {
  let { id } = req.query;
  db.queryby({
    model_name: MODLE_USER,
    data: { id },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//登录
router.post("/login", function (req, res) {
  let { username, password } = req.body;
  // password = md5(password);
  db.queryby({
    model_name: MODLE_USER,
    data: { username, password },
    callBack: (rst) => {
      if (rst.result.length > 0) {
        let id = rst.result[0].id;
        // 登录成功把token更新上去
        db.update({
          model_name: MODLE_USER,
          query: { id },
          data: {
            token: id,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5).getTime(),
          },
          callBack: (urst) => {
            res.send(rst);
          },
        });
      } else {
        res.send({ error_code: 101, reason: "用户名或密码错误", result: null });
      }
    },
  });
});
//注册
router.post("/regist", function (req, res) {
  let { username } = req.body;
  // password = md5(password);
  db.queryby({
    model_name: MODLE_USER,
    data: { username },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//更新token过期时间
router.get("/updateexpire", function (req, res) {
  let { token } = req.query;
  let id = token;
  db.update({
    model_name: MODLE_USER,
    query: { id },
    data: {
      expires: new Date(Date.now() + 1000 * 6).getTime(),
    },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});

/************************ 班级接口 **********************/
//查询所有班级
router.get("/getclassall", function (req, res) {
  db.query({
    model_name: MODLE_CLASS,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//根据id查询班级
router.get("/getclassbyid", function (req, res) {
  db.queryby({
    data: { id: req.query.id },
    model_name: MODLE_CLASS,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询班级
router.get("/getclass", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_CLASS,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//查询班级数量
router.get("/getclasscount", function (req, res) {
  db.query({
    model_name: MODLE_CLASS,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});

//新增班级
router.post("/addclass", function (req, res) {
  let { classname, teacher_id, class_info } = req.body;
  db.insert({
    model_name: MODLE_CLASS,
    data: { teacher_id, classname, class_info },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//修改班级
router.post("/updateclass", function (req, res) {
  console.log(req.body);
  let { id, classname, teacher_id, class_info } = req.body;
  db.update({
    model_name: MODLE_CLASS,
    data: { classname, teacher_id, class_info },
    query: { id },
    callBack: (rst) => {
      res.send(rst);

      // console.log(req);
    },
  });
});
//删除班级
router.post("/deleteclass", function (req, res) {
  let { id } = req.body;
  db.delete({
    model_name: MODLE_CLASS,
    data: { id },
    callBack: (rst) => {
      res.send(rst);
      // console.log(req);
    },
  });
});
//批量查询班级
router.post("/getclassmany", function (req, res) {
  db.queryMany({
    data: req.body,
    model_name: MODLE_CLASS,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});

/************************ 考试接口 **********************/
//查询所有考试
router.get("/getexamall", function (req, res) {
  db.query({
    model_name: MODLE_EXAM,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//根据id查询考试
router.get("/getexambyid", function (req, res) {
  db.queryby({
    data: { id: req.query.id },
    model_name: MODLE_EXAM,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询考试
router.get("/getexam", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_EXAM,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//查询考试数量
router.get("/getexamsubjects", function (req, res) {
  let { exam_id, type } = req.query;
  db.queryby({
    model_name: MODLE_EXAM_SUBJECT,
    data: { exam_id, type },
    callBack: (rst) => {
      let subjects = [];
      for (let i = 0; i < rst.result.length; i++) {
        subjects[i] = rst.result[i].subject_id;
      }

      if (type == "选择题") {
        db.queryMany({
          model_name: MODLE_SEL_SUBJECT,
          data: { list: subjects },
          callBack: (rst) => {
            res.send(rst);
            // console.log(req);
          },
        });
      } else if (type == "判断题") {
        db.queryMany({
          model_name: MODLE_JUDGE_SUBJECT,
          data: { list: subjects },
          callBack: (rst) => {
            res.send(rst);
            // console.log(req);
          },
        });
      } else if (type == "填空题") {
        db.queryMany({
          model_name: MODLE_FILL_SUBJECT,
          data: { list: subjects },
          callBack: (rst) => {
            res.send(rst);
            // console.log(req);
          },
        });
      }
    },
  });
});

//批量查询考试
router.post("/getexammany", function (req, res) {
  db.queryMany({
    data: req.body,
    model_name: MODLE_EXAM,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});

// 添加考试
router.post("/examaddsubject", function (req, res) {
  let { exam_id, subject_id, type } = req.body;
  db.insert({
    model_name: MODLE_EXAM_SUBJECT,
    data: { exam_id, subject_id, type },
    callBack: (rst) => {
      //   res.send(rst);
      res.send(rst);
    },
  });
});
router.post("/addexam", function (req, res) {
  let {
    exam_name,
    start_time,
    end_time,
    exam_info,
    exam_state,
    teacher_id,
    exam_time,
  } = req.body;
  db.insert({
    model_name: MODLE_EXAM,
    data: {
      exam_name,
      start_time,
      end_time,
      exam_info,
      exam_state,
      teacher_id,
      exam_time,
    },
    callBack: (rst) => {
      //   res.send(rst);
      res.send(rst);
    },
  });
});
//修改考试
router.post("/updateexam", function (req, res) {
  let { id, exam_name, start_time, end_time, exam_info, teacher_id,exam_time } = req.body;
  db.update({
    model_name: MODLE_EXAM,
    data: { exam_name, start_time, end_time, exam_info, teacher_id ,exam_time},
    query: { id },
    callBack: (rst) => {
      res.send(rst);
      console.log(rst, "更新exam表");
    },
  });
});
// 删除考试
router.post("/deleteexam", function (req, res) {
  let { id } = req.body;
  db.delete({
    model_name: MODLE_EXAM,
    data: { id },
    callBack: (rst1) => {
      let exam_id = id;
      db.delete({
        model_name: MODLE_EXAM_SUBJECT,
        data: { exam_id },
        callBack: (rst) => {
          console.log(rst);
          res.send(rst);
        },
      });
      // console.log(req);
    },
  });
});

/************************ 题目接口 **********************/

//根据id查询班级
router.get("/getclassbyid", function (req, res) {
  db.queryby({
    data: { id: req.query.id },
    model_name: MODLE_CLASS,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});

//获取全部选择题目
router.get("/getselsubjectall", function (req, res) {
  db.query({
    model_name: MODLE_SEL_SUBJECT,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询选择题目
router.get("/getselsubject", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_SEL_SUBJECT,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//获取全部填空题目
router.get("/getfillsubjectall", function (req, res) {
  db.query({
    model_name: MODLE_FILL_SUBJECT,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询填空题
router.get("/getfillsubject", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_FILL_SUBJECT,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//获取全部判断题
router.get("/getjudgesubjectall", function (req, res) {
  db.query({
    model_name: MODLE_JUDGE_SUBJECT,
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//分页查询判断题
router.get("/getjudgesubject", function (req, res) {
  db.pagenation({
    currpage: req.query.currpage,
    model_name: MODLE_JUDGE_SUBJECT,
    callBack: (rst) => {
      res.send(rst);
      //   console.log(req);
    },
  });
});
//添加题目
router.post("/addselsubject", function (req, res) {
  let {
    type,
    subject_stem,
    subject_info,
    selectionA,
    selectionB,
    selectionC,
    selectionD,
    score,
    answer,
  } = req.body;
  db.insert({
    model_name: MODLE_SEL_SUBJECT,
    data: {
      type,
      subject_stem,
      subject_info,
      selectionA,
      selectionB,
      selectionC,
      selectionD,
      score,
      answer,
    },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/addfillsubject", function (req, res) {
  let { type, subject_stem, subject_info, score, answer } = req.body;
  db.insert({
    model_name: MODLE_FILL_SUBJECT,
    data: { type, subject_stem, subject_info, score, answer },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/addjudgesubject", function (req, res) {
  let { type, subject_stem, subject_info, score, answer } = req.body;
  db.insert({
    model_name: MODLE_JUDGE_SUBJECT,
    data: { type, subject_stem, subject_info, score, answer },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//修改题目
router.post("/updateselsubject", function (req, res) {
  let {
    id,
    type,
    subject_stem,
    subject_info,
    selectionA,
    selectionB,
    selectionC,
    selectionD,
    score,
    answer,
  } = req.body;
  db.update({
    model_name: MODLE_SEL_SUBJECT,
    data: {
      type,
      subject_stem,
      subject_info,
      selectionA,
      selectionB,
      selectionC,
      selectionD,
      score,
      answer,
    },
    query: { id },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/updatejudgesubject", function (req, res) {
  let { id, type, subject_stem, subject_info, score, answer } = req.body;
  db.update({
    model_name: MODLE_JUDGE_SUBJECT,
    data: { type, subject_stem, subject_info, score, answer },
    query: { id },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/updatefillsubject", function (req, res) {
  let { id, type, subject_stem, subject_info, score, answer } = req.body;
  db.update({
    model_name: MODLE_FILL_SUBJECT,
    data: { type, subject_stem, subject_info, score, answer },
    query: { id },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//删除题目
router.post("/deletesubject", function (req, res) {
  let { type, id } = req.body;
  if (type == "选择题") {
    db.delete({
      model_name: MODLE_SEL_SUBJECT,
      data: { id },
      callBack: (rst) => {
        res.send(rst);
        // console.log(req);
      },
    });
  } else if (type == "判断题") {
    db.delete({
      model_name: MODLE_JUDGE_SUBJECT,
      data: { id },
      callBack: (rst) => {
        res.send(rst);
        // console.log(req);
      },
    });
  } else if (type == "填空题") {
    db.delete({
      model_name: MODLE_FILL_SUBJECT,
      data: { id },
      callBack: (rst) => {
        res.send(rst);
        // console.log(req);
      },
    });
  }
});
//删除考试中题目
router.post("/deleteexamsubject", function (req, res) {
  let { type, subject_id, exam_id } = req.body;
  db.deleteby({
    model_name: MODLE_EXAM_SUBJECT,
    data: { type, subject_id, exam_id },
    callBack: (rst) => {
      res.send(rst);
      // console.log(req);
    },
  });
});
router.get("/getsubjectbyid", function (req, res) {
  let { type, id } = req.query;
  if (type == "选择题") {
    db.queryby({
      model_name: MODLE_SEL_SUBJECT,
      data: { id },
      callBack: (rst) => {
        res.send(rst);
        // console.log(req);
      },
    });
  } else if (type == "判断题") {
    db.delete({
      model_name: MODLE_JUDGE_SUBJECT,
      data: { id },
      callBack: (rst) => {
        res.send(rst);
        // console.log(req);
      },
    });
  } else if (type == "填空题") {
    db.delete({
      model_name: MODLE_FILL_SUBJECT,
      data: { id },
      callBack: (rst) => {
        res.send(rst);
        // console.log(req);
      },
    });
  }
});

//添加考试记录详细信息
router.post("/addrecord", function (req, res) {
  let { exam_id, answer, score, isright, user_id, subject_id, sign } = req.body;
  db.insert({
    model_name: MODLE_RECORD,
    data: {
      exam_id,
      answer,
      score,
      isright,
      user_id,
      subject_id,
      sign,
    },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
//添加考试记录预览信息
router.post("/adduserrecord", function (req, res) {
  let {
    exam_id,
    score,
    myscore,
    user_id,
    exam_name,
    sign,
    user_name,
  } = req.body;
  db.insert({
    model_name: MODLE_USER_RECORD,
    data: { exam_id, exam_name, score, myscore, user_id, sign, user_name },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/recordlist", function (req, res) {
  let { currpage, user_id } = req.body;
  console.log(currpage);
  db.pagenationby({
    model_name: MODLE_USER_RECORD,
    data: { currpage },
    query: { user_id },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/recordlistcount", function (req, res) {
  let { user_id } = req.body;
  console.log(user_id);
  db.queryby({
    model_name: MODLE_USER_RECORD,
    data: { user_id },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/userrecordlist", function (req, res) {
  let { sign } = req.body;
  console.log(sign);
  db.queryby({
    model_name: MODLE_RECORD,
    data: { sign },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});
router.post("/recorddelete", function (req, res) {
  let { sign } = req.body;
  console.log(sign);
  db.deleteby({
    model_name: MODLE_RECORD,
    data: { sign },
    callBack: (rst) => {},
  });
  db.deleteby({
    model_name: MODLE_USER_RECORD,
    data: { sign },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});

module.exports = router;
