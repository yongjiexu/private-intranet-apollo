export function getCookie (name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

const keyCodes = {
  'ctrl': 17,
  'alt': 18,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90
}

const codeKeys = Object.keys(keyCodes).reduce((r, k) => {
  r[keyCodes[k].toString()] = k
  return r
}, {})

export function codeToKey (code) {
  code = typeof code === 'number' ? code.toString() : code
  return codeKeys[code]
}

export function keyToCode (key) {
  return keyCodes[key].toString()
}

export function json2csv (jsonData, fileName) {
  let arrData = typeof jsonData !== 'object' ? JSON.parse(jsonData) : jsonData
  let csv = arrData.map(row => {
    return row.map(c => {
      let cooked = c
      if (typeof cooked === 'string') {
        cooked = cooked.replace(/\"/g, '""')
        cooked = `"${cooked}"`
      }
      return cooked
    }).join(',')
  }).join('\r\n')

  if (csv === '') {
    throw new Error('Invalid data')
  }

  let uri = 'data:text/csv;charset=utf-8,' + csv.replace(/\r/g, '%0D').replace(/\n/g, '%0A')

  // Now the little tricky part.
  // you can use either>> window.open(uri);
  // but this will not work in some browsers
  // or you will not get the correct file extension

  // this trick will generate a temp <a /> tag
  var link = document.createElement('a')
  link.href = uri

  // set the visibility hidden so it will not effect on your web-layout
  link.style = 'visibility:hidden'
  link.download = fileName + '.csv'

  // this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
