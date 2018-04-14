/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Tue Apr 10 2018
 *  File : case.js
 *******************************************/
'use strict';

const Controller = require('egg').Controller;
class CaseController extends Controller {
  async create() {
    const { ctx } = this;
    const casename = ctx.request.body.casename;
    const exist = await ctx.service.case.get(casename);
    if (exist) {
      const code = 4000;
      const msg = '活动重复';
      const res = null;
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    const res = await ctx.service.case.create(casename);
    ctx.helper.success({ ctx, res });
  }

  async get() {
    const { ctx } = this;
    const casename = ctx.request.body.casename;
    const res = await ctx.service.case.get(casename);
    if (!res) {
      const code = 4000;
      const msg = '无相关信息';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    ctx.helper.success({ ctx, res });

  }
}

module.exports = CaseController;
