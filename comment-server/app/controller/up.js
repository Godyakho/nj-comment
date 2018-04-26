/*
 * @Author: yanghao
 * @Date: 2018-04-19 17:03:43
 * @Last Modified by: yanghao
 * @Last Modified time: 2018-04-22 14:06:30
 */
'use strict';

const Controller = require('egg').Controller;
class UpController extends Controller {
  async getupsum() {
    const { ctx } = this;
    const casename = ctx.request.body.casename;
    const isExist = await ctx.service.up.getcasename(casename);
    if (!casename) {
      const code = 3000;
      const msg = '未传入casename';
      const res = null;
      ctx.helper.success({ ctx, code, msg, res });
      return;
    }
    if (!isExist) {
      const code = 2000;
      const msg = 'casename不存在';
      const res = null;
      ctx.helper.success({ ctx, code, msg, res });
      return;
    }
    const res = await ctx.service.up.getupsum(casename);
    ctx.helper.success({ ctx, res });
  }

  async createcase() {
    const { ctx } = this;
    const casename = ctx.request.body.casename;
    const isExist = await ctx.service.up.getcasename(casename);
    if (!casename) {
      const code = 3000;
      const msg = '未传入casename';
      const res = null;
      ctx.helper.success({ ctx, code, msg, res });
      return;
    }
    if (isExist) {
      const code = 2000;
      const msg = 'casename已存在';
      const res = null;
      ctx.helper.success({ ctx, code, msg, res });
      return;
    }
    const res = await ctx.service.up.createcase(casename);
    ctx.helper.success({ ctx, res });
  }

  async updateup() {
    const { ctx } = this;
    const casename = ctx.request.body.casename;
    const isExist = await ctx.service.up.getcasename(casename);
    if (!casename) {
      const code = 3000;
      const msg = '未传入casename';
      const res = null;
      ctx.helper.success({ ctx, code, msg, res });
      return;
    }
    if (!isExist) {
      const code = 2000;
      const msg = 'casename不存在';
      const res = null;
      ctx.helper.success({ ctx, code, msg, res });
      return;
    }
    const data = await ctx.service.up.getcasename(casename);
    const res = await ctx.service.up.updateup(casename, data.id, data.upsum + 1);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UpController;
