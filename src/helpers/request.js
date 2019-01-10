const Request = function(url){
  this.url = url;
}

Request.prototype.get = function(){
  return fetch(this.url).then((res) => {
    return res.json();
  });
};

module.exports = Request;
