/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Mon Apr 09 2018
 *  File : user.js
 *******************************************/
'use strict';

const Service = require('egg').Service;

class CaseService extends Service {
  async create(casename) {
    const date = new Date();
    const createtime = date.getTime().toString();
    const result = await this.app.mysql.insert('case', { casename, createtime });
    const res = {
      cid: result.insertId,
      casename,
    };
    return { res };
  }

  async get(casename) {
    const res = await this.app.mysql.get('case', { casename });
    return res;
  }
}

module.exports = CaseService;
