interface Res {
  [key: string]: string | number | boolean;
}

export function parseObj(obj: any, preKey: string = '', res: Res = {}) {
  const keysArr = Object.keys(obj);
  for (let i = 0; i < keysArr.length; i++) {
    if (Array.isArray(obj[keysArr[i]])) continue;
    if (Object.prototype.toString.call(obj[keysArr[i]]) === '[object Object]') {
      parseObj(obj[keysArr[i]], preKey + keysArr[i] + '.', res);
    } else {
      res[preKey + keysArr[i]] = obj[keysArr[i]];
    }
  }
  return res;
}

export function transformToLink(arr: string[], props: any, val: string | number | boolean) {
  let tmp = props;
  
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];
    let next = arr[i + 1];
    if (next) {
      tmp = props[cur];
    } else {
      tmp[cur] = val;
    }
  }
  return props;
}



