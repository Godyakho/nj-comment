/*
 * @Author: yanghao
 * @Date: 2018-04-20 09:21:07
 * @Last Modified by: yanghao
 * @Last Modified time: 2018-04-22 14:07:30
 */
'use strict';

const Service = require('egg').Service;

class UpService extends Service {
  async getcasename(casename) {
    const data = await this.app.mysql.get('up', { casename });
    return data;
  }

  async createcase(casename) {
    const upsum = 0;
    await this.app.mysql.insert('up', { casename, upsum });
    const cases = {
      casename,
      upsum,
    };
    return cases;
  }

  async getupsum(casename) {
    const data = await this.app.mysql.get('up', { casename });
    return data.upsum;
  }

  async updateup(casename, id, upsum) {
    await this.app.mysql.update('up', { id, upsum });
    const res = await this.app.mysql.get('up', { casename });
    return res.upsum;
  }
}

module.exports = UpService;
