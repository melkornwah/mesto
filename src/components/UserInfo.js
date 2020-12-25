export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._job = data.job;
  }

  getUserInfo() {
    return this.userData = {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._job.textContent = formData.job;
  }
}
