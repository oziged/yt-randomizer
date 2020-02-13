export default class Video {
  constructor() {

  }

  getComments(params) {
    if (params.topLevel) return this.getTopLevelComments(params);
  }

  getTopLevelComments() {

  }

  baseFetchComments() {
    
  }
}