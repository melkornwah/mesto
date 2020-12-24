export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._job = data.job;
  }

  getUserInfo() {
    return this._userInfo = {
      name: this._name,
      job: this._job
    }
  }

  setUserInfo(data) {
    data.name.textContent = this._name;
    data.job.textContent = this._job;
  }
}
