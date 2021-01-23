export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
    this._id = data.id;
  }

  getUserInfo() {
    return this.userData = {
      name: this._name.textContent,
      job: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  getUserId() {
    return this._id;
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._about.textContent = formData.about;
    this._avatar.src = formData.avatar;
    this._id = formData._id;
  }
}
