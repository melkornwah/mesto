export default class UserInfo {
  constructor(data) {
    this._name = data.name.textContent;
    this._job = data.job.textContent;
  }

  getUserInfo(data) {
    return this.userData = {
      name: data.name,
      job: data.job
    }
  }

  setUserInfo(formData, data) {
    data.name.textContent = formData.name;
    data.job.textContent = formData.job;
  }
}
