
export const transformRequest = (obj) => {
  let retStr = '';
  let str: string[] = [];
  for(let key in obj) {
    if(obj[key] instanceof Array) {
      obj[key].map((x) =>
        str.push((x !== null && typeof x === "object") ?
          encodeURIComponent(key) + '[]=' + JSON.stringify(x) :
          encodeURIComponent(key) + '[]=' + encodeURIComponent(x))
      );
    }else {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  retStr = str.join("&");
  return retStr;
}

// tranform request to form data
export const toFormData = (obj) => {
  let fd = new FormData();
  for(let key in obj) {
    if(obj[key] instanceof Array) {
      obj[key].map((x)=>
        fd.append(encodeURIComponent(key) + '[]',
          (x !== null && typeof x === "object") ?
          JSON.stringify(x) : x)
      );
    }else {
      fd.append(encodeURIComponent(key), obj[key]);
    }
  }

  return fd;
}
