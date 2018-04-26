/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Mon Apr 09 2018
 *  File : user.js
 *******************************************/
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(username, cid) {
    const date = new Date();
    const createtime = date.getTime().toString();
    const result = await this.app.mysql.insert('user', { username, cid, createtime });
    const user = {
      uid: result.insertId,
      username,
      cid,
    };
    return { user };
  }

  async get(username) {
    const user = await this.app.mysql.get('user', { username });
    return user;
  }
}

module.exports = UserService;
