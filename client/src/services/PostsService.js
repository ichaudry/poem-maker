/**
 * Set up API calls to be used on client-side
 */
import Api from '@/services/Api'


export default {
  getPosts () {
    return Api().get('posts')
  },

  addPost (params) {
    return Api().post('add_post', params)
  },

  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('post/' + params.id)
  },

  deletePost (id) {
    return Api().delete('posts/' + id)
  },

  //Create a custom time stamp
  createTimeStamp () {
    var newDate = new Date()
    var month = newDate.getMonth()
    var date = newDate.getDate()
    var year = newDate.getFullYear()
    var hours = newDate.getHours()
    var amOrPm = 'am'
    if (hours > 12) {
      hours = hours - 12
      amOrPm = 'pm'
    }
    var minutes = newDate.getMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    var calDate = month + '-' + date + '-' + year
    var time = hours + ':' + minutes + ' ' + amOrPm
    return calDate + '  ' + time
  }
}
