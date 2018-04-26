/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Mon Apr 09 2018
 *  File : user.js
 *******************************************/
'use strict';

const Service = require('egg').Service;

class CaseService extends Service {
  async createcase(casename) {
    const date = new Date();
    const createtime = date.getTime().toString();
    const result = await this.app.mysql.insert('cases', { casename, createtime });
    const res = {
      cid: result.insertId,
      casename,
    };
    return { res };
  }

  async getcase(casename) {
    let res;
    let newres;
    if (!casename) {
      res = await this.app.mysql.select('cases');
      newres = res.map(item => {
        item.value = item.casename;
        item.label = item.casename;
        return item;
      });
    } else {
      res = await this.app.mysql.get('cases', { casename });
    }
    return newres === '' ? newres : res;
  }
}

module.exports = CaseService;
