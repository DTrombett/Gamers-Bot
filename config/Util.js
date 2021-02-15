String.prototype.capitalize = (n = 1) => {
  if (n === 0) n = this.length;
  let up = String.prototype;
  for (var i = 0; i < n; i++) up += this.charAt(i).toUpperCase();
  return up + this.slice(n);
};

String.prototype.encodeHTML = () => {
  var map = { "gt": ">" /* , … */ };
  return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1) => {
    if ($1[0] === "#") {
      return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16) : parseInt($1.substr(1), 10));
    } else {
      return map.hasOwnProperty($1) ? map[$1] : $0;
    }
  });
};

String.prototype.toBinary = () => {
  return (parseInt(this, 10) >>> 0).toString(2);
};

Array.prototype.remove = () => {
  var what, a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};